// ======================================
// SOM ACADEMY STUDENT DASHBOARD
// PROFILE CONNECTION
// ======================================


// GET LOGIN USER

let student =
JSON.parse(localStorage.getItem("loggedUser"));




// CHECK LOGIN

if(!student){

    window.location.href="../index.html";

}



// ======================================
// LOAD PROFILE DATA
// ======================================


function loadProfile(){



// NAME

let studentName =
document.getElementById("studentName");


if(studentName){

studentName.innerHTML =
student.name || "Student";

}




// TOP NAME

let topName =
document.getElementById("topName");


if(topName){

topName.innerHTML =
student.name || "Student";

}




// PHOTO

let topPhoto =
document.getElementById("topPhoto");


if(topPhoto){


topPhoto.src =
student.photo || "../images/avatar.png";


}



}




loadProfile();






// ======================================
// CLOCK
// ======================================


function updateClock(){


let clock =
document.getElementById("clock");


if(clock){


let now=new Date();


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






// ======================================
// AUTO UPDATE PROFILE
// ======================================


window.addEventListener("storage",function(){


student =
JSON.parse(localStorage.getItem("loggedUser"));


loadProfile();


});






// ======================================
// LOGOUT
// ======================================


function logout(){


localStorage.removeItem("loggedUser");


window.location.href="../index.html";


}