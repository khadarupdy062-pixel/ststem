// =========================================
// SOM ACADEMY TEACHER MANAGEMENT
// =========================================

let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

let editIndex = -1;

// =============================
// Generate Teacher ID
// =============================

function generateTeacherID(){

    return "TR" + String(Date.now()).slice(-6);

}

// =============================
// Add Teacher
// =============================

document.getElementById("teacherForm").addEventListener("submit",function(e){

    e.preventDefault();

    let name = document.getElementById("teacherName").value.trim();

    let email = document.getElementById("teacherEmail").value.trim();

    let phone = document.getElementById("teacherPhone").value.trim();

    let subject = document.getElementById("teacherSubject").value.trim();

    let qualification = document.getElementById("teacherQualification").value.trim();

    let gender = document.getElementById("teacherGender").value;

    let joinDate = document.getElementById("teacherJoin").value;

    let photo = document.getElementById("teacherPhoto");

    if(
        name==""||
        email==""||
        phone==""||
        subject==""||
        qualification==""||
        gender==""||
        joinDate==""
    ){

        alert("Please Fill All Fields");

        return;

    }

    let reader = new FileReader();

    reader.onload=function(){

        let teacher={

            teacherId:generateTeacherID(),

            name,

            email,

            phone,

            subject,

            qualification,

            gender,

            joinDate,

            photo:reader.result,

            status:"Active"

        };

        teachers.push(teacher);

        localStorage.setItem("teachers",JSON.stringify(teachers));

        displayTeachers();

        statistics();

        document.getElementById("teacherForm").reset();

        alert("Teacher Added Successfully");

    }

    if(photo.files.length>0){

        reader.readAsDataURL(photo.files[0]);

    }else{

        reader.onload();

    }

});

displayTeachers();
statistics();// =========================================
// DISPLAY TEACHERS
// =========================================

function displayTeachers(){

    let table = document.getElementById("teacherTable");

    if(!table) return;

    table.innerHTML = "";

    teachers.forEach((teacher,index)=>{

        table.innerHTML += `

        <tr>

        <td>

        <img
        src="${teacher.photo || '../images/avatar.png'}"
        class="teacher-photo">

        </td>

        <td>${teacher.teacherId}</td>

        <td>${teacher.name}</td>

        <td>${teacher.email}</td>

        <td>${teacher.phone}</td>

        <td>${teacher.subject}</td>

        <td>${teacher.qualification}</td>

        <td>${teacher.gender}</td>

        <td>${teacher.joinDate}</td>

        <td>

        <span class="status-active">

        ${teacher.status}

        </span>

        </td>

        <td>

        <button
        class="edit-btn"
        onclick="editTeacher(${index})">

        <i class="fa fa-edit"></i>

        </button>

        <button
        class="delete-btn"
        onclick="deleteTeacher(${index})">

        <i class="fa fa-trash"></i>

        </button>

        </td>

        </tr>

        `;

    });

}

// =========================================
// DELETE TEACHER
// =========================================

function deleteTeacher(index){

    if(confirm("Delete this teacher?")){

        teachers.splice(index,1);

        localStorage.setItem("teachers",JSON.stringify(teachers));

        displayTeachers();

        statistics();

    }

}

// =========================================
// SEARCH TEACHER
// =========================================

document.getElementById("searchTeacher").addEventListener("keyup",function(){

    let value = this.value.toLowerCase();

    let rows = document.querySelectorAll("#teacherTable tr");

    rows.forEach(row=>{

        if(row.innerText.toLowerCase().includes(value)){

            row.style.display="";

        }else{

            row.style.display="none";

        }

    });

});

// =========================================
// STATISTICS
// =========================================

function statistics(){

    document.getElementById("totalTeachers").innerHTML = teachers.length;

    document.getElementById("activeTeachers").innerHTML = teachers.filter(t=>t.status==="Active").length;

    let subjects = [...new Set(teachers.map(t=>t.subject))];

    document.getElementById("totalSubjects").innerHTML = subjects.length;

}

// =========================================
// PRINT
// =========================================

document.getElementById("printBtn").addEventListener("click",()=>{

    window.print();

});// =========================================
// EDIT TEACHER
// =========================================

let currentTeacher = -1;

function editTeacher(index){

    currentTeacher = index;

    let teacher = teachers[index];

    document.getElementById("editTeacherName").value = teacher.name;
    document.getElementById("editTeacherEmail").value = teacher.email;
    document.getElementById("editTeacherPhone").value = teacher.phone;
    document.getElementById("editTeacherSubject").value = teacher.subject;
    document.getElementById("editTeacherQualification").value = teacher.qualification;
    document.getElementById("editTeacherGender").value = teacher.gender;
    document.getElementById("editTeacherJoin").value = teacher.joinDate;

    document.getElementById("editModal").style.display = "flex";

}

// =========================================
// CLOSE MODAL
// =========================================

document.querySelector(".close").onclick = function(){

    document.getElementById("editModal").style.display = "none";

}

window.onclick = function(e){

    let modal = document.getElementById("editModal");

    if(e.target == modal){

        modal.style.display = "none";

    }

}

// =========================================
// UPDATE TEACHER
// =========================================

document.getElementById("editTeacherForm").addEventListener("submit",function(e){

    e.preventDefault();

    teachers[currentTeacher].name =
    document.getElementById("editTeacherName").value;

    teachers[currentTeacher].email =
    document.getElementById("editTeacherEmail").value;

    teachers[currentTeacher].phone =
    document.getElementById("editTeacherPhone").value;

    teachers[currentTeacher].subject =
    document.getElementById("editTeacherSubject").value;

    teachers[currentTeacher].qualification =
    document.getElementById("editTeacherQualification").value;

    teachers[currentTeacher].gender =
    document.getElementById("editTeacherGender").value;

    teachers[currentTeacher].joinDate =
    document.getElementById("editTeacherJoin").value;

    localStorage.setItem("teachers",JSON.stringify(teachers));

    document.getElementById("editModal").style.display = "none";

    displayTeachers();

    statistics();

    alert("Teacher Updated Successfully");

});

// =========================================
// LIVE CLOCK
// =========================================

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

// =========================================
// AUTO REFRESH
// =========================================

window.addEventListener("storage",()=>{

    teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    displayTeachers();

    statistics();

});

// =========================================
// INITIAL LOAD
// =========================================

displayTeachers();

statistics();