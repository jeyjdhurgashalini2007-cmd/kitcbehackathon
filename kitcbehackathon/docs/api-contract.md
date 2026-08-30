# API Contract

This document defines how the frontend, backend, and AI modules communicate.

## 1. Admin Dashboard

### GET /api/admin/dashboard

Returns overall system statistics for the Admin Dashboard.

### Response

```json
{
  "total_students": 1200,
  "total_teachers": 65,
  "total_courses": 48,
  "at_risk_students": 83,
  "average_attendance": 78,
  "average_performance": 71
}
## 2. AI Student Analysis

### POST /api/ai/analyze-student

The backend sends one student's academic data to the AI module.

### Request

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


### Input Fields

| Field | Type | Description |
|---|---|---|
| student_id | string | Unique student identifier |
| attendance | number | Attendance percentage |
| assignment_completion | number | Assignment completion percentage |
| average_marks | number | Current average marks |
| previous_average | number | Previous academic average |
| subjects | object | Subject-wise marks |

---

### Response

The AI returns performance analysis, risk prediction, weak subject identification, and personalized recommendations.

```json
{
  "student_id": "S101",
  "performance": {
    "score": 55.8,
    "level": "NEEDS_IMPROVEMENT",
    "trend": "DECLINING"
  },
  "risk": {
    "prediction": "AT_RISK",
    "score": 82.4,
    "level": "HIGH"
  },
  "weak_subject": {
    "name": "Mathematics",
    "score": 42
  },
  "recommendations": [
    "Improve class attendance.",
    "Complete pending assignments.",
    "Focus additional study time on Mathematics.",
    "Schedule an academic intervention."
  ]
}

### Response

The AI module returns the student's performance analysis, risk prediction, weakest subject, and personalized recommendations.

```json
{
  "student_id": "S101",
  "performance": {
    "score": 52.8,
    "level": "NEEDS_IMPROVEMENT",
    "trend": "DECLINING"
  },
  "risk": {
    "prediction": "AT_RISK",
    "score": 82.4,
    "level": "HIGH"
  },
  "weak_subject": {
    "name": "Mathematics",
    "score": 42
  },
  "recommendations": [
    "Improve class attendance and attend upcoming sessions regularly.",
    "Complete pending assignments and maintain regular submission.",
    "Increase study time and practice more questions before exams.",
    "Performance is declining. Review recent topics and seek teacher guidance.",
    "Focus additional study time on Mathematics.",
    "Schedule an academic intervention or teacher follow-up."
  ]
}



### Development/Test Data

The response above represents the agreed API contract.

During local development, the sample database contains 5 students,
3 teachers, and 3 courses. Therefore, integration tests will produce
different statistics from the contract example.

The actual dashboard values will be calculated from the database.
The at-risk student count will be based on AI risk predictions.