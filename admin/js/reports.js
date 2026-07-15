// =====================================
// SOM ACADEMY REPORTS SYSTEM
// =====================================


// GET DATA FROM LOCAL STORAGE

let students =
JSON.parse(localStorage.getItem("students")) || [];


let fees =
JSON.parse(localStorage.getItem("fees")) || [];




// =====================================
// TOTAL STUDENTS
// =====================================

function loadStudents(){


let total =
document.getElementById("totalStudents");


if(total){

    total.innerHTML = students.length;

}


}




// =====================================
// FEES STATISTICS
// =====================================

function loadFees(){



let totalIncome = 0;

let paid = 0;

let unpaid = 0;



fees.forEach(fee=>{


if(fee.status === "Paid"){


    paid++;


    totalIncome += Number(fee.amount);


}



if(fee.status === "Unpaid"){


    unpaid++;


}



});





let income =
document.getElementById("totalIncome");


let paidBox =
document.getElementById("paidFees");


let unpaidBox =
document.getElementById("unpaidFees");





if(income){

income.innerHTML =
"$ " + totalIncome;

}



if(paidBox){

paidBox.innerHTML =
paid;

}



if(unpaidBox){

unpaidBox.innerHTML =
unpaid;

}



}





// =====================================
// GENERATE REPORT
// =====================================

function generateReport(){


let type =
document.getElementById("reportType").value;


let table =
document.getElementById("reportTable");


if(!table) return;



table.innerHTML="";




// STUDENT REPORT

if(type === "Student Report"){


students.forEach(student=>{


table.innerHTML += `

<tr>

<td>${student.fullname}</td>

<td>${student.studentClass}</td>

<td>-</td>

<td>${student.status}</td>

<td>-</td>

</tr>

`;


});


}





// FEES REPORT

else if(type === "Fees Report"){


fees.forEach(fee=>{


table.innerHTML += `

<tr>

<td>${fee.student}</td>

<td>${fee.class}</td>

<td>$ ${fee.amount}</td>

<td>${fee.status}</td>

<td>${fee.date}</td>

</tr>

`;


});


}





// PAYMENT REPORT

else if(type === "Payment Report"){


fees
.filter(fee=>fee.status=="Paid")
.forEach(fee=>{


table.innerHTML += `

<tr>

<td>${fee.student}</td>

<td>${fee.class}</td>

<td>$ ${fee.amount}</td>

<td>${fee.method}</td>

<td>${fee.date}</td>

</tr>

`;


});


}



}




// =====================================
// PRINT REPORT
// =====================================


function printReport(){


window.print();


}




// =====================================
// CLOCK
// =====================================


function updateClock(){


let now =
new Date();



let clock =
document.getElementById("clock");



if(clock){


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




// =====================================
// LOAD SYSTEM
// =====================================


loadStudents();

loadFees();

generateReport();
