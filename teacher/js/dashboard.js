// ======================================
// SOM ACADEMY TEACHER DASHBOARD
// ======================================


let teacher =
JSON.parse(localStorage.getItem("loggedUser")) || null;



let students =
JSON.parse(localStorage.getItem("students")) || [];



let attendance =
JSON.parse(localStorage.getItem("attendance")) || [];



let results =
JSON.parse(localStorage.getItem("results")) || [];




// ======================================
// LOAD TEACHER PROFILE
// ======================================


function loadTeacher(){


let teacherName =
document.getElementById("teacherName");


let welcomeName =
document.getElementById("welcomeName");


let teacherPhoto =
document.getElementById("teacherPhoto");



if(teacher){


let name =
teacher.name || teacher.fullname || "Teacher";



if(teacherName){

teacherName.innerHTML=name;

}



if(welcomeName){

welcomeName.innerHTML=name;

}




if(teacherPhoto){

teacherPhoto.src =
teacher.photo || "../images/avatar.png";

}



}



}





// ======================================
// DASHBOARD STATISTICS
// ======================================


function loadStatistics(){



let totalStudents =
document.getElementById("totalStudents");



if(totalStudents){

totalStudents.innerHTML =
students.length;

}




// Classes Count


let classes=[];


students.forEach(student=>{


let cls =
student.studentClass;



if(cls && !classes.includes(cls)){


classes.push(cls);


}


});



let totalClasses =
document.getElementById("totalClasses");



if(totalClasses){

totalClasses.innerHTML =
classes.length;

}




// Exams


let totalExams =
document.getElementById("totalExams");



if(totalExams){

totalExams.innerHTML =
results.length;

}




// Attendance


let totalAttendance =
document.getElementById("totalAttendance");



if(totalAttendance){

totalAttendance.innerHTML =
attendance.length;

}



}







// ======================================
// RECENT STUDENTS
// ======================================


function loadStudents(){


let table =
document.getElementById("studentTable");



if(!table)return;



table.innerHTML="";



students.slice(-5).reverse().forEach(student=>{


table.innerHTML += `

<tr>

<td>

${student.fullname}

</td>


<td>

${student.studentClass}

</td>


</tr>


`;


});


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
+
" | "
+
new Date().toLocaleTimeString();


}


}


setInterval(clock,1000);

clock();







// ======================================
// AUTO UPDATE
// ======================================


window.addEventListener("storage",()=>{


students =
JSON.parse(localStorage.getItem("students")) || [];



attendance =
JSON.parse(localStorage.getItem("attendance")) || [];



results =
JSON.parse(localStorage.getItem("results")) || [];



loadStatistics();

loadStudents();


});







// ======================================
// LOGOUT
// ======================================


function logout(){


localStorage.removeItem("loggedUser");


window.location.href="../index.html";


}






// START

loadTeacher();

loadStatistics();

loadStudents();