from ai_engine import analyze_student


# ============================================================
# SAMPLE STUDENT
# ============================================================

student = {
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


# ============================================================
# RUN AI PIPELINE
# ============================================================

result = analyze_student(student)


# ============================================================
# DISPLAY RESULT
# ============================================================

print("\n==========================================")
print("       AI STUDENT PERFORMANCE REPORT")
print("==========================================")

print("\nStudent ID:")
print(result["student_id"])


print("\nPerformance Analysis:")
print("------------------------------------------")
print("Score:", result["performance"]["score"])
print("Level:", result["performance"]["level"])
print("Trend:", result["performance"]["trend"])


print("\nRisk Analysis:")
print("------------------------------------------")
print("Prediction:", result["risk"]["prediction"])
print("Risk Score:", result["risk"]["score"])
print("Risk Level:", result["risk"]["level"])


print("\nWeak Subject:")
print("------------------------------------------")
print("Subject:", result["weak_subject"]["name"])
print("Score:", result["weak_subject"]["score"])


print("\nPersonalized Recommendations:")
print("------------------------------------------")

for recommendation in result["recommendations"]:
    print("-", recommendation)


print("\n==========================================")