// DISCORD WEBHOOK

const loginWebhook =
"https://discord.com/api/webhooks/YOUR_WEBHOOK_HERE";


// CURRENT USER

let currentUser =
localStorage.getItem("username");


// AUTO LOGIN

window.onload = function(){

if(currentUser){

showHome();

}

};


// LOGIN FUNCTION

function loginUser(){

let username =
document.getElementById("username")
.value.trim();

let password =
document.getElementById("password")
.value.trim();


// EMPTY CHECK
if(!username || !password){

alert("Fill all fields ❌");

return;

}


// SAVE USER
localStorage.setItem(
"username",
username
);

currentUser = username;


// DISCORD LOGIN MESSAGE
fetch(loginWebhook,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:

"👤 NEW LOGIN\n\n" +

"Username : " +
username

})

});


// OPEN HOME PAGE
showHome();

}


// SHOW HOME PAGE

function showHome(){

document.getElementById("loginPage")
.classList.add("hidden");

document.getElementById("homePage")
.classList.remove("hidden");


// SHOW NAME
document.getElementById("welcomeText")
.innerText =

"Hello, " +
currentUser;

}


// VIDEO BUTTON

function openVideo(){

window.open(
"https://youtube.com",
"_blank"
);

}
