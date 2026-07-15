// ======================================
// SOM ACADEMY TEACHER SCHEDULE SYSTEM
// ======================================



let schedules =
JSON.parse(localStorage.getItem("schedule")) || [];




// ======================================
// SAVE SCHEDULE
// ======================================


function saveSchedule(){


let day =
document.getElementById("day").value;


let subject =
document.getElementById("subject").value;


let className =
document.getElementById("className").value;


let time =
document.getElementById("time").value;




if(
day=="" ||
subject=="" ||
className=="" ||
time==""
){


alert("Please fill all fields");


return;


}





let schedule = {


id:Date.now(),


day:day,


subject:subject,


className:className,


time:time


};





schedules.push(schedule);




localStorage.setItem(

"schedule",

JSON.stringify(schedules)

);





alert("Schedule Added Successfully");




displaySchedule();





document.getElementById("day").value="";

document.getElementById("subject").value="";

document.getElementById("className").value="";

document.getElementById("time").value="";



}







// ======================================
// DISPLAY SCHEDULE
// ======================================


function displaySchedule(){



let table =
document.getElementById("scheduleTable");



if(!table)return;



table.innerHTML="";





schedules.forEach((item,index)=>{


table.innerHTML += `


<tr>


<td>

${item.day}

</td>



<td>

${item.subject}

</td>



<td>

${item.className}

</td>



<td>

${item.time}

</td>



<td>


<button 
class="delete"
onclick="deleteSchedule(${index})">

Delete

</button>


</td>



</tr>


`;



});



}





displaySchedule();









// ======================================
// DELETE
// ======================================


function deleteSchedule(index){



if(confirm("Delete this schedule?")){


schedules.splice(index,1);



localStorage.setItem(

"schedule",

JSON.stringify(schedules)

);



displaySchedule();


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