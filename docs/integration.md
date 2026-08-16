# Integration Guide

## 1. Project Modules

The project consists of:

- Frontend
- Backend
- Database
- AI Model
- Admin Dashboard

## 2. Student Data

The database stores student academic information including:

- student_id
- name
- email
- course_id
- year
- attendance
- assignment_completion
- average_marks
- previous_average
- subjects

## 3. Admin Dashboard Flow

The Admin Dashboard gets statistics from the Backend.

The Backend gets the required data from the Database.

```text
Database
    ↓
Backend
    ↓
Admin Dashboard


# Integration Documentation

## AI Student Analysis

The AI module is located inside:

`ai-model/`

The main function is:

`analyze_student(student)`

The backend should send one student's academic data to the AI module.

### Input

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