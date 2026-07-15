// ===============================
// SOM ACADEMY ADMIN DASHBOARD
// ===============================

// Get Students From LocalStorage

// Get Teachers
// ===============================

let students = JSON.parse(localStorage.getItem("students")) || [];// ===============================


let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

// ===============================
// Total Students
// ===============================// ===============================
// Total Teachers
// ===============================

function totalTeachers(){

    let total = document.getElementById("teachers");

    if(total){

        total.innerHTML = teachers.length;

    }

    let stat = document.getElementById("totalTeachersStat");

    if(stat){

        stat.innerHTML = teachers.length;

    }

}

totalTeachers();

function totalStudents() {

    let total = document.getElementById("students");

    if(total){

        total.innerHTML = students.length;

    }

}

totalStudents();

// ===============================
// Recent Students Table
// ===============================

function recentStudents(){

    let table = document.getElementById("recentStudents");

    if(!table) return;

    table.innerHTML = "";

    if(students.length === 0){

        table.innerHTML = `

        <tr>

        <td colspan="4" style="text-align:center;padding:20px;">
        No Students Found
        </td>

        </tr>

        `;

        return;

    }

    let recent = students.slice(-5).reverse();

    recent.forEach(student=>{

        table.innerHTML += `

        <tr>

        <td>${student.studentId}</td>

        <td>${student.fullname}</td>

        <td>${student.studentClass}</td>

        <td>
        <span class="active">Active</span>
        </td>

        </tr>

        `;

    });

}

recentStudents();

// ===============================
// Dashboard Greeting
// ===============================

let hour = new Date().getHours();

let greeting = "";

if(hour < 12){

    greeting = "Good Morning";

}else if(hour < 18){

    greeting = "Good Afternoon";

}else{

    greeting = "Good Evening";

}

let title = document.querySelector(".navbar h2");

if(title){

    title.innerHTML = greeting + ", Admin";

}

// ===============================
// Live Date & Time
// ===============================

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

// ===============================
// Logout
// ===============================

function logout(){

    if(confirm("Are you sure you want to logout?")){

        window.location="../index.html";

    }

}

// ===============================
// Refresh Dashboard
// ===============================

window.addEventListener("storage",()=>{

    students = JSON.parse(localStorage.getItem("students")) || [];

    totalStudents();

    recentStudents();

});window.addEventListener("storage", function(){

    teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    totalTeachers();

});// =====================================
// FEES REPORT CONNECTION
// =====================================


let fees =
JSON.parse(localStorage.getItem("fees")) || [];



function dashboardIncome(){


let income = 0;


let paid = 0;


fees.forEach(fee=>{


if(fee.status==="Paid"){


income += Number(fee.amount);

paid++;


}


});




let totalIncome =
document.getElementById("income");


if(totalIncome){

totalIncome.innerHTML =
"$ " + income;

}




let paidFees =
document.getElementById("paidFees");


if(paidFees){

paidFees.innerHTML =
paid;

}



}



dashboardIncome();