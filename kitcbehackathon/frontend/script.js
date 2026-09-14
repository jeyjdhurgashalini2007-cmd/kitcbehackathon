// Demo student database
const students = {
  "12345": {
    name: "John Doe",
    password: "password",
    courses: [
      { title: "Web Development Basics", marks: 85, completion: "70%", grade:"A--" },
      { title: "AI for Beginners", marks: 90, completion: "50%", grade:"A--" }
    ],
    assignments: [
      { title: "Assignment 1: HTML", due: "Sept 5", status: "Submitted" },
      { title: "Assignment 2: AI Concepts", due: "Sept 15", status: "Pending" }
    ],
    attendance: "92%",
    grades: "A"
  },
  "67890": {
    name: "Jane Smith",
    password: "secret",
    courses: [
      { title: "Data Science", marks: 78, completion: "60%",grade:"A--" },
      { title: "Cloud Computing", marks: 88, completion: "40%", grade:"A--" }
    ],
    assignments: [
      { title: "Assignment 1: Python", due: "Sept 10", status: "Submitted" },
      { title: "Assignment 2: Cloud Project", due: "Sept 20", status: "Pending" }
    ],
    attendance: "88%",
    grades: "B+"
  }
};

// Login function
function loginUser() {
  const id = document.getElementById("studentId").value;
  const pwd = document.getElementById("password").value;

  if (students[id] && students[id].password === pwd) {
    localStorage.setItem("studentId", id);
    window.location.href = "/student/dashboard";
    return false;
  } else {
    document.getElementById("loginMessage").innerText = "Invalid credentials!";
    return false;
  }
}

// Load student data on each page
//Load student data on each page
window.onload = function() {
  const id = localStorage.getItem("studentId");
  if (id && students[id]) {
    const student = students[id];

    // Dashboard greeting
    if (document.getElementById("studentName")) {
      document.getElementById("studentName").innerText = student.name;
    }

    // Courses page
    if (document.getElementById("courseList")) {
      document.getElementById("courseList").innerHTML =
        student.courses.map(c => `
          <div class="card">
            <h3>${c.title}</h3>
            <p>Marks: ${c.marks}</p>
            <p>Completion: ${c.completion}</p>
          </div>
        `).join("");
    }

    // Assignments page
    if (document.getElementById("assignmentList")) {
      document.getElementById("assignmentList").innerHTML =
        student.assignments.map(a => `
          <div class="card">
            <h3>${a.title}</h3>
            <p>Due: ${a.due}</p>
            <p>Status: ${a.status}</p>
          </div>
        `).join("");
    }

    // Profile page
    if (document.getElementById("profileDetails")) {
      document.getElementById("profileDetails").innerHTML = `
        <div class="card">
          <p><strong>Name:</strong> ${student.name}</p>
          <p><strong>ID:</strong> ${id}</p>
          <p><strong>Attendance:</strong> ${student.attendance}</p>
          <p><strong>Overall Grade:</strong> ${student.grades}</p>
        </div>
      `;
    }
    if (document.getElementById("courseList")) {
  document.getElementById("courseList").innerHTML =
    student.courses.map(c => {
      const percent = parseInt(c.completion);
      return `
        <div class="card">
          <h3>${c.title}</h3>
          <p>Marks: ${c.marks}</p>
          <p>Completion: ${c.completion}</p>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${percent}%"></div>
          </div>
        </div>
      `;
    }).join("");
}
if (document.getElementById("assignmentList")) {
  document.getElementById("assignmentList").innerHTML =
    student.assignments.map(a => `
      <div class="card">
        <h3>${a.title}</h3>
        <p>Due: ${a.due}</p>
        <p>Status: <span class="status-${a.status.toLowerCase()}">${a.status}</span></p>
      </div>
    `).join("");
}
if (document.getElementById("courseSummary")) {
  document.getElementById("courseSummary").innerHTML = `
    <tr><th>Course</th><th>Marks</th><th>Grade</th><th>Completion</th></tr>
    ${student.courses.map(c => `
      <tr>
        <td>${c.title}</td>
        <td>${c.marks}</td>
        <td>${c.grade}</td>
        <td>${c.completion}</td>
      </tr>
    `).join("")}
  `;
}


  }
  
};
function logoutUser() {
  localStorage.removeItem("studentId");
  window.location.href = "index.html";
}



