// ======================================
// SOM ACADEMY STUDENT LIST
// ======================================

let students = JSON.parse(localStorage.getItem("students")) || [];

// =============================
// Display Students
// =============================

function displayStudents(){

    let tbody = document.getElementById("studentList");

    if(!tbody) return;

    tbody.innerHTML = "";

    if(students.length === 0){

        tbody.innerHTML = `

        <tr>

        <td colspan="10">

        No Students Found

        </td>

        </tr>

        `;

        return;

    }

    students.forEach(student=>{

        tbody.innerHTML += `

        <tr>

        <td>

        <img
        src="${student.photo || '../images/avatar.png'}"
        class="student-photo">

        </td>

        <td>${student.studentId}</td>

        <td>${student.fullname}</td>

        <td>${student.age}</td>

        <td>${student.gender}</td>

        <td>${student.studentClass}</td>

        <td>${student.parent}</td>

        <td>${student.phone}</td>

        <td>${student.email}</td>

        <td>

        <span class="status">

        ${student.status}

        </span>

        </td>

        </tr>

        `;

    });

}

displayStudents();

// =============================
// Statistics
// =============================

function statistics(){

    document.getElementById("totalStudents").innerHTML = students.length;

    let male = students.filter(s=>s.gender==="Male").length;

    let female = students.filter(s=>s.gender==="Female").length;

    let active = students.filter(s=>s.status==="Active").length;

    document.getElementById("maleStudents").innerHTML = male;

    document.getElementById("femaleStudents").innerHTML = female;

    document.getElementById("activeStudents").innerHTML = active;

}

statistics();// ======================================
// SEARCH STUDENT
// ======================================

document.getElementById("search").addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    let rows = document.querySelectorAll("#studentList tr");

    rows.forEach(row => {

        if (row.innerText.toLowerCase().includes(value)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

});

// ======================================
// PRINT
// ======================================

document.getElementById("printBtn").addEventListener("click", function () {

    window.print();

});

// ======================================
// PDF BUTTON
// ======================================

document.getElementById("pdfBtn").addEventListener("click", function () {

    alert("PDF Export Coming Soon");

});

// ======================================
// EXCEL BUTTON
// ======================================

document.getElementById("excelBtn").addEventListener("click", function () {

    alert("Excel Export Coming Soon");

});

// ======================================
// LIVE CLOCK
// ======================================

function updateClock(){

    let now = new Date();

    let date = now.toLocaleDateString();

    let time = now.toLocaleTimeString();

    let clock = document.getElementById("clock");

    if(clock){

        clock.innerHTML = date + " | " + time;

    }

}

setInterval(updateClock,1000);

updateClock();

// ======================================
// AUTO REFRESH
// ======================================

window.addEventListener("storage", () => {

    students = JSON.parse(localStorage.getItem("students")) || [];

    displayStudents();

    statistics();

});