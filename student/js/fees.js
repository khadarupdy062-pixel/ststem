// ======================================
// SOM ACADEMY STUDENT FEES PAGE
// ======================================

let fees = JSON.parse(localStorage.getItem("fees")) || [];


// ======================================
// PAGE LOAD
// ======================================

window.onload = function(){

    displayFees();

    calculateStatistics();

    liveClock();

};


// ======================================
// DISPLAY FEES
// ======================================

function displayFees(data = fees){

    let table = document.getElementById("feesTable");

    if(!table) return;

    table.innerHTML = "";

    data.forEach(fee=>{

        table.innerHTML += `

        <tr>

            <td>${fee.student}</td>

            <td>${fee.class}</td>

            <td>$${fee.amount}</td>

            <td>${fee.method}</td>

            <td>

                <span class="${
                    fee.status=="Paid"
                    ? "paid"
                    : "unpaid"
                }">

                ${fee.status}

                </span>

            </td>

            <td>${fee.date}</td>

            <td>${fee.receipt}</td>

        </tr>

        `;

    });

}



// ======================================
// SEARCH
// ======================================

document
.getElementById("searchFee")
.addEventListener("keyup",function(){

    let value =
    this.value.toLowerCase();

    let filter = fees.filter(fee =>

        fee.student.toLowerCase().includes(value) ||

        fee.receipt.toLowerCase().includes(value) ||

        fee.method.toLowerCase().includes(value)

    );

    displayFees(filter);

});



// ======================================
// STATISTICS
// ======================================

function calculateStatistics(){

    let totalPaid = 0;

    let balance = 0;

    let paidCount = 0;

    let unpaidCount = 0;

    fees.forEach(fee=>{

        if(fee.status=="Paid"){

            totalPaid += Number(fee.amount);

            paidCount++;

        }else{

            balance += Number(fee.amount);

            unpaidCount++;

        }

    });

    document.getElementById("totalPaid").innerHTML =
    "$" + totalPaid;

    document.getElementById("balance").innerHTML =
    "$" + balance;

    document.getElementById("receiptCount").innerHTML =
    fees.length;

    document.getElementById("feeStatus").innerHTML =
    unpaidCount==0 ? "PAID" : "UNPAID";

}



// ======================================
// LIVE CLOCK
// ======================================

function liveClock(){

    let clock =
    document.getElementById("clock");

    if(clock){

        clock.innerHTML =
        new Date().toLocaleTimeString();

    }

}

setInterval(liveClock,1000);



// ======================================
// LOGOUT
// ======================================

function logout(){

    if(confirm("Logout?")){

        window.location.href="../index.html";

    }

}