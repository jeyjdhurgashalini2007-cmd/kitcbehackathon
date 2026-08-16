-- KTCB Hackathon Sample Data

-- Teachers
INSERT INTO teachers (teacher_id, name, email) VALUES
('T001', 'Anita Kumar', 'anita@example.com'),
('T002', 'Rahul Sharma', 'rahul@example.com'),
('T003', 'Priya Menon', 'priya@example.com');

-- Courses
INSERT INTO courses (course_id, course_name, teacher_id) VALUES
('CSE01', 'Computer Science', 'T001'),
('ECE01', 'Electronics and Communication', 'T002'),
('EEE01', 'Electrical Engineering', 'T003');

-- Subjects
INSERT INTO subjects (subject_id, subject_name, course_id) VALUES
('SUB001', 'Mathematics', 'CSE01'),
('SUB002', 'Physics', 'CSE01'),
('SUB003', 'Programming', 'CSE01'),
('SUB004', 'Chemistry', 'CSE01'),
('SUB005', 'Digital Electronics', 'ECE01'),
('SUB006', 'Circuit Theory', 'ECE01'),
('SUB007', 'Electrical Machines', 'EEE01');

-- Students
INSERT INTO students (
    student_id,
    name,
    email,
    course_id,
    year,
    attendance,
    assignment_completion,
    average_marks,
    previous_average
) VALUES
('S101', 'Arun Kumar', 'arun@example.com', 'CSE01', 2, 55, 48, 51, 65),
('S102', 'Meena Raj', 'meena@example.com', 'CSE01', 2, 92, 95, 88, 84),
('S103', 'Vijay Singh', 'vijay@example.com', 'CSE01', 2, 68, 72, 64, 70),
('S104', 'Divya Nair', 'divya@example.com', 'ECE01', 3, 81, 85, 79, 76),
('S105', 'Karthik Rao', 'karthik@example.com', 'EEE01', 3, 45, 40, 46, 58);

-- Student subject marks
INSERT INTO student_marks (id, student_id, subject_id, marks) VALUES
-- S101
(1, 'S101', 'SUB001', 42),
(2, 'S101', 'SUB002', 61),
(3, 'S101', 'SUB003', 73),
(4, 'S101', 'SUB004', 47),

-- S102
(5, 'S102', 'SUB001', 91),
(6, 'S102', 'SUB002', 87),
(7, 'S102', 'SUB003', 89),
(8, 'S102', 'SUB004', 85),

-- S103
(9, 'S103', 'SUB001', 60),
(10, 'S103', 'SUB002', 64),
(11, 'S103', 'SUB003', 71),
(12, 'S103', 'SUB004', 58),

-- S104
(13, 'S104', 'SUB005', 80),
(14, 'S104', 'SUB006', 76),

-- S105
(15, 'S105', 'SUB007', 44),
(16, 'S105', 'SUB001', 48);