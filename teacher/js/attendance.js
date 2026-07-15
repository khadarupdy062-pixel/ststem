// ======================================
// SOM ACADEMY TEACHER ATTENDANCE SYSTEM
// ======================================



let students =
JSON.parse(localStorage.getItem("students")) || [];



let attendance =
JSON.parse(localStorage.getItem("attendance")) || [];





// ======================================
// LOAD STUDENTS
// ======================================


function loadStudents(){


let select =
document.getElementById("studentSelect");



if(!select) return;



select.innerHTML = `

<option value="">

Select Student

</option>

`;




students.forEach((student,index)=>{


select.innerHTML += `

<option value="${index}">

${student.fullname || student.name}

(${student.studentClass || student.class})

</option>

`;


});



}



loadStudents();








// ======================================
// SAVE ATTENDANCE
// ======================================


function saveAttendance(){



let date =
document.getElementById("attendanceDate").value;



let index =
document.getElementById("studentSelect").value;



let status =
document.getElementById("attendanceStatus").value;






if(date=="" || index==""){


alert("Please select student and date");


return;


}





let student =
students[index];





let record = {


id:Date.now(),


date:date,


student:student.fullname || student.name,


class:student.studentClass || student.class,


studentId:student.studentId,


status:status


};







attendance.push(record);





localStorage.setItem(

"attendance",

JSON.stringify(attendance)

);






alert("Attendance Saved Successfully");



displayAttendance();





}










// ======================================
// DISPLAY ATTENDANCE
// ======================================


function displayAttendance(){



let table =
document.getElementById("attendanceTable");



if(!table) return;



table.innerHTML="";





attendance.forEach(record=>{



table.innerHTML += `

<tr>


<td>

${record.date}

</td>


<td>

${record.fullname}

</td>


<td>

${record.studentClass}

</td>


<td>

<span class="${record.status.toLowerCase()}">

${record.status}

</span>

</td>



</tr>

`;



});



}





displayAttendance();








// ======================================
// AUTO UPDATE
// ======================================


window.addEventListener("storage",()=>{


students =
JSON.parse(localStorage.getItem("students")) || [];



attendance =
JSON.parse(localStorage.getItem("attendance")) || [];



loadStudents();

displayAttendance();


});







// ======================================
// DEFAULT DATE
// ======================================


let dateInput =
document.getElementById("attendanceDate");


if(dateInput){


dateInput.value =
new Date()
.toISOString()
.split("T")[0];


}







// ======================================
// CLOCK
// ======================================


function clock(){



let c =
document.getElementById("clock");



if(c){


c.innerHTML =
new Date().toLocaleDateString()
+" | "+
new Date().toLocaleTimeString();


}


}



setInterval(clock,1000);

clock();







// ======================================
// LOGOUT
// ======================================


function logout(){


localStorage.removeItem("loggedUser");


window.location.href="../index.html";


}