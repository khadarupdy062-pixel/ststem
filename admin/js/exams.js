// ======================================
// SOM ACADEMY EXAMS MANAGEMENT SYSTEM
// ======================================


let students = JSON.parse(localStorage.getItem("students")) || [];

let results = JSON.parse(localStorage.getItem("results")) || [];


// ======================================
// PAGE LOAD
// ======================================

window.onload = function(){

    loadStudents();

    displayResults();

    updateStatistics();

    showAverage();

    defaultDate();

    studentTotal();

};

// ======================================
// STUDENT TOTAL MARKS
// ======================================

function studentTotal(studentId){

    let total = 0;


    results.forEach(result=>{

        if(result.studentId == studentId){

            total += Number(result.marks);

        }

    });


    return total;

}


// ======================================
// LOAD STUDENTS
// ======================================

function loadStudents(){

    let select = document.getElementById("studentSelect");

    if(!select) return;


    select.innerHTML =
    '<option value="">Select Student</option>';


    students.forEach(student=>{


        let option = document.createElement("option");


        option.value = student.studentId;


        option.textContent =
        `${student.fullname} (${student.studentClass})`;


        select.appendChild(option);


    });

}




// ======================================
// GRADE CALCULATION
// ======================================

function calculateGrade(mark){

    if(mark >= 90) return "A";

    if(mark >= 70) return "B";

    if(mark >= 50) return "C";

    if(mark >= 40) return "D";

    return "F";

}




// ======================================
// ADD RESULT
// ======================================

function addResult(){


    let studentId =
    document.getElementById("studentSelect").value;


    let subject =
    document.getElementById("subject").value.trim();


    let marks =
    Number(document.getElementById("marks").value);


    let examDate =
    document.getElementById("examDate").value;



    if(studentId=="" || subject=="" || examDate=="" || isNaN(marks)){

        alert("Please Fill All Fields");

        return;

    }



    if(marks < 0 || marks > 100){

        alert("Marks 0 - 100 Only");

        return;

    }



    let student =
    students.find(
        s=>s.studentId==studentId
    );



    if(!student){

        alert("Student Not Found");

        return;

    }



    let result = {


        studentId:student.studentId,

        fullname:student.fullname,

        studentClass:student.studentClass,

        subject:subject,

        marks:marks,

        grade:calculateGrade(marks),

        examDate:examDate

    };



    results.push(result);



    localStorage.setItem(
        "results",
        JSON.stringify(results)
    );



    alert("Result Saved Successfully");


    displayResults();

    updateStatistics();

    showAverage();


}




// ======================================
// DISPLAY RESULTS
// ======================================

function displayResults(){


    let table =
    document.getElementById("resultsTable");


    if(!table) return;


    table.innerHTML="";



    results.forEach((result,index)=>{


        table.innerHTML += `


        <tr>


        <td>${result.fullname}</td>


        <td>${result.studentClass}</td>


        <td>${result.subject}</td>


        <td>${result.marks}</td>


        <td>

        ${studentTotal(result.studentId)}

        </td>


        <td>${result.grade}</td>


        <td>${result.examDate}</td>


        <td>


        <button onclick="deleteResult(${index})">


        Delete


        </button>


        </td>


        </tr>


        `;


    });


}



// ======================================
// DELETE RESULT
// ======================================

function deleteResult(index){


    if(confirm("Delete Result?")){


        results.splice(index,1);


        localStorage.setItem(
            "results",
            JSON.stringify(results)
        );


        displayResults();

        updateStatistics();

        showAverage();


    }


}





// ======================================
// SEARCH RESULT
// ======================================

function searchResult(){


    let value =
    document.getElementById("searchResult")
    .value
    .toLowerCase();



    let rows =
    document
    .getElementById("resultsTable")
    .getElementsByTagName("tr");



    for(let i=0;i<rows.length;i++){


        let text =
        rows[i].innerText.toLowerCase();



        rows[i].style.display =
        text.includes(value)
        ? ""
        :
        "none";


    }


}





// ======================================
// STATISTICS
// ======================================

function updateStatistics(){


    let total =
    results.length;



    let passed =
    results.filter(
        r=>r.marks>=50
    ).length;



    let failed =
    total - passed;



    if(document.getElementById("totalResults"))

    document.getElementById("totalResults").innerHTML=total;



    if(document.getElementById("passed"))

    document.getElementById("passed").innerHTML=passed;



    if(document.getElementById("failed"))

    document.getElementById("failed").innerHTML=failed;


}





// ======================================
// AVERAGE MARKS
// ======================================

function showAverage(){


    let avg =
    document.getElementById("average");



    if(!avg) return;



    if(results.length==0){

        avg.innerHTML="0%";

        return;

    }



    let total=0;



    results.forEach(r=>{

        total += Number(r.marks);

    });



    avg.innerHTML =
    (total/results.length).toFixed(2)+"%";


}





// ======================================
// PRINT
// ======================================

function printResults(){

    window.print();

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


setInterval(
liveClock,
1000
);





// ======================================
// DEFAULT DATE
// ======================================

function defaultDate(){


    let date =
    document.getElementById("examDate");


    if(date){


        date.value =
        new Date()
        .toISOString()
        .split("T")[0];


    }


}

