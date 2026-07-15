// ======================================
// SOM ACADEMY PARENT RESULTS
// ======================================


// Get Results

let results =
JSON.parse(localStorage.getItem("results")) || [];


// Get Students

let students =
JSON.parse(localStorage.getItem("students")) || [];




// ======================================
// SEARCH RESULT BY STUDENT ID
// ======================================

function searchResult(){


let id = 
document.getElementById("search").value.trim();



if(id===""){

alert("Enter Student ID");

return;

}



let table =
document.getElementById("resultTable");


table.innerHTML="";




// Find only this student

let studentResults = results.filter(result =>

String(result.studentId).trim().toLowerCase()
===
id.toLowerCase()

);




if(studentResults.length===0){


table.innerHTML=`

<tr>

<td colspan="4">

No Results Found

</td>

</tr>

`;


clearStudent();


return;

}




// Find student information


let student = students.find(s =>

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




// Display Results

studentResults.forEach(result=>{


table.innerHTML += `


<tr>


<td>

${result.subject || ""}

</td>



<td>

${result.examDate || ""}

</td>



<td>

${result.marks || 0}

</td>



<td>

${result.grade || ""}

</td>


</tr>


`;

});





// ======================================
// CLEAR STUDENT
// ======================================

function clearStudent(){


document.getElementById("studentPhoto").src=

"../images/avatar.png";


document.getElementById("studentName").innerHTML=

"Student Name";


document.getElementById("studentClass").innerHTML=

"Class";


}




// ======================================
// ENTER KEY SEARCH
// ======================================

document.getElementById("search")

.addEventListener("keyup",function(e){


if(e.key==="Enter"){


searchResult();


}


});




// ======================================
// CLOCK
// ======================================


function updateClock(){


let now=new Date();


let clock=document.getElementById("clock");


if(clock){


clock.innerHTML =

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


}}
