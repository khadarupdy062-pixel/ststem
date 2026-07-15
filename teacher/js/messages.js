// ======================================
// SOM ACADEMY TEACHER MESSAGES SYSTEM
// ======================================



let messages =
JSON.parse(localStorage.getItem("messages")) || [];






// ======================================
// SEND MESSAGE
// ======================================


function sendMessage(){


let text =
document.getElementById("messageText").value;




if(text==""){


alert("Write a message first");


return;


}





let message = {


id:Date.now(),


text:text,


date:new Date().toLocaleDateString(),


time:new Date().toLocaleTimeString()


};





messages.push(message);





localStorage.setItem(

"messages",

JSON.stringify(messages)

);






alert("Message Sent Successfully");





document.getElementById("messageText").value="";



displayMessages();



}









// ======================================
// DISPLAY MESSAGES
// ======================================


function displayMessages(){



let table =
document.getElementById("messageTable");



if(!table)return;



table.innerHTML="";





messages.forEach((msg,index)=>{


table.innerHTML += `


<tr>



<td>

${msg.date}

<br>

${msg.time}

</td>





<td>

${msg.text}

</td>






<td>


<button 
class="delete"
onclick="deleteMessage(${index})">

Delete

</button>


</td>



</tr>


`;



});



}




displayMessages();








// ======================================
// DELETE MESSAGE
// ======================================


function deleteMessage(index){



if(confirm("Delete this message?")){


messages.splice(index,1);



localStorage.setItem(

"messages",

JSON.stringify(messages)

);



displayMessages();



}


}








// ======================================
// CLOCK
// ======================================


function clock(){



let c =
document.getElementById("clock");



if(c){


c.innerHTML =
new Date().toLocaleDateString()
+
" | "
+
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