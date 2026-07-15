// =================================
// SOM ACADEMY RECEIPT
// =================================


let selectedFee =
JSON.parse(
localStorage.getItem("printFee")
);




if(selectedFee){



document.getElementById("studentName")
.innerHTML =
selectedFee.student;



document.getElementById("studentClass")
.innerHTML =
selectedFee.class;



document.getElementById("amount")
.innerHTML =
selectedFee.amount;



document.getElementById("method")
.innerHTML =
selectedFee.method;



document.getElementById("status")
.innerHTML =
selectedFee.status;



document.getElementById("date")
.innerHTML =
selectedFee.date;



document.getElementById("receipt")
.innerHTML =
selectedFee.receipt;



}