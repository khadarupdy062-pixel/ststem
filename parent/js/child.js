// ======================================
// SOM ACADEMY PARENT - MY CHILD
// ======================================


// Students

let students =
JSON.parse(localStorage.getItem("students")) || [];




// ======================================
// SEARCH STUDENT
// ======================================

function searchStudent(){

let id =
document.getElementById("studentSearch").value.trim();

if(id==""){

alert("Please Enter Student ID");

return;

}



// Find Student

let child =
students.find(student=>

String(student.studentId).trim().toLowerCase()===

id.toLowerCase()

);



if(!child){

alert("Student Not Found");

return;

}



// PHOTO

document.getElementById("studentPhoto").src=

child.photo ||

"../images/avatar.png";



// NAME

document.getElementById("studentName").innerHTML=

child.fullname || "";



// CLASS

document.getElementById("studentClass").innerHTML=

child.studentClass || "";



// STUDENT ID

document.getElementById("studentId").value=

child.studentId || "";



// FULL NAME

document.getElementById("fullname").value=

child.fullname || "";



// GENDER

document.getElementById("gender").value=

child.gender || "";



// AGE

document.getElementById("age").value=

child.age || "";



// CLASS

document.getElementById("class").value=

child.studentClass || "";



// PHONE

document.getElementById("phone").value=

child.phone || "";



// EMAIL

document.getElementById("email").value=

child.email || "";



// PARENT

document.getElementById("parent").value=

child.parent ||

child.parentName ||

"";



// STATUS

document.getElementById("status").value=

child.status ||

"Active";

}





// ======================================
// ENTER KEY SEARCH
// ======================================

document.getElementById("studentSearch")

.addEventListener("keyup",function(e){

if(e.key==="Enter"){

searchStudent();

}

});




// ======================================
// CLOCK
// ======================================

function updateClock(){

let now=new Date();

let clock=

document.getElementById("clock");

if(clock){

clock.innerHTML=

now.toLocaleDateString()

+

" | "

+

now.toLocaleTimeString();

}

}

setInterval(updateClock,1000);

updateClock();




// ======================================
// AUTO UPDATE
// ======================================

window.addEventListener("storage",()=>{

students=

JSON.parse(localStorage.getItem("students")) || [];

});




// ======================================
// LOGOUT
// ======================================

function logout(){

localStorage.removeItem("loggedUser");

window.location.href="../index.html";

}