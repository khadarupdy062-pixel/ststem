// =====================================
// SOM ACADEMY CLASSES MANAGEMENT SYSTEM
// =====================================

let classes =
JSON.parse(localStorage.getItem("classes")) || [];

let teachers =
JSON.parse(localStorage.getItem("teachers")) || [];

let editIndex = -1;


function loadTeachers(){

    let select = document.getElementById("teacherSelect");

    if(!select) return;

    select.innerHTML = `
        <option value="">Select Class Teacher</option>
    `;

    teachers.forEach((teacher)=>{

        let teacherName =
            teacher.fullname ||
            teacher.fullName ||
            teacher.teacherName ||
            teacher.name ||
            teacher.username ||
            "Unknown Teacher";

        select.innerHTML += `
            <option value="${teacherName}">
                ${teacherName}
            </option>
        `;

    });

}



// =====================================
// ADD CLASS
// =====================================

function addClass(){

    let className =
    document.getElementById("className").value.trim();

    let section =
    document.getElementById("section").value.trim();

    let teacher =
    document.getElementById("teacherSelect").value;

    let capacity =
    document.getElementById("capacity").value;

    let room =
    document.getElementById("roomNumber").value;

    let year =
    document.getElementById("academicYear").value.trim();



    if(

        className==="" ||

        section==="" ||

        teacher==="" ||

        capacity==="" ||

        room==="" ||

        year===""

    ){

        alert("Please Fill All Fields");

        return;

    }



    let totalStudents =

    JSON.parse(localStorage.getItem("students")) || [];


    let currentStudents =

    totalStudents.filter(student=>

        student.studentClass===className

    ).length;



    let classData={

        id:Date.now(),

        className,

        section,

        teacher,

        capacity,

        room,

        year,

        students:currentStudents

    };



    classes.push(classData);



    localStorage.setItem(

        "classes",

        JSON.stringify(classes)

    );



    displayClasses();



    updateStatistics();



    clearForm();



    alert("Class Added Successfully");

}



// =====================================
// DISPLAY CLASSES
// =====================================

function displayClasses(data = classes){

    let table =
    document.getElementById("classTable");

    if(!table) return;

    table.innerHTML="";



    data.forEach((item)=>{

        table.innerHTML += `

        <tr>

        <td>

        ${item.className}

        </td>



        <td>

        ${item.section}

        </td>



        <td>

        ${item.teacher}

        </td>



        <td>

        ${item.capacity}

        </td>



        <td>

        ${item.room}

        </td>



        <td>

        ${item.year}

        </td>



        <td>

        ${item.students}

        </td>



        <td>

        <div class="actions">

        <button

        class="edit-btn"

        onclick="editClass(${item.id})">

        <i class="fa-solid fa-pen"></i>

        </button>



        <button

        class="delete-btn"

        onclick="deleteClass(${item.id})">

        <i class="fa-solid fa-trash"></i>

        </button>

        </div>

        </td>



        </tr>

        `;

    });

}



// =====================================
// CLEAR FORM
// =====================================

function clearForm(){

    document.getElementById("className").value="";

    document.getElementById("section").value="";

    document.getElementById("teacherSelect").value="";

    document.getElementById("capacity").value="";

    document.getElementById("roomNumber").value="";

    document.getElementById("academicYear").value="";

}



// =====================================
// LOAD PAGE
// =====================================

displayClasses();
updateStatistics();
// =====================================
// SEARCH CLASS
// =====================================

let search =
document.getElementById("searchClass");

if(search){

search.addEventListener("keyup",function(){

    let value =
    this.value.toLowerCase();

    let filtered = classes.filter(item=>

        item.className.toLowerCase().includes(value) ||

        item.section.toLowerCase().includes(value) ||

        item.teacher.toLowerCase().includes(value) ||

        item.year.toLowerCase().includes(value)

    );

    displayClasses(filtered);

});

}



// =====================================
// DELETE CLASS
// =====================================

function deleteClass(id){

    if(confirm("Delete this class?")){

        classes = classes.filter(item=>item.id!==id);

        localStorage.setItem(

        "classes",

        JSON.stringify(classes)

        );

        displayClasses();

        updateStatistics();

    }

}



// =====================================
// EDIT CLASS
// =====================================

function editClass(id){

    let item =
    classes.find(c=>c.id===id);

    if(!item) return;

    editIndex = id;

    document.getElementById("className").value =
    item.className;

    document.getElementById("section").value =
    item.section;

    document.getElementById("teacherSelect").value =
    item.teacher;

    document.getElementById("capacity").value =
    item.capacity;

    document.getElementById("roomNumber").value =
    item.room;

    document.getElementById("academicYear").value =
    item.year;

    let btn =
    document.querySelector(".grid button");

    btn.innerHTML =

    '<i class="fa-solid fa-pen"></i> Update Class';

    btn.setAttribute(

    "onclick",

    "updateClass()"

    );

}



// =====================================
// UPDATE CLASS
// =====================================

function updateClass(){

    let index =
    classes.findIndex(c=>c.id===editIndex);

    if(index==-1) return;

    classes[index].className =
    document.getElementById("className").value.trim();

    classes[index].section =
    document.getElementById("section").value.trim();

    classes[index].teacher =
    document.getElementById("teacherSelect").value;

    classes[index].capacity =
    document.getElementById("capacity").value;

    classes[index].room =
    document.getElementById("roomNumber").value;

    classes[index].year =
    document.getElementById("academicYear").value.trim();



    let students =
    JSON.parse(localStorage.getItem("students")) || [];

    classes[index].students =

    students.filter(student=>

    student.studentClass===classes[index].className

    ).length;



    localStorage.setItem(

    "classes",

    JSON.stringify(classes)

    );



    displayClasses();

    updateStatistics();

    clearForm();



    let btn =
    document.querySelector(".grid button");

    btn.innerHTML =

    '<i class="fa-solid fa-floppy-disk"></i> Save Class';

    btn.setAttribute(

    "onclick",

    "addClass()"

    );



    editIndex=-1;

    alert("Class Updated Successfully");

}



// =====================================
// UPDATE STATISTICS
// =====================================

function updateStatistics(){

    let totalClasses =
    document.getElementById("totalClasses");

    let totalCapacity =
    document.getElementById("totalCapacity");

    let totalRooms =
    document.getElementById("totalRooms");

    let teacherCount =
    document.getElementById("teacherCount");



    let capacity = 0;

    classes.forEach(item=>{

        capacity += Number(item.capacity);

    });



    if(totalClasses){

        totalClasses.innerHTML =
        classes.length;

    }

    if(totalCapacity){

        totalCapacity.innerHTML =
        capacity;

    }

    if(totalRooms){

        totalRooms.innerHTML =
        classes.length;

    }

    if(teacherCount){

        teacherCount.innerHTML =
        teachers.length;

    }

}// =====================================
// PRINT CLASS LIST
// =====================================

let printBtn =
document.getElementById("printBtn");

if(printBtn){

    printBtn.addEventListener("click",function(){

        window.print();

    });

}



// =====================================
// LIVE CLOCK
// =====================================

function updateClock(){

    let now = new Date();

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
// UPDATE DASHBOARD
// =====================================

function updateDashboardClasses(){

    localStorage.setItem(

        "classes",

        JSON.stringify(classes)

    );

}

updateDashboardClasses();




// =====================================
// REFRESH STUDENT COUNT
// =====================================

function refreshStudentCount(){

    let students =

    JSON.parse(localStorage.getItem("students")) || [];



    classes.forEach(item=>{

        item.students =

        students.filter(student=>

            student.studentClass === item.className

        ).length;

    });



    localStorage.setItem(

        "classes",

        JSON.stringify(classes)

    );

}

refreshStudentCount();




// =====================================
// AUTO LOAD SYSTEM
// =====================================

loadTeachers();

refreshStudentCount();

displayClasses();

updateStatistics();

updateDashboardClasses();




// =====================================
// AUTO UPDATE EVERY 5 SECONDS
// =====================================

setInterval(function(){

    refreshStudentCount();

    displayClasses();

    updateStatistics();

},5000);