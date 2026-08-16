-- KTCB Hackathon Database Schema

-- Students
CREATE TABLE students (
    student_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE,
    course_id VARCHAR(50),
    year INTEGER,
    attendance DECIMAL(5,2) DEFAULT 0,
    assignment_completion DECIMAL(5,2) DEFAULT 0,
    average_marks DECIMAL(5,2) DEFAULT 0,
    previous_average DECIMAL(5,2) DEFAULT 0
);

-- Teachers
CREATE TABLE teachers (
    teacher_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE
);

-- Courses
CREATE TABLE courses (
    course_id VARCHAR(50) PRIMARY KEY,
    course_name VARCHAR(150) NOT NULL,
    teacher_id VARCHAR(50),
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id)
);

-- Subjects
CREATE TABLE subjects (
    subject_id VARCHAR(50) PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    course_id VARCHAR(50),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

-- Student subject marks
CREATE TABLE student_marks (
    id INTEGER PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    subject_id VARCHAR(50) NOT NULL,
    marks DECIMAL(5,2) NOT NULL,

    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
);