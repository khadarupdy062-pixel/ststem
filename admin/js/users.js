// ======================================
// SOM ACADEMY USER MANAGEMENT SYSTEM
// ======================================



// GET USERS

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
role:"Admin"
},


{
id:2,
name:"Teacher",
email:"teacher@gmail.com",
password:"teacher123",
role:"Teacher"
},


{
id:3,
name:"Student",
email:"student@gmail.com",
password:"student123",
role:"Student"
},


{
id:4,
name:"Parent",
email:"parent@gmail.com",
password:"parent123",
role:"Parent"
}



];


saveUsers();


}





// ======================================
// SAVE USERS
// ======================================


function saveUsers(){

localStorage.setItem(
"users",
JSON.stringify(users)
);

}







// ======================================
// ADD USER
// ======================================


function addUser(){


let name =
document.getElementById("name").value;


let email =
document.getElementById("email").value;


let password =
document.getElementById("password").value;


let role =
document.getElementById("role").value;




if(name=="" || email=="" || password=="" || role==""){

alert("Fill All Fields");

return;

}




let user={


id:Date.now(),


name:name,


email:email,


password:password,


role:role



};




users.push(user);


saveUsers();


displayUsers();



alert("Profile Created Successfully");





}









// ======================================
// DISPLAY USERS
// ======================================


function displayUsers(data=users){


let table =
document.getElementById("userTable");


if(!table) return;



table.innerHTML="";



data.forEach(user=>{


table.innerHTML += `


<tr>


<td>${user.name}</td>


<td>${user.email}</td>


<td>${user.password}</td>


<td>${user.role}</td>


<td>


<button 
class="edit-btn"
onclick="editUser(${user.id})">

<i class="fa fa-pen"></i>

</button>



<button 
class="delete-btn"
onclick="deleteUser(${user.id})">


<i class="fa fa-trash"></i>


</button>



<button
class="profile-btn"
onclick="openProfile(${user.id})">


<i class="fa fa-user"></i>


</button>



</td>


</tr>


`;



});



}





displayUsers();









// ======================================
// EDIT USER
// ======================================


function editUser(id){


let user =
users.find(u=>u.id===id);



let newName =
prompt(
"Name",
user.name
);



let newEmail =
prompt(
"Email",
user.email
);



let newPassword =
prompt(
"Password",
user.password
);




if(newName && newEmail && newPassword){


user.name=newName;

user.email=newEmail;

user.password=newPassword;



saveUsers();


displayUsers();


alert("Updated Successfully");


}



}









// ======================================
// DELETE USER
// ======================================


function deleteUser(id){


if(confirm("Delete Profile?")){


users =
users.filter(
u=>u.id!==id
);



saveUsers();


displayUsers();



}



}









// ======================================
// OPEN PROFILE
// ======================================


function openProfile(id){


let user =
users.find(
u=>u.id===id
);



localStorage.setItem(
"editProfile",
JSON.stringify(user)
);



window.location.href="../profile.html";



}









// ======================================
// SEARCH
// ======================================


document
.getElementById("search")
?.addEventListener(
"keyup",
function(){


let value =
this.value.toLowerCase();



let result =
users.filter(user=>


user.name.toLowerCase().includes(value) ||


user.email.toLowerCase().includes(value) ||


user.role.toLowerCase().includes(value)



);



displayUsers(result);



});








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


localStorage.removeItem("currentUser");


window.location.href="../index.html";


}