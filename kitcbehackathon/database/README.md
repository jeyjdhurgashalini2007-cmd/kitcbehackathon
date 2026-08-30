# Database

This folder contains the database schema and sample data for the KTCB Hackathon project.

## Files

### schema.sql

Contains the database table definitions.

### sample_data.sql

Contains sample teachers, courses, subjects, students and student marks for development and testing.

## Main Tables

### students

Stores basic student information and academic summary data.

Fields:

- student_id
- name
- email
- course_id
- year
- attendance
- assignment_completion
- average_marks
- previous_average

### teachers

Stores teacher information.

Fields:

- teacher_id
- name
- email

### courses

Stores course information.

Fields:

- course_id
- course_name
- teacher_id

### subjects

Stores subjects associated with courses.

Fields:

- subject_id
- subject_name
- course_id

### student_marks

Stores subject-wise marks for each student.

Fields:

- id
- student_id
- subject_id
- marks

## AI Integration

The backend should combine data from `students`, `student_marks` and `subjects` to create the AI request.

Example:

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