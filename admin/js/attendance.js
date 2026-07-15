// ======================================
// SOM ACADEMY ATTENDANCE SYSTEM
// ======================================

let students = JSON.parse(localStorage.getItem("students")) || [];

let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

// ======================================
// Load Students
// ======================================

function loadStudents(){

    let select = document.getElementById("attendanceStudent");

    if(!select) return;

    select.innerHTML = '<option value="">Select Student</option>';

    students.forEach(student=>{

        select.innerHTML += `

        <option value="${student.studentId}">

        ${student.fullname} (${student.studentClass})

        </option>

        `;

    });

}

loadStudents();

// ======================================
// Save Attendance
// ======================================

function saveAttendance(){

    let date = document.getElementById("attendanceDate").value;

    let studentId = document.getElementById("attendanceStudent").value;

    let status = document.getElementById("attendanceStatus").value;

    if(date=="" || studentId==""){

        alert("Please Complete All Fields");

        return;

    }

    let student = students.find(s=>s.studentId==studentId);

    let record={

        date:date,

        studentId:student.studentId,

        fullname:student.fullname,

        studentClass:student.studentClass,

        status:status

    };

    attendance.push(record);

    localStorage.setItem("attendance",JSON.stringify(attendance));

    alert("Attendance Saved Successfully");

    displayAttendance();

    statistics();

}

// ======================================
// Display Attendance
// ======================================

function displayAttendance(){

    let table = document.getElementById("attendanceTable");

    if(!table) return;

    table.innerHTML="";

    attendance.forEach((record,index)=>{

        let badge="present";

        if(record.status=="Absent"){

            badge="absent";

        }

        if(record.status=="Late"){

            badge="late";

        }

        table.innerHTML +=`

        <tr>

        <td>${record.date}</td>

        <td>${record.fullname}</td>

        <td>

        <span class="${badge}">

        ${record.status}

        </span>

        </td>

        <td>

        <button onclick="deleteAttendance(${index})">

        Delete

        </button>

        </td>

        </tr>

        `;

    });

}

displayAttendance();// ======================================
// DELETE ATTENDANCE
// ======================================

function deleteAttendance(index){

    if(confirm("Delete this attendance record?")){

        attendance.splice(index,1);

        localStorage.setItem("attendance",JSON.stringify(attendance));

        displayAttendance();

        statistics();

    }

}

// ======================================
// SEARCH ATTENDANCE
// ======================================

document.getElementById("searchAttendance").addEventListener("keyup",function(){

    let value=this.value.toLowerCase();

    let rows=document.querySelectorAll("#attendanceTable tr");

    rows.forEach(row=>{

        if(row.innerText.toLowerCase().includes(value)){

            row.style.display="";

        }else{

            row.style.display="none";

        }

    });

});

// ======================================
// STATISTICS
// ======================================

function statistics(){

    let present=attendance.filter(a=>a.status=="Present").length;

    let absent=attendance.filter(a=>a.status=="Absent").length;

    let late=attendance.filter(a=>a.status=="Late").length;

    document.getElementById("presentCount").innerHTML=present;

    document.getElementById("absentCount").innerHTML=absent;

    document.getElementById("lateCount").innerHTML=late;

    document.getElementById("totalAttendance").innerHTML=attendance.length;

    document.getElementById("reportStudents").innerHTML=students.length;

    document.getElementById("reportPresent").innerHTML=present;

    document.getElementById("reportAbsent").innerHTML=absent;

    document.getElementById("reportLate").innerHTML=late;

}

statistics();

// ======================================
// PRINT
// ======================================

document.getElementById("printBtn").addEventListener("click",function(){

    window.print();

});

// ======================================
// LIVE CLOCK
// ======================================

function updateClock(){

    let now=new Date();

    let date=now.toLocaleDateString();

    let time=now.toLocaleTimeString();

    let clock=document.getElementById("clock");

    if(clock){

        clock.innerHTML=date+" | "+time;

    }

}

setInterval(updateClock,1000);

updateClock();

// ======================================
// AUTO REFRESH
// ======================================

window.addEventListener("storage",()=>{

    students=JSON.parse(localStorage.getItem("students"))||[];

    attendance=JSON.parse(localStorage.getItem("attendance"))||[];

    loadStudents();

    displayAttendance();

    statistics();

});

// ======================================
// DEFAULT DATE
// ======================================

document.getElementById("attendanceDate").value =
new Date().toISOString().split("T")[0];

// ======================================
// INITIAL LOAD
// ======================================

loadStudents();

displayAttendance();

statistics();