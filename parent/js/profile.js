// ======================================
// SOM ACADEMY PARENT PROFILE
// ======================================


// Logged User

let parent =
JSON.parse(localStorage.getItem("loggedUser")) || {};




// ===============================
// LOAD PROFILE
// ===============================

function loadProfile(){

document.getElementById("parentName").value =
parent.name || "";

document.getElementById("parentPhoto").src =
parent.photo || "../images/avatar.png";

}

loadProfile();





// ===============================
// CHANGE PHOTO
// ===============================

document.getElementById("photoInput")
.addEventListener("change",function(){

let file = this.files[0];

if(!file) return;

let reader = new FileReader();

reader.onload = function(e){

document.getElementById("parentPhoto").src =
e.target.result;

};

reader.readAsDataURL(file);

});






// ===============================
// SAVE PROFILE
// ===============================

function saveProfile(){

parent.name =
document.getElementById("parentName").value.trim();

parent.photo =
document.getElementById("parentPhoto").src;


// Update Logged User

localStorage.setItem(

"loggedUser",

JSON.stringify(parent)

);




// Update Users Array

let users =
JSON.parse(localStorage.getItem("users")) || [];

let index =
users.findIndex(u=>u.id===parent.id);

if(index !== -1){

users[index]=parent;

localStorage.setItem(

"users",

JSON.stringify(users)

);

}


alert("Profile Updated Successfully.");

window.location.href="dashboard.html";

}






// ===============================
// LOGOUT
// ===============================

function logout(){

localStorage.removeItem("loggedUser");

window.location.href="../index.html";

}





// ===============================
// LIVE CLOCK
// ===============================

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