// ======================================
// SOM ACADEMY PARENT MESSAGES
// ======================================


// GET MESSAGES

let messages =

JSON.parse(localStorage.getItem("messages")) || [];




// ======================================
// LOAD MESSAGES
// ======================================


function loadMessages(){


let box =

document.getElementById("messageList");



if(!box) return;



box.innerHTML="";





if(messages.length === 0){


box.innerHTML=`

<div class="empty">

<i class="fa fa-envelope-open"></i>

<h3>No Messages</h3>

<p>You don't have any messages yet</p>

</div>

`;

return;


}






messages.forEach(message=>{



box.innerHTML += `


<div class="message-card">



<h3>

<i class="fa fa-user"></i>

${message.sender || "School"}

</h3>




<h4>

${message.title || "Announcement"}

</h4>




<p>

${message.message || ""}

</p>




<span>

<i class="fa fa-calendar"></i>

${message.date || ""}

</span>




</div>



`;



});



}





loadMessages();







// ======================================
// AUTO UPDATE
// ======================================


window.addEventListener("storage",()=>{


messages =

JSON.parse(localStorage.getItem("messages")) || [];



loadMessages();


});







// ======================================
// CLOCK
// ======================================


function updateClock(){



let clock =

document.getElementById("clock");



if(clock){


let now = new Date();



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
// LOGOUT
// ======================================


function logout(){


localStorage.removeItem("loggedUser");


window.location.href="../index.html";


}