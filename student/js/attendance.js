// ======================================
// SOM ACADEMY STUDENT ATTENDANCE
// ======================================

let attendance =
JSON.parse(localStorage.getItem("attendance")) || [];


// ======================================
// PAGE LOAD
// ======================================

window.onload = function(){

    displayAttendance();

    updateStatistics();

    liveClock();

};



// ======================================
// DISPLAY ATTENDANCE
// ======================================

function displayAttendance(data = attendance){

    let table =
    document.getElementById("attendanceTable");

    if(!table) return;

    table.innerHTML = "";

    data.forEach(record=>{

        let statusClass="";

        if(record.status=="Present"){

            statusClass="present";

        }

        else if(record.status=="Absent"){

            statusClass="absent";

        }

        else{

            statusClass="late";

        }

        table.innerHTML += `

        <tr>

            <td>${record.date}</td>

            <td>${record.fullname}</td>

            <td>${record.studentClass}</td>

            <td>

                <span class="${statusClass}">

                ${record.status}

                </span>

            </td>

        </tr>

        `;

    });

}



// ======================================
// SEARCH
// ======================================

document
.getElementById("searchAttendance")
.addEventListener("keyup",function(){

    let value =
    this.value.toLowerCase();

    let filter =
    attendance.filter(item=>

        item.student.toLowerCase().includes(value) ||

        item.class.toLowerCase().includes(value) ||

        item.status.toLowerCase().includes(value) ||

        item.date.toLowerCase().includes(value)

    );

    displayAttendance(filter);

});




// ======================================
// STATISTICS
// ======================================

function updateStatistics(){

    let present=0;

    let absent=0;

    let late=0;

    attendance.forEach(item=>{

        if(item.status=="Present"){

            present++;

        }

        else if(item.status=="Absent"){

            absent++;

        }

        else{

            late++;

        }

    });

    let total =
    attendance.length;

    let percent =
    total==0
    ?0
    :((present/total)*100).toFixed(1);

    document.getElementById("presentCount").innerHTML =
    present;

    document.getElementById("absentCount").innerHTML =
    absent;

    document.getElementById("lateCount").innerHTML =
    late;

    document.getElementById("attendancePercent").innerHTML =
    percent+"%";

}



// ======================================
// CLOCK
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