// Demo student database
const students = {
  "12345": {
  name: "John Doe",
  password: "password",
  courses: [
    { title: "Mathematics", marks: 42, completion: "40%", grade: "F" },
    { title: "Digital Electronics", marks: 55, completion: "50%", grade: "C" },
    { title: "Programming", marks: 73, completion: "70%", grade: "B" }
  ],
  assignments: [
    { title: "Assignment 1: Mathematics", due: "Sept 5", status: "Submitted" },
    { title: "Assignment 2: Digital Electronics", due: "Sept 15", status: "Pending" }
  ],
  attendance: "55%",
  grades: "C"
},
  "67890": {
    name: "Jane Smith",
    password: "secret",
    courses: [
      { title: "Data Science", marks: 78, completion: "60%", grade: "A--" },
      { title: "Cloud Computing", marks: 88, completion: "40%", grade: "A--" }
    ],
    assignments: [
      { title: "Assignment 1: Python", due: "Sept 10", status: "Submitted" },
      { title: "Assignment 2: Cloud Project", due: "Sept 20", status: "Pending" }
    ],
    attendance: "88%",
    grades: "B+"
  },

  "11111": {
    name: "Alex Kumar",
    password: "alex123",
    courses: [
      { title: "Mathematics", marks: 58, completion: "50%", grade: "C" },
      { title: "Digital Electronics", marks: 62, completion: "60%", grade: "B" },
      { title: "Programming", marks: 65, completion: "70%", grade: "B" }
    ],
    assignments: [
      { title: "Assignment 1: Mathematics", due: "Sept 5", status: "Submitted" },
      { title: "Assignment 2: Digital Electronics", due: "Sept 15", status: "Pending" }
    ],
    attendance: "72%",
    grades: "C+"
  },

  "22222": {
    name: "Priya Sharma",
    password: "priya123",
    courses: [
      { title: "Mathematics", marks: 92, completion: "90%", grade: "A+" },
      { title: "Digital Electronics", marks: 88, completion: "85%", grade: "A" },
      { title: "Programming", marks: 95, completion: "95%", grade: "A+" }
    ],
    assignments: [
      { title: "Assignment 1: Programming", due: "Sept 5", status: "Submitted" },
      { title: "Assignment 2: Electronics", due: "Sept 15", status: "Submitted" }
    ],
    attendance: "96%",
    grades: "A+"
  }
};


// Login function
function loginUser() {
  const id = document.getElementById("studentId").value;
  const pwd = document.getElementById("password").value;

  if (students[id] && students[id].password === pwd) {
    localStorage.setItem("studentId", id);
    window.location.href = "dashboard.html";
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



async function loadAIAnalysis() {
  const aiSection = document.getElementById("aiAnalysis");

  if (!aiSection) return;

  const id = localStorage.getItem("studentId");
const loggedInStudent = students[id];

if (!loggedInStudent) {
  aiSection.innerHTML = "<p>Please login first.</p>";
  return;
}

const averageMarks =
  loggedInStudent.courses.reduce((sum, course) => sum + course.marks, 0) /
  loggedInStudent.courses.length;

const assignmentCompletion =
  (loggedInStudent.assignments.filter(
    assignment => assignment.status === "Submitted"
  ).length / loggedInStudent.assignments.length) * 100;

const student = {
  student_id: id,
  attendance: parseFloat(loggedInStudent.attendance),
  assignment_completion: assignmentCompletion,
  average_marks: averageMarks,
  previous_average: averageMarks,
  subjects: Object.fromEntries(
    loggedInStudent.courses.map(course => [
      course.title,
      course.marks
    ])
  )
};
console.log("AI STUDENT DATA:",student);

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/ai/analyze-student",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
      }
    );

    if (!response.ok) {
      throw new Error("AI analysis failed");
    }

    const data = await response.json();
    const statusSection = document.getElementById("aiStatus");

if (statusSection) {
  statusSection.innerHTML = `
    <h3>🎯 Student Status</h3>
    <p><strong>${data.status_summary.status}</strong></p>
    <p>${data.status_summary.message}</p>
  `;
}

    aiSection.innerHTML = `
  <p>
    <strong>Performance Level:</strong>
    <span class="ai-badge">${data.performance.level}</span>
  </p>

  <p>
    <strong>Performance Score:</strong>
    <span class="ai-score">${data.performance.score}%</span>
  </p>

  <p>
    <strong>Performance Trend:</strong>
    <span class="ai-badge">${data.performance.trend}</span>
  </p>

  <p>
    <strong>Risk Prediction:</strong>
    <span class="ai-badge">${data.risk.prediction}</span>
  </p>

  <p>
    <strong>Risk Level:</strong>
    <span class="ai-risk">${data.risk.level}</span>
  </p>

  <p>
    <strong>Risk Score:</strong>
    <span class="ai-score">${data.risk.score}%</span>
  </p>

  <p>
    <strong>Weakest Subject:</strong>
    <span class="ai-badge">
      ${data.weak_subject.name} (${data.weak_subject.score}%)
    </span>
  </p>
      <h3>💡 Personalized Recommendations</h3>

      <ul>
        ${data.recommendations
          .map(item => `<li>${item}</li>`)
          .join("")}
      </ul>
    `;

  } catch (error) {
    aiSection.innerHTML = `
      <p>Unable to load AI analysis.</p>
      <p>Please make sure the AI backend is running.</p>
    `;
    console.error(error);
  }
}


loadAIAnalysis();