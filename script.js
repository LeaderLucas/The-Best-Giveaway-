// CURRENT USER

let currentUser =
JSON.parse(
localStorage.getItem("currentUser")
) || null;


// DISCORD WEBHOOK

const loginWebhook =
"https://discord.com/api/webhooks/YOUR_WEBHOOK_HERE";


// AUTO LOGIN

window.onload = function(){

if(currentUser){

showHome();

}

};


// LOGIN

function loginUser(){

let username =
document.getElementById("username")
.value.trim();

let password =
document.getElementById("password")
.value.trim();


// EMPTY CHECK
if(!username || !password){

alert(
"Fill all fields ❌"
);

return;

}


// SAVE USER
currentUser = {

name: username,

password: password

};


// LOCAL STORAGE
localStorage.setItem(

"currentUser",

JSON.stringify(currentUser)

);


// DISCORD WEBHOOK
fetch(loginWebhook,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:

"👤 NEW LOGIN\n\n" +

"Username : " +
currentUser.name

})

});


// SHOW HOME
showHome();

}


// SHOW HOME

function showHome(){

document.getElementById("loginPage")
.classList.add("hidden");

document.getElementById("homePage")
.classList.remove("hidden");


// TEXT
document.getElementById("welcomeText")
.innerText =

"Hello, " +
currentUser.name;

}


// VIDEO BUTTON

function openVideo(){

window.open(

"https://youtube.com",

"_blank"

);

}
