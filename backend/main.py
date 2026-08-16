from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict


app = FastAPI(title="KICET Hackathon Backend")


# -----------------------------
# Admin Dashboard
# -----------------------------
@app.get("/api/admin/dashboard")
def get_admin_dashboard():
    return {
        "total_students": 1200,
        "total_teachers": 65,
        "total_courses": 48,
        "at_risk_students": 83,
        "average_attendance": 78,
        "average_performance": 71
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