import pandas as pd
from sklearn.linear_model import LogisticRegression


# ============================================================
# CONFIGURATION
# ============================================================

import os

DATA_FILE = os.path.join(
    os.path.dirname(__file__),
    "sample_data.csv"
)

# These are the fields used by the ML model for risk prediction.
RISK_FEATURES = [
    "attendance",
    "assignment_completion",
    "average_marks",
    "previous_average"
]


# ============================================================
# LOAD SAMPLE DATASET
# ============================================================

data = pd.read_csv(DATA_FILE)

X = data[RISK_FEATURES]
y = data["risk_label"]


# ============================================================
# TRAIN RISK PREDICTION MODEL
# ============================================================

risk_model = LogisticRegression(max_iter=1000)
risk_model.fit(X, y)


# ============================================================
# 1. PERFORMANCE ANALYSIS
# ============================================================

def analyze_performance(student):
    """
    Analyze overall academic performance.

    Input:
        student dictionary

    Output:
        score
        performance level
        performance trend
    """

    current_average = student["average_marks"]
    previous_average = student["previous_average"]

    # Determine trend
    if current_average > previous_average:
        trend = "IMPROVING"
    elif current_average < previous_average:
        trend = "DECLINING"
    else:
        trend = "STABLE"

    # Overall performance score
    performance_score = (
        student["attendance"] * 0.20
        + student["assignment_completion"] * 0.20
        + student["average_marks"] * 0.40
        + student["previous_average"] * 0.20
    )

    performance_score = round(performance_score, 2)

    # Performance category
    if performance_score >= 75:
        performance_level = "EXCELLENT"
    elif performance_score >= 60:
        performance_level = "GOOD"
    elif performance_score >= 45:
        performance_level = "NEEDS_IMPROVEMENT"
    else:
        performance_level = "POOR"

    return {
        "score": performance_score,
        "level": performance_level,
        "trend": trend
    }


# ============================================================
# 2. AT-RISK STUDENT DETECTION
# ============================================================

def detect_risk(student):
    """
    Predict whether the student is at risk.

    Uses the trained Logistic Regression model.
    """

    input_data = pd.DataFrame([{
        "attendance": student["attendance"],
        "assignment_completion": student["assignment_completion"],
        "average_marks": student["average_marks"],
        "previous_average": student["previous_average"]
    }])

    prediction = risk_model.predict(input_data)[0]

    probability = risk_model.predict_proba(input_data)[0][1]

    risk_score = round(probability * 100, 2)

    if risk_score >= 70:
        risk_level = "HIGH"
    elif risk_score >= 40:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    return {
        "prediction": "AT_RISK" if prediction == 1 else "NOT_AT_RISK",
        "score": risk_score,
        "level": risk_level
    }


# ============================================================
# 3. WEAK SUBJECT IDENTIFICATION
# ============================================================

def identify_weak_subject(student):
    """
    Find the subject with the lowest marks.
    """

    subjects = student["subjects"]

    weakest_subject = min(
        subjects,
        key=subjects.get
    )

    return {
        "name": weakest_subject,
        "score": subjects[weakest_subject]
    }


# ============================================================
# 4. PERSONALIZED RECOMMENDATIONS
# ============================================================

def generate_recommendations(
    student,
    performance,
    risk,
    weak_subject
):
    """
    Generate recommendations based on the student's
    academic performance.
    """

    recommendations = []

    # Attendance recommendation
    if student["attendance"] < 75:
        recommendations.append(
            "Improve class attendance and attend upcoming sessions regularly."
        )

    # Assignment recommendation
    if student["assignment_completion"] < 70:
        recommendations.append(
            "Complete pending assignments and maintain regular submission."
        )

    # Marks recommendation
    if student["average_marks"] < 60:
        recommendations.append(
            "Increase study time and practice more questions before exams."
        )

    # Performance trend recommendation
    if performance["trend"] == "DECLINING":
        recommendations.append(
            "Performance is declining. Review recent topics and seek teacher guidance."
        )

    # Weak subject recommendation
    if weak_subject["score"] < 60:
        recommendations.append(
            f"Focus additional study time on {weak_subject['name']}."
        )

    # Risk recommendation
    if risk["level"] == "HIGH":
        recommendations.append(
            "Schedule an academic intervention or teacher follow-up."
        )

    # If no problems were detected
    if not recommendations:
        recommendations.append(
            "Performance is healthy. Continue the current study routine."
        )

    return recommendations


# ============================================================
# 5. COMPLETE STUDENT ANALYSIS PIPELINE
# ============================================================

def analyze_student(student):
    """
    Main AI function.

    Input format:

    {
        "student_id": "S101",
        "attendance": 55,
        "assignment_completion": 48,
        "average_marks": 51,
        "previous_average": 65,
        "subjects": {
            "Mathematics": 42,
            "Physics": 61,
            "Programming": 73,
            "Chemistry": 47
        }
    }

    Returns:

    {
        "student_id": "...",
        "performance": {...},
        "risk": {...},
        "weak_subject": {...},
        "recommendations": [...]
    }
    """

    performance = analyze_performance(student)

    risk = detect_risk(student)

    weak_subject = identify_weak_subject(student)

    recommendations = generate_recommendations(
        student,
        performance,
        risk,
        weak_subject
    )

    return {
        "student_id": student["student_id"],
        "performance": performance,
        "risk": risk,
        "weak_subject": weak_subject,
        "recommendations": recommendations
    }