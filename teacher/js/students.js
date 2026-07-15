// ======================================
// SOM ACADEMY TEACHER STUDENTS
// ======================================



// GET STUDENTS FROM ADMIN SYSTEM

let students =
JSON.parse(localStorage.getItem("students")) || [];





// ======================================
// DISPLAY STUDENTS
// ======================================


function displayStudents(data = students){


let table =
document.getElementById("studentTable");



if(!table) return;



table.innerHTML="";



data.forEach((student,index)=>{



table.innerHTML += `

<tr>


<td>

${student.studentId || index+1}

</td>



<td>

${student.fullname || student.name}

</td>



<td>

${student.studentClass || student.class}

</td>



<td>

${student.phone || "N/A"}

</td>



</tr>

`;



});



}





displayStudents();







// ======================================
// SEARCH STUDENTS
// ======================================


document
.getElementById("searchStudent")
.addEventListener("keyup",function(){



let value =
this.value.toLowerCase();



let result =
students.filter(student=>{


let name =
(student.fullname || student.name || "")
.toLowerCase();



let cls =
(student.studentClass || student.class || "")
.toLowerCase();



return name.includes(value) ||
cls.includes(value);



});



displayStudents(result);



});








// ======================================
// AUTO UPDATE FROM ADMIN
// ======================================


window.addEventListener("storage",function(){



students =
JSON.parse(localStorage.getItem("students")) || [];



displayStudents();



});








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