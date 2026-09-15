// Demo student database
const students = {
  "12345": {
  name: "John Doe",
  password: "password",
  performanceHistory: [
  { label: "Assessment 1", score: 48 },
  { label: "Assessment 2", score: 51 },
  { label: "Midterm", score: 54 },
  { label: "Latest", score: 57 }
],
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
    performanceHistory: [
  { label: "Assessment 1", score: 72 },
  { label: "Assessment 2", score: 76 },
  { label: "Midterm", score: 81 },
  { label: "Latest", score: 84 }
],
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
    performanceHistory: [
  { label: "Assessment 1", score: 52 },
  { label: "Assessment 2", score: 57 },
  { label: "Midterm", score: 61 },
  { label: "Latest", score: 65 }
],
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
    performanceHistory: [
  { label: "Assessment 1", score: 82 },
  { label: "Assessment 2", score: 87 },
  { label: "Midterm", score: 91 },
  { label: "Latest", score: 94 }
],
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
// Load student data on each page
window.onload = function () {

  const id = localStorage.getItem("studentId");

  if (!id || !students[id]) {
    return;
  }

  const student = students[id];

  // =====================================================
  // DASHBOARD
  // =====================================================

  if (document.getElementById("studentName")) {
    document.getElementById("studentName").innerText = student.name;
  }


  // =====================================================
  // COURSES PAGE
  // =====================================================

  if (document.getElementById("courseList")) {

    const averageMarks =
      student.courses.reduce((sum, course) => sum + course.marks, 0) /
      student.courses.length;

    const averageCompletion =
      student.courses.reduce(
        (sum, course) => sum + parseInt(course.completion),
        0
      ) / student.courses.length;

    // Overview cards
    if (document.getElementById("totalCourses")) {
      document.getElementById("totalCourses").innerText =
        student.courses.length;
    }

    if (document.getElementById("courseAverage")) {
      document.getElementById("courseAverage").innerText =
        averageMarks.toFixed(1) + "%";
    }

    if (document.getElementById("courseProgress")) {
      document.getElementById("courseProgress").innerText =
        Math.round(averageCompletion) + "%";
    }

    // Course cards
    document.getElementById("courseList").innerHTML =
      student.courses.map(course => {

        const completion = parseInt(course.completion);

        return `
          <li class="course-card">

            <div class="course-card-header">
              <div class="course-icon">📚</div>

              <div>
                <h3>${course.title}</h3>
                <span class="course-code">
                  Academic Course
                </span>
              </div>
            </div>

            <div class="course-score">
              <strong>${course.marks}%</strong>
              <span>Current Score</span>
            </div>

            <div class="course-info">
              <div>
                <span>Grade</span>
                <strong>${course.grade}</strong>
              </div>

              <div>
                <span>Completion</span>
                <strong>${course.completion}</strong>
              </div>
            </div>

            <div class="progress-label">
              <span>Course Progress</span>
              <span>${course.completion}</span>
            </div>

            <div class="progress-bar">
              <div
                class="progress-fill"
                style="width:${completion}%">
              </div>
            </div>

          </li>
        `;

      }).join("");
  }


  // =====================================================
  // ASSIGNMENTS PAGE
  // =====================================================

  if (document.getElementById("assignmentList")) {

    const totalAssignments = student.assignments.length;

    const submittedAssignments =
      student.assignments.filter(
        assignment =>
          assignment.status.toLowerCase() === "submitted"
      ).length;

    const pendingAssignments =
      totalAssignments - submittedAssignments;

    const completionRate =
      totalAssignments > 0
        ? Math.round(
            (submittedAssignments / totalAssignments) * 100
          )
        : 0;

    // Overview cards
    if (document.getElementById("totalAssignments")) {
      document.getElementById("totalAssignments").innerText =
        totalAssignments;
    }

    if (document.getElementById("submittedAssignments")) {
      document.getElementById("submittedAssignments").innerText =
        submittedAssignments;
    }

    if (document.getElementById("pendingAssignments")) {
      document.getElementById("pendingAssignments").innerText =
        pendingAssignments;
    }

    if (document.getElementById("assignmentProgress")) {
      document.getElementById("assignmentProgress").innerText =
        completionRate + "%";
    }

    // Assignment cards
    document.getElementById("assignmentList").innerHTML =
      student.assignments.map(assignment => {

        const isSubmitted =
          assignment.status.toLowerCase() === "submitted";

        return `
          <li class="assignment-card">

            <div class="assignment-header">

              <div class="assignment-icon">
                📝
              </div>

              <div>
                <h3>${assignment.title}</h3>
                <span class="assignment-type">
                  Academic Assignment
                </span>
              </div>

            </div>

            <div class="assignment-details">

              <p>
                <strong>📅 Due Date</strong>
                ${assignment.due}
              </p>

              <p>
                <strong>📌 Status</strong>
                <span class="${
                  isSubmitted
                    ? "status-submitted"
                    : "status-pending"
                }">
                  ${assignment.status}
                </span>
              </p>

            </div>

            <div class="assignment-action">

              ${
                isSubmitted
                  ? `
                    <span class="assignment-complete">
                      ✓ Assignment Completed
                    </span>
                  `
                  : `
                    <span class="assignment-pending">
                      ⚠ Submission Required
                    </span>
                  `
              }

            </div>

          </li>
        `;

      }).join("");
  }


  // =====================================================
  // PROFILE PAGE
  // =====================================================

  if (document.getElementById("profileDetails")) {

    const averageMarks =
      student.courses.reduce(
        (sum, course) => sum + course.marks,
        0
      ) / student.courses.length;

    // Profile name
    if (document.getElementById("profileName")) {
      document.getElementById("profileName").innerText =
        student.name;
    }

    // Profile details
    document.getElementById("profileDetails").innerHTML = `
      <p>
        <strong>Student ID:</strong>
        ${id}
      </p>

      <p>
        <strong>Attendance:</strong>
        ${student.attendance}
      </p>

      <p>
        <strong>Overall Grade:</strong>
        ${student.grades}
      </p>
    `;

    // Academic overview
    if (document.getElementById("profileCourseCount")) {
      document.getElementById("profileCourseCount").innerText =
        student.courses.length;
    }

    if (document.getElementById("profileAverageMarks")) {
      document.getElementById("profileAverageMarks").innerText =
        averageMarks.toFixed(1) + "%";
    }

    if (document.getElementById("profileAttendance")) {
      document.getElementById("profileAttendance").innerText =
        student.attendance;
    }

    if (document.getElementById("profileGrade")) {
      document.getElementById("profileGrade").innerText =
        student.grades;
    }
  }


  // =====================================================
  // PROFILE COURSE PERFORMANCE TABLE
  // =====================================================

  if (document.getElementById("courseSummary")) {

    document.getElementById("courseSummary").innerHTML = `
      <tr>
        <th>Course</th>
        <th>Marks</th>
        <th>Grade</th>
        <th>Completion</th>
      </tr>

      ${student.courses.map(course => `
        <tr>
          <td><strong>${course.title}</strong></td>
          <td>${course.marks}%</td>
          <td>${course.grade}</td>
          <td>${course.completion}</td>
        </tr>
      `).join("")}
    `;
  }


    // PERFORMANCE TREND CHART
  if (document.getElementById("performanceChart")) {

    const history = student.performanceHistory || [];

    const labels = history.map(item => item.label);
    const scores = history.map(item => item.score);

    const ctx = document
      .getElementById("performanceChart")
      .getContext("2d");

    new Chart(ctx, {
      type: "line",

      data: {
        labels: labels,

        datasets: [{
          label: "Performance",

          data: scores,

          borderWidth: 3,

          tension: 0.4,

          pointRadius: 5,

          pointHoverRadius: 7,

          fill: true,

          backgroundColor: "rgba(79, 70, 229, 0.10)",

          borderColor: "#4f46e5",

          pointBackgroundColor: "#4f46e5",

          pointBorderColor: "#ffffff",

          pointBorderWidth: 2
        }]
      },

      options: {
        responsive: true,

        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: false
          },

          tooltip: {
            callbacks: {
              label: function(context) {
                return " Score: " + context.parsed.y + "%";
              }
            }
          }
        },

        scales: {
          y: {
            beginAtZero: true,
            max: 100,

            ticks: {
              callback: function(value) {
                return value + "%";
              }
            },

            grid: {
              color: "rgba(0,0,0,0.06)"
            }
          },

          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
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