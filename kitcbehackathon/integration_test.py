import sqlite3
import sys
import os

# ------------------------------------------------------------
# Find AI module
# ------------------------------------------------------------

AI_MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "ai-model"
)

sys.path.insert(0, AI_MODEL_PATH)

from ai_engine import analyze_student


# ------------------------------------------------------------
# Database
# ------------------------------------------------------------

DATABASE_PATH = os.path.join(
    os.path.dirname(__file__),
    "database",
    "ktcb.db"
)

connection = sqlite3.connect(DATABASE_PATH)
connection.row_factory = sqlite3.Row

cursor = connection.cursor()


# ------------------------------------------------------------
# Get all students
# ------------------------------------------------------------

cursor.execute("""
    SELECT
        student_id,
        attendance,
        assignment_completion,
        average_marks,
        previous_average
    FROM students
""")

students = cursor.fetchall()

at_risk_count = 0


# ------------------------------------------------------------
# Analyze every student
# ------------------------------------------------------------

for student in students:

    student_id = student["student_id"]

    cursor.execute("""
        SELECT
            subjects.subject_name,
            student_marks.marks
        FROM student_marks
        JOIN subjects
            ON student_marks.subject_id = subjects.subject_id
        WHERE student_marks.student_id = ?
    """, (student_id,))

    subject_rows = cursor.fetchall()

    subjects = {
        row["subject_name"]: row["marks"]
        for row in subject_rows
    }

    student_data = {
        "student_id": student["student_id"],
        "attendance": student["attendance"],
        "assignment_completion": student["assignment_completion"],
        "average_marks": student["average_marks"],
        "previous_average": student["previous_average"],
        "subjects": subjects
    }

    result = analyze_student(student_data)

    if result["risk"]["prediction"] == "AT_RISK":
        at_risk_count += 1

    print("\n==========================================")
    print("Student:", student_id)
    print("==========================================")

    print("Performance:", result["performance"])
    print("Risk:", result["risk"])
    print("Weak Subject:", result["weak_subject"])

    print("Recommendations:")

    for recommendation in result["recommendations"]:
        print("-", recommendation)


# ------------------------------------------------------------
# Final summary
# ------------------------------------------------------------

print("\n==========================================")
print("ADMIN INTEGRATION SUMMARY")
print("==========================================")

print("Total Students:", len(students))
print("At-Risk Students:", at_risk_count)

print("==========================================")


connection.close()