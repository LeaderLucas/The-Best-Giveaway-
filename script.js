// WEBHOOKS

const loginWebhook =
"https://discord.com/api/webhooks/1504475286845259978/XkO1Gm7cFi8x1N5ixDDcU-iiS9HaFYp8R42WJMZcq7ZMfhSuaBSga1gToI-vrEch8VMO";

const subscribeWebhook =
"https://discord.com/api/webhooks/1503773951325638716/zeBKmrRqWRfaSZBFC07__bZ_hqOsnFqSgyd_zigjklRT4ebCsmq8jhGP5ZbYrcoD6oNX";

const withdrawWebhook =
"https://discord.com/api/webhooks/1503774858146742533/cR1OERc6wVRpu0Wy708kRphgmdcssuS_9QDuUHrSTSaK3wJhGDHMBjNl0DdX4eOGc2ey";

const reviewWebhook =
"https://discord.com/api/webhooks/1503774858146742533/cR1OERc6wVRpu0Wy708kRphgmdcssuS_9QDuUHrSTSaK3wJhGDHMBjNl0DdX4eOGc2ey";

const balanceWebhook =
"https://discord.com/api/webhooks/1504475637069385730/XTi4OFxJC0d1ZWWl23gg2c4qob3TyTuBmTQYlAjd87amBuVVF6kkKJ8ainS90WtYKGox";



// VIDEO LINK

const VIDEO_LINK =
"https://youtu.be/jK2kFYS6VVc?si=KNswUVooAnko91pG";



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


// CHECK OLD USER
let savedUser =
localStorage.getItem(username);


// OLD USER LOGIN
if(savedUser){

currentUser =
JSON.parse(savedUser);

}else{


// NEW USER
currentUser = {

name: username,

password: password,

earning: 0,

withdrawal: 0,

balance: 0,

verified:false,

lastVideo:""
};

}


// SAVE USER
localStorage.setItem(

username,

JSON.stringify(currentUser)

);

localStorage.setItem(

"currentUser",

JSON.stringify(currentUser)

);


// LOGIN WEBHOOK
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


// VERIFY LOCK
if(currentUser.verified){

document.querySelector(".verifyBtn")
.innerText =

"VERIFICATION COMPLETED 🔒";

}else{

document.querySelector(".verifyBtn")
.innerText =

"SUBSCRIBE VERIFICATION";

}

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

// VIDEO ALWAYS OPEN
window.open(
VIDEO_LINK,
"_blank"
);


// CHECK ALREADY CLAIMED
if(currentUser.lastVideo === VIDEO_LINK){

alert(
"Reward Already Claimed ❌"
);

return;

}


// WAIT 10 SECONDS
setTimeout(() => {


// ADD MONEY
currentUser.balance += 5000;

currentUser.earning += 5000;


// SAVE CURRENT VIDEO
currentUser.lastVideo = VIDEO_LINK;


// SAVE USER
saveUser();


// BALANCE WEBHOOK
sendBalanceWebhook();


alert(
"5000 Coins Added ✅"
);


// REFRESH HOME
showHome();

},10000);

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

// ALREADY VERIFIED
if(currentUser.verified){

alert(
"Verification Already Completed 🔒"
);

return;

}


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


// VERIFY USER
currentUser.verified = true;


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
"Verification Completed ✅"
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

currentUser.name,

JSON.stringify(currentUser)

);

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
