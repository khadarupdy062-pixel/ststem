// ======================================
// SOM ACADEMY TEACHER PROFILE
// ======================================


// GET TEACHER DATA

let teacher =
JSON.parse(localStorage.getItem("loggedUser")) || null;



if(!teacher){

window.location.href="../index.html";

}



// ======================================
// LOAD PROFILE
// ======================================


function loadProfile(){



document.getElementById("teacherName").innerHTML =
teacher.name || "Teacher";



document.getElementById("name").value =
teacher.name || "";



document.getElementById("email").value =
teacher.email || "";





let photo =
document.getElementById("teacherPhoto");



if(photo){

photo.src =
teacher.photo || "../images/avatar.png";

}



}




loadProfile();






// ======================================
// CHANGE PHOTO
// ======================================


document
.getElementById("photoInput")
.addEventListener("change",function(e){



let file =
e.target.files[0];



if(file){


let reader =
new FileReader();



reader.onload=function(){



teacher.photo =
reader.result;



document.getElementById("teacherPhoto").src =
reader.result;



}



reader.readAsDataURL(file);



}



});







// ======================================
// SAVE PROFILE
// ======================================


function saveProfile(){



let name =
document.getElementById("name").value.trim();



if(name==""){


alert("Enter Teacher Name");

return;


}




teacher.name = name;



localStorage.setItem(

"loggedUser",

JSON.stringify(teacher)

);




alert("Profile Updated Successfully");




// BACK TO DASHBOARD


window.location.href="dashboard.html";



}








// ======================================
// CLOCK
// ======================================


function clock(){



let c =
document.getElementById("clock");



if(c){


c.innerHTML =
new Date().toLocaleTimeString();


}



}



setInterval(clock,1000);

clock();






// ======================================
// LOGOUT
// ======================================


function logout(){


localStorage.removeItem("loggedUser");


window.location.href="../index.html";


}