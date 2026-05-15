// ===============================
// DISCORD WEBHOOKS
// ===============================

const loginWebhook =
"https://discord.com/api/webhooks/YOUR_LOGIN_WEBHOOK";

const subscribeWebhook =
"https://discord.com/api/webhooks/YOUR_SUBSCRIBE_WEBHOOK";

const withdrawWebhook =
"https://discord.com/api/webhooks/YOUR_WITHDRAW_WEBHOOK";


// ===============================
// CURRENT USER
// ===============================

let currentUser =
localStorage.getItem("username");


// ===============================
// AUTO LOGIN
// ===============================

window.onload = function(){

if(currentUser){

showHome();

}

};


// ===============================
// LOGIN FUNCTION
// ===============================

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


// ===============================
// SHOW HOME PAGE
// ===============================

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


// ===============================
// VIDEO BUTTON
// ===============================

function openVideo(){

window.open(

"https://youtube.com",

"_blank"

);

}


// ===============================
// OPEN SUBSCRIBE PAGE
// ===============================

function openSubscribe(){

document.getElementById("homePage")
.classList.add("hidden");

document.getElementById("subscribePage")
.classList.remove("hidden");

}


// ===============================
// BACK HOME
// ===============================

function backHome(){

document.getElementById("subscribePage")
.classList.add("hidden");

document.getElementById("withdrawPage")
.classList.add("hidden");

document.getElementById("homePage")
.classList.remove("hidden");

}


// ===============================
// SUBSCRIBE SUBMIT
// ===============================

function submitSubscribe(){

let gameId =
document.getElementById("gameId")
.value.trim();

let proof =
document.getElementById("proofLink")
.value.trim();


// EMPTY CHECK
if(!gameId || !proof){

alert(
"Fill all fields ❌"
);

return;

}


// DISCORD WEBHOOK
fetch(subscribeWebhook,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:

"🆕 NEW SUBSCRIBER\n\n" +

"Username : " +
currentUser + "\n" +

"Game ID : " +
gameId + "\n\n" +

"Proof Link :\n" +
proof

})

});


alert(
"Verification Submitted ✅"
);

backHome();

}


// ===============================
// OPEN WITHDRAW PAGE
// ===============================

function openWithdraw(){

document.getElementById("homePage")
.classList.add("hidden");

document.getElementById("withdrawPage")
.classList.remove("hidden");

}


// ===============================
// WITHDRAW SUBMIT
// ===============================

function submitWithdraw(){

let gameId =
document.getElementById("withdrawGameId")
.value.trim();

let amount =
document.getElementById("withdrawAmount")
.value.trim();


// EMPTY CHECK
if(!gameId || !amount){

alert(
"Fill all fields ❌"
);

return;

}


// DISCORD WEBHOOK
fetch(withdrawWebhook,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:

"💸 NEW WITHDRAW REQUEST\n\n" +

"Username : " +
currentUser + "\n" +

"Game ID : " +
gameId + "\n" +

"Amount : " +
amount

})

});


alert(
"Withdraw Submitted ✅"
);

backHome();

}
