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