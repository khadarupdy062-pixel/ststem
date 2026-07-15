// =====================================
// SOM ACADEMY SETTINGS SYSTEM
// =====================================


// ================= CLOCK =================

function updateClock(){

    let now = new Date();

    let clock = document.getElementById("clock");

    if(clock){

        clock.innerHTML =
        now.toLocaleDateString() +
        " | " +
        now.toLocaleTimeString();

    }

}

setInterval(updateClock,1000);

updateClock();



// ================= LOAD SETTINGS =================

function loadSettings(){

    let settings =
    JSON.parse(localStorage.getItem("schoolSettings")) || {};

    document.getElementById("schoolName").value =
    settings.schoolName || "";

    document.getElementById("schoolAddress").value =
    settings.schoolAddress || "";

    document.getElementById("schoolPhone").value =
    settings.schoolPhone || "";

    document.getElementById("schoolEmail").value =
    settings.schoolEmail || "";

    document.getElementById("adminUsername").value =
    settings.adminUsername || "admin";

}

loadSettings();




// ================= SAVE SCHOOL INFO =================

function saveSchoolInfo(){

    let reader = new FileReader();

    let logo =
    document.getElementById("schoolLogo");

    let settings = {

        schoolName:
        document.getElementById("schoolName").value,

        schoolAddress:
        document.getElementById("schoolAddress").value,

        schoolPhone:
        document.getElementById("schoolPhone").value,

        schoolEmail:
        document.getElementById("schoolEmail").value,

        adminUsername:
        document.getElementById("adminUsername").value,

        logo:""

    };



    reader.onload = function(){

        settings.logo = reader.result;

        localStorage.setItem(
            "schoolSettings",
            JSON.stringify(settings)
        );

        alert("School Information Saved Successfully");

    };


    if(logo.files.length > 0){

        reader.readAsDataURL(logo.files[0]);

    }else{

        let old =
        JSON.parse(localStorage.getItem("schoolSettings")) || {};

        settings.logo = old.logo || "";

        localStorage.setItem(
            "schoolSettings",
            JSON.stringify(settings)
        );

        alert("School Information Saved Successfully");

    }

}




// ================= CHANGE PASSWORD =================

function changePassword(){

    let oldPass =
    document.getElementById("oldPassword").value;

    let newPass =
    document.getElementById("newPassword").value;

    let confirmPass =
    document.getElementById("confirmPassword").value;

    let admin =
    JSON.parse(localStorage.getItem("adminAccount")) || {

        username:"admin",
        password:"admin123"

    };


    if(oldPass !== admin.password){

        alert("Current Password is Incorrect");

        return;

    }


    if(newPass !== confirmPass){

        alert("Passwords do not match");

        return;

    }


    admin.username =
    document.getElementById("adminUsername").value;

    admin.password = newPass;

    localStorage.setItem(
        "adminAccount",
        JSON.stringify(admin)
    );

    alert("Password Changed Successfully");

}




// ================= BACKUP DATA =================

function backupData(){

    let backup = {

        students:
        JSON.parse(localStorage.getItem("students")) || [],

        teachers:
        JSON.parse(localStorage.getItem("teachers")) || [],

        attendance:
        JSON.parse(localStorage.getItem("attendance")) || [],

        exams:
        JSON.parse(localStorage.getItem("results")) || [],

        fees:
        JSON.parse(localStorage.getItem("fees")) || [],

        settings:
        JSON.parse(localStorage.getItem("schoolSettings")) || {}

    };



    let blob =
    new Blob(
        [JSON.stringify(backup,null,2)],
        {type:"application/json"}
    );



    let a =
    document.createElement("a");

    a.href =
    URL.createObjectURL(blob);

    a.download =
    "SOM_ACADEMY_Backup.json";

    a.click();

    alert("Backup Downloaded");

}




// ================= RESTORE DATA =================

function restoreData(){

    document
    .getElementById("restoreFile")
    .click();

}



document
.getElementById("restoreFile")
.addEventListener("change",function(e){

    let file = e.target.files[0];

    if(!file) return;

    let reader = new FileReader();

    reader.onload = function(){

        let data =
        JSON.parse(reader.result);

        if(data.students)
        localStorage.setItem("students",
        JSON.stringify(data.students));

        if(data.teachers)
        localStorage.setItem("teachers",
        JSON.stringify(data.teachers));

        if(data.attendance)
        localStorage.setItem("attendance",
        JSON.stringify(data.attendance));

        if(data.exams)
        localStorage.setItem("results",
        JSON.stringify(data.exams));

        if(data.fees)
        localStorage.setItem("fees",
        JSON.stringify(data.fees));

        if(data.settings)
        localStorage.setItem("schoolSettings",
        JSON.stringify(data.settings));

        alert("Data Restored Successfully");

        location.reload();

    };

    reader.readAsText(file);

});




// ================= CLEAR DATA =================

function clearSystem(){

    if(confirm("Delete ALL System Data?")){

        localStorage.clear();

        alert("System Data Deleted");

        location.reload();

    }

}