// ======================================
// SOM ACADEMY FEES MANAGEMENT SYSTEM
// ======================================


// Get Data From LocalStorage

let students = JSON.parse(localStorage.getItem("students")) || [];

let fees = JSON.parse(localStorage.getItem("fees")) || [];




// ======================================
// LOAD STUDENTS
// ======================================

function loadStudents(){

    let select = document.getElementById("studentSelect");

    if(!select) return;


    select.innerHTML = `
    <option value="">
    Select Student
    </option>
    `;


    students.forEach((student,index)=>{


        let option = document.createElement("option");


        option.value = index;


        option.textContent =
        student.fullname + " - " + student.studentId;



        select.appendChild(option);



    });



}



loadStudents();





// ======================================
// ADD FEE
// ======================================


function addFee(){



let studentIndex =
document.getElementById("studentSelect").value;



let amount =
document.getElementById("amount").value;



let method =
document.getElementById("paymentMethod").value;



let status =
document.getElementById("paymentStatus").value;



let date =
document.getElementById("paymentDate").value;



let receipt =
document.getElementById("receiptNo").value;





if(studentIndex === "" || amount === "" || receipt === ""){

alert("Please fill all required fields");

return;

}





let student = students[studentIndex];





let fee = {


id:Date.now(),


student:student.fullname,


class:student.studentClass,


amount:Number(amount),


method:method,


status:status,


date:date,


receipt:receipt



};





fees.push(fee);





localStorage.setItem(
"fees",
JSON.stringify(fees)
);





displayFees();


calculateStatistics();




document.getElementById("feeForm")?.reset();




alert("Fee Saved Successfully");



}







// ======================================
// DISPLAY FEES
// ======================================


function displayFees(data = fees){


let table =
document.getElementById("feesTable");



if(!table) return;



table.innerHTML="";





data.forEach((fee)=>{


let row=document.createElement("tr");



row.innerHTML=`

<td>${fee.student}</td>

<td>${fee.class}</td>

<td>$ ${fee.amount}</td>

<td>${fee.method}</td>


<td>

<span class="${fee.status}">
${fee.status}
</span>

</td>


<td>${fee.date}</td>


<td>${fee.receipt}</td>


<td class="action-buttons">


<button 
class="receipt-btn"
onclick="printReceipt(${fee.id})">

<i class="fa-solid fa-print"></i>

</button>


<button 
class="fee-edit-btn"
onclick="editFee(${fee.id})">

<i class="fa-solid fa-pen"></i>

</button>



<button 
class="fee-delete-btn"
onclick="deleteFee(${fee.id})">

<i class="fa-solid fa-trash"></i>

</button>


</td>


`;



table.appendChild(row);



});




}





displayFees();






// ======================================
// DELETE FEE
// ======================================


function deleteFee(id){



if(confirm("Delete this fee record?")){


fees =
fees.filter(
fee=>fee.id !== id
);



localStorage.setItem(
"fees",
JSON.stringify(fees)
);



displayFees();

calculateStatistics();


}



}







// ======================================
// EDIT FEE
// ======================================


function editFee(id){



let fee =
fees.find(
item=>item.id===id
);



let newAmount =
prompt(
"Enter New Amount",
fee.amount
);



if(newAmount){


fee.amount =
Number(newAmount);



localStorage.setItem(
"fees",
JSON.stringify(fees)
);



displayFees();

calculateStatistics();



}



}







// ======================================
// SEARCH FEES
// ======================================


document
.getElementById("searchFee")
?.addEventListener(
"keyup",
function(){


let value =
this.value.toLowerCase();



let result =
fees.filter(
fee=>

fee.student
.toLowerCase()
.includes(value)

);



displayFees(result);



});







// ======================================
// STATISTICS
// ======================================


function calculateStatistics(){



let income=0;

let paid=0;

let unpaid=0;





fees.forEach(fee=>{


if(fee.status==="Paid"){


income += fee.amount;

paid++;


}else{


unpaid++;


}



});





document.getElementById("totalIncome").innerHTML =
income;



document.getElementById("paidCount").innerHTML =
paid;



document.getElementById("unpaidCount").innerHTML =
unpaid;



document.getElementById("receiptCount").innerHTML =
fees.length;



// Dashboard Connection


localStorage.setItem(
"totalIncome",
income
);



}






calculateStatistics();







// ======================================
// CLOCK
// ======================================


function clock(){


let time =
new Date()
.toLocaleTimeString();



let c =
document.getElementById("clock");



if(c){

c.innerHTML=time;

}


}



setInterval(clock,1000);

clock();

// ===============================
// PRINT RECEIPT
// ===============================

function printReceipt(id){


let fee = fees.find(
item => item.id === id
);


localStorage.setItem(
"printFee",
JSON.stringify(fee)
);


window.location.href = "receipt.html";


}