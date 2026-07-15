// ======================================
// SOM ACADEMY TEACHER LIST
// ======================================


let teachers = JSON.parse(localStorage.getItem("teachers")) || [];



// ======================================
// DISPLAY TEACHERS
// ======================================


function displayTeachers(){


    let tbody = document.getElementById("teacherList");


    if(!tbody) return;



    tbody.innerHTML = "";



    if(teachers.length === 0){


        tbody.innerHTML = `

        <tr>

        <td colspan="10">

        No Teachers Found

        </td>

        </tr>

        `;


        return;

    }





    teachers.forEach(teacher=>{



        tbody.innerHTML += `


        <tr>



        <td>


        <img

        src="${teacher.photo || '../images/avatar.png'}"

        class="teacher-photo">


        </td>




        <td>

        ${teacher.teacherId}

        </td>





        <td>

        ${teacher.name}

        </td>





        <td>

        ${teacher.email}

        </td>





        <td>

        ${teacher.phone}

        </td>





        <td>

        ${teacher.subject}

        </td>





        <td>

        ${teacher.qualification}

        </td>





        <td>

        ${teacher.gender}

        </td>





        <td>

        ${teacher.joinDate}

        </td>





        <td>


        <span class="status">

        ${teacher.status}

        </span>


        </td>





        </tr>



        `;



    });



}




displayTeachers();





// ======================================
// STATISTICS
// ======================================


function statistics(){



let total = document.getElementById("totalTeachers");

let subjects = document.getElementById("totalSubjects");

let active = document.getElementById("activeTeachers");

let male = document.getElementById("maleTeachers");




if(total){

total.innerHTML = teachers.length;

}





let subjectList = [

...new Set(

teachers.map(t=>t.subject)

)

];



if(subjects){

subjects.innerHTML = subjectList.length;

}





if(active){

active.innerHTML = teachers.filter(

t=>t.status==="Active"

).length;

}





if(male){

male.innerHTML = teachers.filter(

t=>t.gender==="Male"

).length;

}



}



statistics();





// ======================================
// SEARCH TEACHER
// ======================================



let search = document.getElementById("search");



if(search){


search.addEventListener("keyup",function(){



let value = this.value.toLowerCase();



let rows = document.querySelectorAll("#teacherList tr");



rows.forEach(row=>{



if(row.innerText.toLowerCase().includes(value)){


row.style.display="";


}else{


row.style.display="none";


}



});



});


}






// ======================================
// PRINT
// ======================================


let printBtn = document.getElementById("printBtn");



if(printBtn){


printBtn.addEventListener("click",()=>{


window.print();



});


}





// ======================================
// PDF
// ======================================


let pdfBtn = document.getElementById("pdfBtn");



if(pdfBtn){


pdfBtn.addEventListener("click",()=>{


alert("PDF Export Coming Soon");


});


}






// ======================================
// EXCEL
// ======================================


let excelBtn = document.getElementById("excelBtn");



if(excelBtn){


excelBtn.addEventListener("click",()=>{


alert("Excel Export Coming Soon");


});


}







// ======================================
// CLOCK
// ======================================



function updateClock(){



let now = new Date();



let date = now.toLocaleDateString();



let time = now.toLocaleTimeString();




let clock = document.getElementById("clock");



if(clock){


clock.innerHTML = date + " | " + time;


}



}



setInterval(updateClock,1000);


updateClock();






// ======================================
// AUTO UPDATE
// ======================================



window.addEventListener("storage",()=>{


teachers = JSON.parse(localStorage.getItem("teachers")) || [];



displayTeachers();



statistics();



});