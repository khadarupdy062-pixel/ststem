// ======================================
// SOM ACADEMY PARENT ATTENDANCE
// ======================================


// Get Attendance

let attendance = 
JSON.parse(localStorage.getItem("attendance")) || [];


// Get Students

let students =
JSON.parse(localStorage.getItem("students")) || [];




// ======================================
// SEARCH ATTENDANCE BY STUDENT ID
// ======================================

function searchAttendance(){


let id =
document.getElementById("search").value.trim();



if(id===""){

alert("Please Enter Student ID");

return;

}



// Clear old data

let table =
document.getElementById("attendanceTable");

table.innerHTML="";



// Find only this student

let records = attendance.filter(record =>

String(record.studentId).trim().toLowerCase()
===
id.toLowerCase()

);



if(records.length === 0){


table.innerHTML=`

<tr>

<td colspan="5">

No Attendance Found

</td>

</tr>

`;

clearStudent();

return;

}



// Find student information

let student =
students.find(s =>

String(s.studentId).trim().toLowerCase()
===
id.toLowerCase()

);



if(student){

document.getElementById("studentPhoto").src =

student.photo || "../images/avatar.png";


document.getElementById("studentName").innerHTML =

student.fullname;


document.getElementById("studentClass").innerHTML =

student.studentClass;

}




let present=0;

let absent=0;

let late=0;




records.forEach(record=>{


if(record.status==="Present"){

present++;

}

else if(record.status==="Absent"){

absent++;

}

else if(record.status==="Late"){

late++;

}




table.innerHTML += `

<tr>

<td>${record.date}</td>

<td>${record.studentId}</td>

<td>${record.fullname}</td>

<td>${record.studentClass}</td>

<td>

${record.status}

</td>

</tr>

`;

});




// Statistics


document.getElementById("presentCount").innerHTML=

present;


document.getElementById("absentCount").innerHTML=

absent;


document.getElementById("lateCount").innerHTML=

late;



let percent =

((present / records.length) * 100).toFixed(0);



document.getElementById("attendancePercent").innerHTML=

percent+"%";

}




// ======================================
// CLEAR STUDENT
// ======================================

function clearStudent(){


document.getElementById("studentName").innerHTML=

"Student Name";


document.getElementById("studentClass").innerHTML=

"Class";


document.getElementById("studentPhoto").src=

"../images/avatar.png";


document.getElementById("presentCount").innerHTML=0;

document.getElementById("absentCount").innerHTML=0;

document.getElementById("lateCount").innerHTML=0;

document.getElementById("attendancePercent").innerHTML="0%";


}




// ======================================
// CLOCK
// ======================================

function updateClock(){

let now=new Date();

let clock=document.getElementById("clock");


if(clock){

clock.innerHTML=

now.toLocaleDateString()

+" | "+

now.toLocaleTimeString();

}

}


setInterval(updateClock,1000);

updateClock();





// ======================================
// LOGOUT
// ======================================

function logout(){

localStorage.removeItem("loggedUser");

window.location.href="../index.html";

}