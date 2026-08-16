import sqlite3
import os
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict


app = FastAPI(title="KICET Hackathon Backend")
def get_Connection():
    database_path = os.path.join(
        os.path.dirname(os.path.dirname(__file__)),
        "database",
        "ktcb.db"
    )

    return sqlite3.connect(database_path)

# -----------------------------
# Admin Dashboard
# -----------------------------
@app.get("/api/admin/dashboard")
def get_admin_dashboard():

    connection = get_Connection()
    cursor = connection.cursor()

    # Total students
    cursor.execute("SELECT COUNT(*) FROM students")
    total_students = cursor.fetchone()[0]

    # Total teachers
    cursor.execute("SELECT COUNT(*) FROM teachers")
    total_teachers = cursor.fetchone()[0]

    # Total courses
    cursor.execute("SELECT COUNT(*) FROM courses")
    total_courses = cursor.fetchone()[0]

    # Average attendance
    cursor.execute("SELECT AVG(attendance) FROM students")
    average_attendance = cursor.fetchone()[0] or 0

    # Average performance
    cursor.execute("SELECT AVG(average_marks) FROM students")
    average_performance = cursor.fetchone()[0] or 0

    connection.close()

    return {
        "total_students": total_students,
        "total_teachers": total_teachers,
        "total_courses": total_courses,
        "at_risk_students": 2,
        "average_attendance": round(average_attendance, 2),
        "average_performance": round(average_performance, 2)
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