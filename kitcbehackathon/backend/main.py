import sqlite3
import os
import sys
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware

AI_MODEL_PATH = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "ai-model"
)

sys.path.append(AI_MODEL_PATH)

from ai_engine import analyze_student as ai_analyze_student

app = FastAPI(title="KICET Hackathon Backend")
app.add_middleware(
    CORSMiddleware,
   allow_origins=[
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5500",
    "http://127.0.0.1:5500"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
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
class StudentAnalysisRequest(BaseModel):
    student_id: str
    attendance: float
    assignment_completion: float
    average_marks: float
    previous_average: float
    subjects: Dict[str, float]

@app.post("/api/ai/analyze-student")
def analyze_student(data: StudentAnalysisRequest):

    student = {
        "student_id": data.student_id,
        "attendance": data.attendance,
        "assignment_completion": data.assignment_completion,
        "average_marks": data.average_marks,
        "previous_average": data.previous_average,
        "subjects": data.subjects
    }

    result = ai_analyze_student(student)

    return result