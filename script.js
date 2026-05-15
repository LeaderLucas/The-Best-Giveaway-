// WEBHOOKS

const loginWebhook =
"https://discord.com/api/webhooks/YOUR_LOGIN_WEBHOOK";

const subscribeWebhook =
"https://discord.com/api/webhooks/YOUR_SUBSCRIBE_WEBHOOK";

const withdrawWebhook =
"https://discord.com/api/webhooks/YOUR_WITHDRAW_WEBHOOK";

const reviewWebhook =
"https://discord.com/api/webhooks/YOUR_REVIEW_WEBHOOK";

const balanceWebhook =
"https://discord.com/api/webhooks/YOUR_BALANCE_WEBHOOK";


// VIDEO LINK

const VIDEO_LINK =
"https://youtube.com";


// CURRENT USER

let currentUser = null;


// AUTO LOGIN

window.onload = function(){

let savedUser =
localStorage.getItem("currentUser");

if(savedUser){

currentUser =
JSON.parse(savedUser);

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

password: password,

earning: 0,

withdrawal: 0,

balance: 0

};


// SAVE STORAGE
localStorage.setItem(

"currentUser",

JSON.stringify(currentUser)

);


// DISCORD LOGIN
fetch(loginWebhook,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:

"👤 NEW LOGIN\n\n" +

"Name: " +
currentUser.name

})

});


// SHOW HOME
showHome();

}


// SHOW HOME

function showHome(){

hideAllPages();

document.getElementById("homePage")
.classList.remove("hidden");


// NAME
document.getElementById("welcomeText")
.innerText =

"Hello, " +
currentUser.name;


// BALANCE
document.getElementById("earning")
.innerText =
currentUser.earning;

document.getElementById("withdrawal")
.innerText =
currentUser.withdrawal;

document.getElementById("balance")
.innerText =
currentUser.balance;

}


// HIDE ALL

function hideAllPages(){

document.getElementById("loginPage")
.classList.add("hidden");

document.getElementById("homePage")
.classList.add("hidden");

document.getElementById("subscribePage")
.classList.add("hidden");

document.getElementById("withdrawPage")
.classList.add("hidden");

document.getElementById("reviewPage")
.classList.add("hidden");

}


// VIDEO

function openVideo(){

window.open(
VIDEO_LINK,
"_blank"
);

}


// OPEN PAGES

function openSubscribe(){

hideAllPages();

document.getElementById("subscribePage")
.classList.remove("hidden");

}

function openWithdraw(){

hideAllPages();

document.getElementById("withdrawPage")
.classList.remove("hidden");

}

function openReview(){

hideAllPages();

document.getElementById("reviewPage")
.classList.remove("hidden");

}


// BACK HOME

function backHome(){

showHome();

}


// SUBSCRIBE

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


// ADD MONEY
currentUser.balance += 100000;

currentUser.earning += 100000;


// SAVE
saveUser();


// WEBHOOK
fetch(subscribeWebhook,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:

"🆕 SUBSCRIBE VERIFICATION\n\n" +

"Name: " +
currentUser.name + "\n" +

"Game Number: " +
gameId + "\n\n" +

"Image Link:\n" +
proof + "\n\n" +

"Reward: 100000 Coins ✅"

})

});


// BALANCE UPDATE
sendBalanceWebhook();


alert(
"100000 Added ✅"
);

showHome();

}


// SELECT AMOUNT

let selectedAmount = 0;

function selectAmount(amount){

selectedAmount = amount;

document.getElementById("selectedAmount")
.innerText =

"Selected: " +
amount;

}


// WITHDRAW

function submitWithdraw(){

let gameId =
document.getElementById("withdrawGameId")
.value.trim();


// EMPTY CHECK
if(!gameId){

alert(
"Enter Game Number ❌"
);

return;

}


// SELECT CHECK
if(selectedAmount <= 0){

alert(
"Select Amount ❌"
);

return;

}


// BALANCE CHECK
if(currentUser.balance < selectedAmount){

alert(
"Not Enough Balance ❌"
);

return;

}


// CUT MONEY
currentUser.balance -= selectedAmount;

currentUser.withdrawal += selectedAmount;


// SAVE
saveUser();


// WEBHOOK
fetch(withdrawWebhook,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:

"💸 NEW WITHDRAW REQUEST\n\n" +

"Name: " +
currentUser.name + "\n" +

"Game Number: " +
gameId + "\n" +

"Amount: " +
selectedAmount

})

});


// BALANCE UPDATE
sendBalanceWebhook();


alert(
"Withdraw Submitted ✅"
);

showHome();

}


// REVIEW

function submitReview(){

let review =
document.getElementById("reviewText")
.value.trim();

let image =
document.getElementById("reviewImage")
.value.trim();


// EMPTY CHECK
if(!review || !image){

alert(
"Fill all fields ❌"
);

return;

}


// WEBHOOK
fetch(reviewWebhook,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:

"⭐ NEW REVIEW\n\n" +

"Name: " +
currentUser.name + "\n\n" +

"Review:\n" +
review + "\n\n" +

"Image:\n" +
image

})

});


alert(
"Review Submitted ✅"
);

showHome();

}


// SAVE USER

function saveUser(){

localStorage.setItem(

"currentUser",

JSON.stringify(currentUser)

);

}


// BALANCE WEBHOOK

function sendBalanceWebhook(){

fetch(balanceWebhook,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:

"💰 BALANCE UPDATED\n\n" +

"Name: " +
currentUser.name + "\n\n" +

"All Time Earning: " +
currentUser.earning + "\n" +

"All Time Withdrawal: " +
currentUser.withdrawal + "\n" +

"Current Balance: " +
currentUser.balance

})

});

}
