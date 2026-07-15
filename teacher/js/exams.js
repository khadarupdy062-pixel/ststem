// ======================================
// SOM ACADEMY TEACHER EXAMS SYSTEM
// ======================================



let students =
JSON.parse(localStorage.getItem("students")) || [];



let results =
JSON.parse(localStorage.getItem("results")) || [];







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

-

${student.studentClass || student.class}

</option>

`;



});


}



loadStudents();







// ======================================
// ADD RESULT
// ======================================


function addResult(){



let studentIndex =
document.getElementById("studentSelect").value;



let subject =
document.getElementById("subject").value;



let marks =
document.getElementById("marks").value;






if(studentIndex=="" || subject=="" || marks==""){


alert("Please fill all fields");


return;


}






let student =
students[studentIndex];





let grade="";



if(marks>=90){

grade="A";

}

else if(marks>=80){

grade="B";

}

else if(marks>=70){

grade="C";

}

else if(marks>=60){

grade="D";

}

else{

grade="F";

}






let result={



id:Date.now(),



studentId:student.studentId,



student:
student.fullname || student.name,



class:
student.studentClass || student.class,



subject:subject,



marks:Number(marks),



grade:grade



};






results.push(result);





localStorage.setItem(

"results",

JSON.stringify(results)

);






alert("Result Saved Successfully");




displayResults();



document.getElementById("subject").value="";

document.getElementById("marks").value="";



}









// ======================================
// DISPLAY RESULTS
// ======================================


function displayResults(){



let table =
document.getElementById("resultTable");



if(!table) return;



table.innerHTML="";





results.forEach(result=>{



table.innerHTML += `

<tr>



<td>

${result.fullname}

</td>



<td>

${result.studentClass}

</td>



<td>

${result.marks}

</td>



<td>

${result.grade}

</td>



</tr>

`;



});



}



displayResults();










// ======================================
// AUTO UPDATE
// ======================================


window.addEventListener("storage",()=>{


students =
JSON.parse(localStorage.getItem("students")) || [];



results =
JSON.parse(localStorage.getItem("results")) || [];



loadStudents();

displayResults();


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