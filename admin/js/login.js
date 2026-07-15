// ======================================
// SOM ACADEMY LOGIN SYSTEM PRO
// ======================================


// GET USERS FROM LOCAL STORAGE

let users = JSON.parse(localStorage.getItem("users")) || [];



// ======================================
// DEFAULT USERS
// ======================================


if(users.length === 0){


users = [


{
id:1,
name:"Admin",
email:"admin@gmail.com",
password:"admin123",
role:"Admin",
photo:"images/default.png"
},


{
id:2,
name:"Teacher",
email:"teacher@gmail.com",
password:"teacher123",
role:"Teacher",
photo:"images/default.png"
},


{
id:3,
name:"Student",
email:"student@gmail.com",
password:"student123",
role:"Student",
photo:"images/default.png"
},


{
id:4,
name:"Parent",
email:"parent@gmail.com",
password:"parent123",
role:"Parent",
photo:"images/default.png"
}


];


localStorage.setItem(
"users",
JSON.stringify(users)
);


}




// ======================================
// SHOW / HIDE PASSWORD
// ======================================


let eye=document.getElementById("eye");

let password=document.getElementById("password");


if(eye){

eye.onclick=function(){


if(password.type==="password"){


password.type="text";


eye.classList.remove("fa-eye");

eye.classList.add("fa-eye-slash");


}

else{


password.type="password";


eye.classList.remove("fa-eye-slash");

eye.classList.add("fa-eye");


}


}


}





// ======================================
// LOGIN
// ======================================


document
.getElementById("loginForm")
.addEventListener("submit",function(e){


e.preventDefault();



let email =
document.getElementById("email")
.value.trim();



let pass =
document.getElementById("password")
.value.trim();



let role =
document.getElementById("role")
.value;




let user = users.find(u=>

u.email === email &&

u.password === pass &&

u.role === role

);





if(user){



// SAVE LOGIN USER


localStorage.setItem(
"loggedUser",
JSON.stringify(user)
);



// STUDENT


if(role==="Student"){


window.location.href="student/dashboard.html";


}




// TEACHER


else if(role==="Teacher"){


window.location.href="teacher/dashboard.html";


}





// PARENT


else if(role==="Parent"){


window.location.href="parent/dashboard.html";


}





// ADMIN


else if(role==="Admin"){


window.location.href="admin/dashboard.html";


}




}




else{


document.getElementById("message").innerHTML =
"❌ Email ama Password waa khalad";


}



});