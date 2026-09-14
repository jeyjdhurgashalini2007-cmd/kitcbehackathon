from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict
import sqlite3
from pathlib import Path

app = FastAPI(title="KICET Hackathon Backend")
BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = BASE_DIR / "database" / "ktcb.db"


def get_db():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection

# -----------------------------
# Admin Dashboard
# -----------------------------
@app.get("/api/admin/dashboard")
def get_admin_dashboard():
    db = get_db()

    total_students = db.execute(
        "SELECT COUNT(*) FROM students"
    ).fetchone()[0]

    total_teachers = db.execute(
        "SELECT COUNT(*) FROM teachers"
    ).fetchone()[0]

    total_courses = db.execute(
        "SELECT COUNT(*) FROM courses"
    ).fetchone()[0]

    at_risk_students = db.execute("""
        SELECT COUNT(*)
        FROM students
        WHERE attendance < 75
           OR assignment_completion < 75
           OR average_marks < 60
    """).fetchone()[0]

    average_attendance = db.execute(
        "SELECT AVG(attendance) FROM students"
    ).fetchone()[0]

    average_performance = db.execute(
        "SELECT AVG(average_marks) FROM students"
    ).fetchone()[0]

    db.close()

    return {
        "total_students": total_students,
        "total_teachers": total_teachers,
        "total_courses": total_courses,
        "at_risk_students": at_risk_students,
        "average_attendance": round(average_attendance or 0, 1),
        "average_performance": round(average_performance or 0, 1)
    }
@app.get("/api/admin/students")
def get_all_students():
    db = get_db()

    students = db.execute("""
        SELECT
            student_id,
            name,
            email,
            course_id,
            year,
            attendance,
            assignment_completion,
            average_marks,
            previous_average
        FROM students
    """).fetchall()

    db.close()

    return [dict(student) for student in students]

# -----------------------------
# Admin - Student Details
# -----------------------------

@app.get("/api/admin/students/{student_id}")
def get_student(student_id: str):
    db = get_db()

    student = db.execute("""
        SELECT
            student_id,
            name,
            email,
            course_id,
            year,
            attendance,
            assignment_completion,
            average_marks,
            previous_average
        FROM students
        WHERE student_id = ?
    """, (student_id,)).fetchone()

    if student is None:
        db.close()
        return {"error": "Student not found"}

    marks = db.execute("""
        SELECT
            subjects.subject_name,
            student_marks.marks
        FROM student_marks
        JOIN subjects
            ON student_marks.subject_id = subjects.subject_id
        WHERE student_marks.student_id = ?
    """, (student_id,)).fetchall()

    db.close()

    return {
        "student": dict(student),
        "subjects": [dict(mark) for mark in marks]
    }
@app.get("/api/admin/teachers")
def get_all_teachers():
    db = get_db()

    teachers = db.execute("""
        SELECT
            teacher_id,
            name,
            email
        FROM teachers
        ORDER BY teacher_id
    """).fetchall()

    db.close()

    return {
        "count": len(teachers),
        "teachers": [dict(teacher) for teacher in teachers]
    }
@app.get("/api/admin/courses")
def get_all_courses():
    db = get_db()

    courses = db.execute("""
        SELECT
            courses.course_id,
            courses.course_name,
            courses.teacher_id,
            teachers.name AS teacher_name
        FROM courses
        LEFT JOIN teachers
            ON courses.teacher_id = teachers.teacher_id
        ORDER BY courses.course_id
    """).fetchall()

    db.close()

    return {
        "count": len(courses),
        "courses": [dict(course) for course in courses]
    }
@app.get("/api/admin/reports/at-risk")
def get_at_risk_students():
    db = get_db()

    students = db.execute("""
        SELECT
            student_id,
            name,
            course_id,
            attendance,
            assignment_completion,
            average_marks,
            previous_average
        FROM students
        WHERE attendance < 75
           OR assignment_completion < 75
           OR average_marks < 60
        ORDER BY average_marks ASC
    """).fetchall()

    db.close()

    return {
        "count": len(students),
        "students": [dict(student) for student in students]
    }
@app.get("/api/admin/reports/performance")
def get_performance_report():
    db = get_db()

    summary = db.execute("""
        SELECT
            COUNT(*) AS total_students,
            ROUND(AVG(attendance), 1) AS average_attendance,
            ROUND(AVG(assignment_completion), 1) AS average_assignment_completion,
            ROUND(AVG(average_marks), 1) AS average_marks
        FROM students
    """).fetchone()

    db.close()

    return dict(summary)
@app.get("/api/teacher/{teacher_id}/students")
def get_teacher_students(teacher_id: str):
    db = get_db()

    students = db.execute("""
        SELECT
            students.student_id,
            students.name,
            students.email,
            students.course_id,
            courses.course_name,
            students.year,
            students.attendance,
            students.assignment_completion,
            students.average_marks
        FROM students
        JOIN courses
            ON students.course_id = courses.course_id
        WHERE courses.teacher_id = ?
        ORDER BY students.student_id
    """, (teacher_id,)).fetchall()

    db.close()

    return {
        "teacher_id": teacher_id,
        "count": len(students),
        "students": [dict(student) for student in students]
    }
# -----------------------------
# AI Student Analysis
# -----------------------------
class StudentAnalysisRequest(BaseModel):
    student_id: str
    attendance: float
    assignment_completion: float
    average_marks: float
    previous_average: float
    subjects: Dict[str, float]


@app.post("/api/ai/analyze-student")
def analyze_student(data: StudentAnalysisRequest):

    # Performance analysis
    performance_score = (
        data.attendance * 0.2
        + data.assignment_completion * 0.2
        + data.average_marks * 0.6
    )

    if performance_score >= 75:
        performance_level = "GOOD"
    elif performance_score >= 60:
        performance_level = "AVERAGE"
    else:
        performance_level = "NEEDS_IMPROVEMENT"

    if data.average_marks > data.previous_average:
        trend = "IMPROVING"
    elif data.average_marks < data.previous_average:
        trend = "DECLINING"
    else:
        trend = "STABLE"

    # Risk prediction
    risk_score = (
        (100 - data.attendance) * 0.35
        + (100 - data.assignment_completion) * 0.25
        + (100 - data.average_marks) * 0.40
    )

    if risk_score >= 70:
        risk_prediction = "AT_RISK"
        risk_level = "HIGH"
    elif risk_score >= 40:
        risk_prediction = "MODERATE_RISK"
        risk_level = "MEDIUM"
    else:
        risk_prediction = "LOW_RISK"
        risk_level = "LOW"

    # Weakest subject
    weak_subject_name = min(data.subjects, key=data.subjects.get)
    weak_subject_score = data.subjects[weak_subject_name]

    # Recommendations
    recommendations = []

    if data.attendance < 75:
        recommendations.append("Improve class attendance.")

    if data.assignment_completion < 75:
        recommendations.append("Complete pending assignments.")

    recommendations.append(
        f"Focus additional study time on {weak_subject_name}."
    )

    if risk_prediction == "AT_RISK":
        recommendations.append("Schedule an academic intervention.")

    return {
        "student_id": data.student_id,
        "performance": {
            "score": round(performance_score, 1),
            "level": performance_level,
            "trend": trend
        },
        "risk": {
            "prediction": risk_prediction,
            "score": round(risk_score, 1),
            "level": risk_level
        },
        "weak_subject": {
            "name": weak_subject_name,
            "score": weak_subject_score
        },
        "recommendations": recommendations
    }