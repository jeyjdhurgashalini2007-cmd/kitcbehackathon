# AI Student Performance Analysis Module

## Purpose

This module provides AI-based analysis of student academic performance for the KTCB Hackathon platform.

The AI performs:

1. Performance analysis
2. At-risk student detection
3. Weak subject identification
4. Personalized recommendations

---

# Input Data

The AI expects the following student information:

```json
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