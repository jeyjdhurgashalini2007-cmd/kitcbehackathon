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


# ------------------------------------------------------------
# Get one student and their subject marks
# ------------------------------------------------------------

connection = sqlite3.connect(DATABASE_PATH)
connection.row_factory = sqlite3.Row

cursor = connection.cursor()

student_id = "S101"

cursor.execute("""
    SELECT
        student_id,
        attendance,
        assignment_completion,
        average_marks,
        previous_average
    FROM students
    WHERE student_id = ?
""", (student_id,))

student = cursor.fetchone()

if student is None:
    print("Student not found")
    connection.close()
    sys.exit(1)


# ------------------------------------------------------------
# Get subject marks
# ------------------------------------------------------------

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


# ------------------------------------------------------------
# Build AI input
# ------------------------------------------------------------

student_data = {
    "student_id": student["student_id"],
    "attendance": student["attendance"],
    "assignment_completion": student["assignment_completion"],
    "average_marks": student["average_marks"],
    "previous_average": student["previous_average"],
    "subjects": subjects
}


# ------------------------------------------------------------
# Send database data to AI
# ------------------------------------------------------------

result = analyze_student(student_data)


# ------------------------------------------------------------
# Display result
# ------------------------------------------------------------

print("\n==========================================")
print("DATABASE → AI INTEGRATION TEST")
print("==========================================")

print("\nStudent:")
print(student_data)

print("\nAI Result:")
print(result)

print("\n==========================================")

connection.close()