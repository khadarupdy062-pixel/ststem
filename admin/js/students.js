// =====================================
// SOM ACADEMY STUDENT MANAGEMENT SYSTEM
// =====================================

let students = JSON.parse(localStorage.getItem("students")) || [];

let editIndex = -1;

// Generate Student ID
function generateStudentID(){

    return "ST" + String(Date.now()).slice(-6);

}

// Save Student

document.getElementById("studentForm").addEventListener("submit",function(e){

    e.preventDefault();

    let fullname = document.getElementById("fullname").value.trim();
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let studentClass = document.getElementById("studentClass").value.trim();
    let parent = document.getElementById("parent").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();

    let photoInput = document.getElementById("photo");

    if(
        fullname===""||
        age===""||
        gender===""||
        studentClass===""||
        parent===""||
        phone===""||
        email===""){

        alert("Please Fill All Fields");

        return;

    }

    let reader = new FileReader();

    reader.onload = function(){

        let student = {

            studentId:generateStudentID(),

            fullname,

            age,

            gender,

            studentClass,

            parent,

            phone,

            email,

            photo:reader.result,

            status:"Active"

        };

        students.push(student);

        localStorage.setItem("students",JSON.stringify(students));

        displayStudents();

        document.getElementById("studentForm").reset();

        alert("Student Added Successfully");

    }

    if(photoInput.files.length>0){

        reader.readAsDataURL(photoInput.files[0]);

    }else{

        reader.onload();

    }

});

displayStudents();// =====================================
// DISPLAY STUDENTS
// =====================================

function displayStudents(){

    let table = document.getElementById("studentTable");

    if(!table) return;

    table.innerHTML = "";

    students.forEach((student,index)=>{

        table.innerHTML += `

        <tr>

        <td>

        <img src="${student.photo || '../images/avatar.png'}"
        class="student-photo">

        </td>

        <td>${student.studentId}</td>

        <td>${student.fullname}</td>

        <td>${student.age}</td>

        <td>${student.gender}</td>

        <td>${student.studentClass}</td>

        <td>${student.parent}</td>

        <td>${student.phone}</td>

        <td>${student.email}</td>

        <td>

        <span class="status-active">

        ${student.status}

        </span>

        </td>

        <td>

        <button
        class="edit-btn"
        onclick="editStudent(${index})">

        <i class="fa fa-edit"></i>

        </button>

        <button
        class="delete-btn"
        onclick="deleteStudent(${index})">

        <i class="fa fa-trash"></i>

        </button>

        </td>

        </tr>

        `;

    });

}

// =====================================
// DELETE STUDENT
// =====================================

function deleteStudent(index){

    if(confirm("Delete this student?")){

        students.splice(index,1);

        localStorage.setItem("students",JSON.stringify(students));

        displayStudents();

    }

}

// =====================================
// SEARCH STUDENT
// =====================================

document.getElementById("search").addEventListener("keyup",function(){

    let value=this.value.toLowerCase();

    let rows=document.querySelectorAll("#studentTable tr");

    rows.forEach(row=>{

        if(row.innerText.toLowerCase().includes(value)){

            row.style.display="";

        }

        else{

            row.style.display="none";

        }

    });

});

// =====================================
// PRINT TABLE
// =====================================

document.getElementById("printBtn").addEventListener("click",()=>{

    window.print();

});

// =====================================
// UPDATE DASHBOARD TOTAL
// =====================================

function updateDashboard(){

    localStorage.setItem("students",JSON.stringify(students));

}

updateDashboard();// =====================================
// EDIT STUDENT
// =====================================

let currentEdit = -1;

function editStudent(index){

    currentEdit = index;

    let student = students[index];

    document.getElementById("editName").value = student.fullname;
    document.getElementById("editAge").value = student.age;
    document.getElementById("editGender").value = student.gender;
    document.getElementById("editClass").value = student.studentClass;
    document.getElementById("editParent").value = student.parent;
    document.getElementById("editPhone").value = student.phone;
    document.getElementById("editEmail").value = student.email;

    document.getElementById("editModal").style.display = "flex";

}

// =====================================
// CLOSE MODAL
// =====================================

document.querySelector(".close").onclick = function(){

    document.getElementById("editModal").style.display = "none";

}

window.onclick = function(e){

    let modal = document.getElementById("editModal");

    if(e.target == modal){

        modal.style.display = "none";

    }

}

// =====================================
// UPDATE STUDENT
// =====================================

document.getElementById("editForm").addEventListener("submit",function(e){

    e.preventDefault();

    students[currentEdit].fullname =
    document.getElementById("editName").value;

    students[currentEdit].age =
    document.getElementById("editAge").value;

    students[currentEdit].gender =
    document.getElementById("editGender").value;

    students[currentEdit].studentClass =
    document.getElementById("editClass").value;

    students[currentEdit].parent =
    document.getElementById("editParent").value;

    students[currentEdit].phone =
    document.getElementById("editPhone").value;

    students[currentEdit].email =
    document.getElementById("editEmail").value;

    localStorage.setItem("students",JSON.stringify(students));

    document.getElementById("editModal").style.display = "none";

    displayStudents();

    alert("Student Updated Successfully");

});

// =====================================
// AUTO CLOCK
// =====================================

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

// =====================================
// LOAD DATA
// =====================================

displayStudents();