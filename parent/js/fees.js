// ======================================
// SOM ACADEMY PARENT FEES
// ======================================


// GET FEES

let fees =
JSON.parse(localStorage.getItem("fees")) || [];


// GET STUDENTS

let students =
JSON.parse(localStorage.getItem("students")) || [];




// ======================================
// SEARCH FEES BY STUDENT ID
// ======================================

function searchFees(){


let id =
document.getElementById("search").value.trim();



if(id===""){

alert("Enter Student ID");

return;

}



let table =
document.getElementById("feesTable");


table.innerHTML="";




// FIND STUDENT FIRST

let student = students.find(s =>

String(s.studentId)
.trim()
.toLowerCase()
===
id.toLowerCase()

);



if(!student){


table.innerHTML=`

<tr>

<td colspan="5">

Student Not Found

</td>

</tr>

`;

clearStudent();

return;

}




// SHOW STUDENT INFO


document.getElementById("studentPhoto").src =

student.photo || "../images/avatar.png";


document.getElementById("studentName").innerHTML =

student.fullname;


document.getElementById("studentClass").innerHTML =

student.studentClass;





// FIND FEES FOR THIS STUDENT


let studentFees = fees.filter(fee=>{


return (

String(fee.studentId || fee.id || "")
.trim()
.toLowerCase()

===

id.toLowerCase()


)

||


(

String(fee.student || "")
.trim()
.toLowerCase()

===

student.fullname.toLowerCase()

);


});





if(studentFees.length===0){


table.innerHTML=`

<tr>

<td colspan="5">

No Fees Found

</td>

</tr>

`;


return;

}







// DISPLAY FEES


studentFees.forEach(fee=>{


let statusClass = "";


if(fee.status==="Paid"){

statusClass="paid";

}

else{

statusClass="unpaid";

}





table.innerHTML += `


<tr>


<td>

${fee.amount || 0}

</td>


<td>

${fee.method || fee.paymentMethod || ""}

</td>


<td class="${statusClass}">

${fee.status || "Unpaid"}

</td>


<td>

${fee.date || fee.paymentDate || ""}

</td>


<td>

${fee.receipt || fee.receiptNumber || ""}

</td>


</tr>


`;


});


}







// ======================================
// CLEAR STUDENT
// ======================================


function clearStudent(){


document.getElementById("studentPhoto").src =

"../images/avatar.png";


document.getElementById("studentName").innerHTML =

"Student Name";


document.getElementById("studentClass").innerHTML =

"Class";


}







// ======================================
// ENTER SEARCH
// ======================================


document.getElementById("search")

.addEventListener("keyup",function(e){


if(e.key==="Enter"){


searchFees();


}


});







// ======================================
// CLOCK
// ======================================


function updateClock(){


let clock =
document.getElementById("clock");


if(clock){


let now = new Date();


clock.innerHTML =

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


fees =
JSON.parse(localStorage.getItem("fees")) || [];


students =
JSON.parse(localStorage.getItem("students")) || [];


});







// ======================================
// LOGOUT
// ======================================


function logout(){


localStorage.removeItem("loggedUser");


window.location.href="../index.html";


}