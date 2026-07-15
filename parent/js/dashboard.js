// ======================================
// SOM ACADEMY PARENT DASHBOARD
// ======================================

let parent =
JSON.parse(localStorage.getItem("loggedUser")) || {};

let students =
JSON.parse(localStorage.getItem("students")) || [];

let attendance =
JSON.parse(localStorage.getItem("attendance")) || [];

let results =
JSON.parse(localStorage.getItem("results")) || [];

let fees =
JSON.parse(localStorage.getItem("fees")) || [];




// ======================================
// LOAD PARENT
// ======================================

function loadParent(){

document.getElementById("parentName").innerHTML =
parent.name || "Parent";

document.getElementById("welcomeParent").innerHTML =
parent.name || "Parent";

document.getElementById("parentPhoto").src =
parent.photo || "../images/avatar.png";

}




// ======================================
// LOAD CHILD
// ======================================

function loadChild(){

let child = students.find(

s => s.studentId == parent.studentId

);

if(!child){

return;

}



// Child Name

document.getElementById("childName").innerHTML =
child.fullname;




// Attendance %

let childAttendance =
attendance.filter(

a=>a.studentId==child.studentId

);

let present =
childAttendance.filter(

a=>a.status=="Present"

).length;

let percent =
childAttendance.length==0
?
0
:
((present/childAttendance.length)*100).toFixed(0);

document.getElementById("attendancePercent").innerHTML =
percent+"%";




// Results

let childResults =
results.filter(

r=>r.studentId==child.studentId

);

document.getElementById("resultCount").innerHTML =
childResults.length;





// Result Table

let table =
document.getElementById("resultTable");

table.innerHTML="";

childResults.slice(-5).reverse().forEach(result=>{

table.innerHTML += `

<tr>

<td>${result.subject}</td>

<td>${result.marks}</td>

<td>${result.grade}</td>

</tr>

`;

});





// Fees

let fee =
fees.find(

f=>f.studentId==child.studentId

);

document.getElementById("feesStatus").innerHTML =
fee
?
fee.status
:
"Not Paid";

}




// ======================================
// CLOCK
// ======================================

function updateClock(){

let now =
new Date();

document.getElementById("clock").innerHTML =

now.toLocaleDateString()

+

" | "

+

now.toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();




// ======================================
// LOGOUT
// ======================================

function logout(){

localStorage.removeItem("loggedUser");

location.href="../index.html";

}




// ======================================
// START
// ======================================

loadParent();

loadChild();