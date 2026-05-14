// ===============================
// START SYSTEM
// ===============================

let currentUser = null;


// USERS DATABASE
let users = JSON.parse(
localStorage.getItem("users")
) || [];


// SUBSCRIBE REQUESTS
let subscribeRequests = JSON.parse(
localStorage.getItem("subscribeRequests")
) || [];


// WITHDRAW REQUESTS
let withdrawRequests = JSON.parse(
localStorage.getItem("withdrawRequests")
) || [];


// VIDEOS DATABASE
let videos = JSON.parse(
localStorage.getItem("videos")
) || [];


// ===============================
// AUTO CREATE OWNERS
// ===============================

if(users.length === 0){

users = [

{
name:"Lucas_Arora",
password:"admin123",
role:"owner",
coins:0
},

{
name:"Robert",
password:"admin1234",
role:"owner",
coins:0
}

];

save();

}


// ===============================
// SAVE DATABASE
// ===============================

function save(){

localStorage.setItem(

"users",

JSON.stringify(users)

);

}


// ===============================
// ADD HISTORY
// ===============================

function addHistory(
username,
text
){

let history = JSON.parse(

localStorage.getItem(
"history_"+username
)

) || [];

history.push(text);

localStorage.setItem(

"history_"+username,

JSON.stringify(history)

);

}


// ===============================
// SIGNUP
// ===============================

function signup(){

let u =
document.getElementById("username")
.value;

let p =
document.getElementById("password")
.value;


// EMPTY CHECK
if(!u || !p){

alert(
"Fill all fields ❌"
);

return;

}


// USER EXISTS
if(
users.find(x => x.name === u)
){

alert(
"User already exists ❌"
);

return;

}


// CREATE USER
users.push({

name:u,
password:p,
role:"subscriber",
coins:0

});

save();

alert(
"Signup Successful ✅"
);

}
// ===============================
// LOGIN
// ===============================

function login(){

let u =
document.getElementById("username")
.value;

let p =
document.getElementById("password")
.value;


// FIND USER
let user = users.find(

x =>

x.name === u

&&

x.password === p

);


// WRONG LOGIN
if(!user){

alert(
"Wrong Username or Password ❌"
);

return;

}


// SAVE SESSION
currentUser = user;

localStorage.setItem(
"currentUser",
u
);


// OPEN DASHBOARD
showDashboard();

}


// ===============================
// SHOW DASHBOARD
// ===============================

function showDashboard(){

hideAllPages();

document.getElementById("dashboard")
.classList.remove("hidden");


// USER INFO
document.getElementById("userInfo")
.innerText =

"User: " +
currentUser.name;


// ROLE INFO
document.getElementById("roleInfo")
.innerText =

"Role: " +
currentUser.role;


// UPDATE UI
updateUI();

}


// ===============================
// UPDATE UI
// ===============================

function updateUI(){

let user = users.find(
x => x.name === currentUser.name
);


// UPDATE COINS
document.getElementById("coins")
.innerText = user.coins;


// HIDE ADMIN PANEL
document.getElementById("adminPanel")
.classList.add("hidden");


// HIDE OWNER CONTROLS
document.getElementById("ownerControls")
.style.display = "none";


// SHOW ADMIN PANEL
if(

user.role === "owner"

||

user.role === "admin"

){

document.getElementById("adminPanel")
.classList.remove("hidden");

}


// OWNER ONLY
if(user.role === "owner"){

document.getElementById("ownerControls")
.style.display = "block";

}


// SUBSCRIBE BUTTON CONTROL
let approvedUsers = JSON.parse(
localStorage.getItem("subApproved")
) || [];


if(
approvedUsers.includes(user.name)
){

document.getElementById("subscribeBox")
.style.display = "none";

}else{

document.getElementById("subscribeBox")
.style.display = "block";

}

}
// ===============================
// HIDE ALL PAGES
// ===============================

function hideAllPages(){

document.getElementById("loginPage")
.classList.add("hidden");

document.getElementById("dashboard")
.classList.add("hidden");

document.getElementById("earnPage")
.classList.add("hidden");

document.getElementById("subscribePage")
.classList.add("hidden");

document.getElementById("membersPage")
.classList.add("hidden");

document.getElementById("newSubscriberPage")
.classList.add("hidden");

document.getElementById("withdrawPage")
.classList.add("hidden");

document.getElementById("withdrawRequestPage")
.classList.add("hidden");

}


// ===============================
// BACK DASHBOARD
// ===============================

function backDashboard(){

hideAllPages();

document.getElementById("dashboard")
.classList.remove("hidden");

updateUI();

}


// ===============================
// LOGOUT
// ===============================

function logout(){

currentUser = null;

localStorage.removeItem(
"currentUser"
);

hideAllPages();

document.getElementById("loginPage")
.classList.remove("hidden");

document.getElementById("username")
.value = "";

document.getElementById("password")
.value = "";

alert(
"Logged out successfully 🚪"
);

}


// ===============================
// AUTO LOGIN
// ===============================

window.onload = function(){

let saved =
localStorage.getItem("currentUser");

if(saved){

let user = users.find(
x => x.name === saved
);

if(user){

currentUser = user;

showDashboard();

}

}

}


// ===============================
// STATUS FEATURE
// ===============================

function statusFeature(){

let history = JSON.parse(

localStorage.getItem(
"history_"+currentUser.name
)

) || [];

let text = "";

history.forEach(h=>{

text +=
"• " + h + "\n";

});

if(text === ""){

text = "No history found";

}

alert(

"📊 STATUS 📊\n\n" +

"Name: " +
currentUser.name +

"\n\nRole: " +
currentUser.role +

"\n\nCoins: " +
currentUser.coins +

"\n\n━━━━━━━━━━\n\n" +

text

);

}
// ===============================
// OPEN EARN PAGE
// ===============================

function openEarnPage(){

hideAllPages();

document.getElementById("earnPage")
.classList.remove("hidden");

showVideos();


// OWNER ONLY UPLOAD
if(
currentUser.role === "owner"
){

document.getElementById("uploadBox")
.classList.remove("hidden");

}else{

document.getElementById("uploadBox")
.classList.add("hidden");

}

}


// ===============================
// UPLOAD VIDEO
// ===============================

function uploadVideo(){

let link =
document.getElementById("videoLink")
.value;

let reward =
parseInt(

document.getElementById("videoReward")
.value

);


// EMPTY CHECK
if(!link || !reward){

alert(
"Fill all fields ❌"
);

return;

}


// ADD VIDEO
videos.push({

id: Date.now(),

link: link,

reward: reward

});


// SAVE
localStorage.setItem(

"videos",

JSON.stringify(videos)

);


// DISCORD WEBHOOK
fetch(
"https://discord.com/api/webhooks/1503774481582395592/LaQ3H8clAQcjLsWoJAEttASiwbOcyFYSNdyum1YsbQ7S3E-z_8rsfMvF8Ja835N-73by",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:
"🎥 NEW VIDEO UPLOADED\n\n" +

"Reward: " +
reward +
" Coins 💰\n\n" +

link

})

});


// CLEAR INPUT
document.getElementById("videoLink")
.value = "";

document.getElementById("videoReward")
.value = "";

alert(
"Video Uploaded ✅"
);

showVideos();

}


// ===============================
// SHOW VIDEOS
// ===============================

function showVideos(){

let area =
document.getElementById("videoArea");

area.innerHTML = "";


// NO VIDEO
if(videos.length === 0){

area.innerHTML = `

<div class="card">

<h3>
No Videos Available 📭
</h3>

</div>

`;

return;

}


// VIDEO LIST
videos.forEach(v=>{

area.innerHTML += `

<div class="card">

<h3>

Reward:
${v.reward} Coins 💰

</h3>

<button
onclick="watchVideo(
'${v.link}',
${v.reward},
${v.id}
)">

Watch Video ▶

</button>

</div>

`;

});

}
// ===============================
// WATCH VIDEO
// ===============================

function watchVideo(
link,
reward,
id
){

let claimed = JSON.parse(

localStorage.getItem(
"claimed_"+currentUser.name
)

) || [];


// ALREADY CLAIMED
if(
claimed.includes(id)
){

alert(
"Reward already claimed ❌"
);

return;

}


// OPEN VIDEO
window.open(
link,
"_blank"
);


// ADD COINS
currentUser.coins += reward;

save();


// SAVE CLAIM
claimed.push(id);

localStorage.setItem(

"claimed_"+currentUser.name,

JSON.stringify(claimed)

);


// ADD HISTORY
addHistory(

currentUser.name,

"You earned " +
reward +
" coins by watching video"

);


// REMOVE VIDEO
videos = videos.filter(
x => x.id !== id
);


// SAVE VIDEOS
localStorage.setItem(

"videos",

JSON.stringify(videos)

);


// UPDATE UI
updateUI();

alert(

"You earned " +
reward +
" coins 💰"

);

showVideos();

}


// ===============================
// OPEN SUBSCRIBE PAGE
// ===============================

function openSubscribePage(){

hideAllPages();

document.getElementById("subscribePage")
.classList.remove("hidden");

}


// ===============================
// SUBMIT VERIFICATION
// ===============================

function submitVerification(){

let name =
document.getElementById("gameName")
.value;

let number =
document.getElementById("gameNumber")
.value;

let file =
document.getElementById("proofImage")
.files[0];


// EMPTY CHECK
if(!name || !number || !file){

alert(
"Fill all fields ❌"
);

return;

}


// CHECK EXISTING REQUEST
let alreadyApplied =
subscribeRequests.find(

x => x.user === currentUser.name

);


if(alreadyApplied){

alert(
"You already submitted verification ❌"
);

return;

}


// CHECK APPROVED
let approvedUsers = JSON.parse(
localStorage.getItem("subApproved")
) || [];


if(
approvedUsers.includes(currentUser.name)
){

alert(
"You are already approved ✅"
);

return;

}
 // ===============================
// FILE READER
// ===============================

let reader = new FileReader();

reader.onload = function(e){

// SAVE REQUEST
subscribeRequests.push({

user: currentUser.name,

game: name,

number: number,

image: e.target.result

});


// SAVE STORAGE
localStorage.setItem(

"subscribeRequests",

JSON.stringify(subscribeRequests)

);


// DISCORD WEBHOOK
fetch(
"https://discord.com/api/webhooks/1503773951325638716/zeBKmrRqWRfaSZBFC07__bZ_hqOsnFqSgyd_zigjklRT4ebCsmq8jhGP5ZbYrcoD6oNX",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:
"🆕 NEW SUBSCRIBER REQUEST\n\n" +

"User: " +
currentUser.name +

"\nGame Name: " +
name +

"\nNumber: " +
number

})

});


// CLEAR INPUTS
document.getElementById("gameName")
.value = "";

document.getElementById("gameNumber")
.value = "";

document.getElementById("proofImage")
.value = "";

alert(
"Verification Submitted ✅"
);

backDashboard();

};


// READ IMAGE
reader.readAsDataURL(file);

}


// ===============================
// OPEN NEW SUBSCRIBERS PAGE
// ===============================

function openNewSubscriberPage(){

hideAllPages();

document.getElementById("newSubscriberPage")
.classList.remove("hidden");


// RELOAD REQUESTS
subscribeRequests = JSON.parse(
localStorage.getItem("subscribeRequests")
) || [];


let box =
document.getElementById("subscriberList");

box.innerHTML = "";


// EMPTY
if(subscribeRequests.length === 0){

box.innerHTML = `

<div class="card">

<h3>
No New Subscriber Request 📭
</h3>

</div>

`;

return;

}


// SHOW REQUESTS
subscribeRequests.forEach((s,i)=>{

box.innerHTML += `

<div class="card">

<h2>
${s.user}
</h2>

<p>
Game Name:
${s.game}
</p>

<p>
Number:
${s.number}
</p>

<img
src="${s.image}"
style="
width:100%;
margin-top:10px;
border-radius:10px;
">

<button
onclick="approveSubscriber(${i})">

Approve ✅

</button>

</div>

`;

});

}
// ===============================
// APPROVE SUBSCRIBER
// ===============================

function approveSubscriber(index){

// RELOAD REQUESTS
subscribeRequests = JSON.parse(
localStorage.getItem("subscribeRequests")
) || [];


// GET REQUEST
let s = subscribeRequests[index];


// FIND USER
let user = users.find(
x => x.name === s.user
);


// USER NOT FOUND
if(!user){

alert(
"User not found ❌"
);

return;

}


// ADD COINS
user.coins += 50000;


// SAVE USERS
save();


// APPROVED LIST
let approvedUsers = JSON.parse(
localStorage.getItem("subApproved")
) || [];


// ADD APPROVED USER
if(
!approvedUsers.includes(user.name)
){

approvedUsers.push(user.name);

localStorage.setItem(

"subApproved",

JSON.stringify(approvedUsers)

);

}


// ADD HISTORY
addHistory(

user.name,

"You earned 50000 coins by subscribe verification"

);


// DISCORD WEBHOOK
fetch(
"https://discord.com/api/webhooks/1503773951325638716/zeBKmrRqWRfaSZBFC07__bZ_hqOsnFqSgyd_zigjklRT4ebCsmq8jhGP5ZbYrcoD6oNX",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:
"✅ SUBSCRIBER APPROVED\n\n" +

"User: " +
user.name +

"\nReward: 50000 Coins 💰"

})

});


// REMOVE REQUEST
subscribeRequests.splice(index,1);


// SAVE REQUESTS
localStorage.setItem(

"subscribeRequests",

JSON.stringify(subscribeRequests)

);


alert(
"Subscriber Approved ✅"
);


// REFRESH PAGE
openNewSubscriberPage();

}


// ===============================
// OPEN MEMBERS PAGE
// ===============================

function openMembersPage(){

hideAllPages();

document.getElementById("membersPage")
.classList.remove("hidden");


let table =
document.getElementById("membersTable");

table.innerHTML = "";


// RELOAD USERS
users = JSON.parse(
localStorage.getItem("users")
) || [];


// APPROVED USERS
let approvedUsers = JSON.parse(
localStorage.getItem("subApproved")
) || [];


// FILTER USERS
let filteredUsers = users.filter(

u =>

approvedUsers.includes(u.name)

||

u.role === "owner"

||

u.role === "admin"

);


// EMPTY
if(filteredUsers.length === 0){

table.innerHTML = `

<tr>

<td colspan="4">

No Subscribers Found 📭

</td>

</tr>

`;

return;

}
 // ===============================
// SHOW MEMBERS
// ===============================

filteredUsers.forEach((u,i)=>{

table.innerHTML += `

<tr>

<td>${i+1}</td>

<td>${u.name}</td>

<td>${u.role}</td>

<td>${u.coins}</td>

</tr>

`;

});

}


// ===============================
// OPEN WITHDRAW PAGE
// ===============================

function openWithdrawPage(){

hideAllPages();

document.getElementById("withdrawPage")
.classList.remove("hidden");

}


// ===============================
// SUBMIT WITHDRAW
// ===============================

function submitWithdraw(){

let number =
document.getElementById("withdrawNumber")
.value;

let amount =
parseInt(

document.getElementById("withdrawAmount")
.value

);


// EMPTY CHECK
if(!number || !amount){

alert(
"Fill all fields ❌"
);

return;

}


// LOW COINS
if(currentUser.coins < amount){

alert(
"Not enough coins ❌"
);

return;

}


// CREATE REQUEST
withdrawRequests.push({

user: currentUser.name,

number: number,

amount: amount,

status: "Waiting For Checking",

locked: false

});


// SAVE REQUESTS
localStorage.setItem(

"withdrawRequests",

JSON.stringify(withdrawRequests)

);


// DISCORD WEBHOOK
fetch(
"https://discord.com/api/webhooks/1503774858146742533/cR1OERc6wVRpu0Wy708kRphgmdcssuS_9QDuUHrSTSaK3wJhGDHMBjNl0DdX4eOGc2ey",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:
"💸 NEW WITHDRAWAL REQUEST\n\n" +

"User: " +
currentUser.name +

"\nNumber: " +
number +

"\nAmount: " +
amount +
" Coins"

})

});


// ADD HISTORY
addHistory(

currentUser.name,

"You submitted withdrawal request of " +
amount +
" coins"

);


// CLEAR INPUTS
document.getElementById("withdrawNumber")
.value = "";

document.getElementById("withdrawAmount")
.value = "";

alert(
"Withdrawal Request Submitted ✅"
);

backDashboard();

 }
// ===============================
// OPEN WITHDRAW REQUESTS
// ===============================

function openWithdrawRequests(){

hideAllPages();

document.getElementById("withdrawRequestPage")
.classList.remove("hidden");


// RELOAD REQUESTS
withdrawRequests = JSON.parse(
localStorage.getItem("withdrawRequests")
) || [];


let table =
document.getElementById("withdrawTable");

table.innerHTML = "";


// EMPTY
if(withdrawRequests.length === 0){

table.innerHTML = `

<tr>

<td colspan="4">

No Withdrawal Request 📭

</td>

</tr>

`;

return;

}


// SHOW REQUESTS
withdrawRequests.forEach((w,i)=>{

table.innerHTML += `

<tr>

<td>
${w.user}
</td>

<td>
${w.number}
</td>

<td>
${w.amount}
</td>

<td>

${
w.locked

?

`<span style="color:lime;">
${w.status}
</span>`

:

`

<select
onchange="changeWithdrawStatus(
${i},
this.value
)">

<option>
${w.status}
</option>

<option>
In Progress
</option>

<option>
Completed
</option>

</select>

`

}

</td>

</tr>

`;

});

}


// ===============================
// CHANGE WITHDRAW STATUS
// ===============================

function changeWithdrawStatus(
index,
status
){

// RELOAD REQUESTS
withdrawRequests = JSON.parse(
localStorage.getItem("withdrawRequests")
) || [];


// GET REQUEST
let w = withdrawRequests[index];


// LOCK CHECK
if(w.locked){

alert(
"Status already locked ❌"
);

return;

}


// UPDATE STATUS
w.status = status;
 // ===============================
// COMPLETED
// ===============================

if(status === "Completed"){

// FIND USER
let user = users.find(
x => x.name === w.user
);


// REMOVE COINS
if(user){

user.coins -= w.amount;

if(user.coins < 0){
user.coins = 0;
}

save();

}


// LOCK REQUEST
w.locked = true;


// ADD HISTORY
addHistory(

w.user,

"You successfully withdraw amount of " +
w.amount

);


// DISCORD WEBHOOK
fetch(
"https://discord.com/api/webhooks/1503774858146742533/cR1OERc6wVRpu0Wy708kRphgmdcssuS_9QDuUHrSTSaK3wJhGDHMBjNl0DdX4eOGc2ey",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

content:

"💸 WITHDRAWAL SUCCESSFULLY COMPLETED\n\n" +

w.amount +

" coins transferred successfully to " +

w.user +

" game account 🎮\n\n" +

"Approved By:\n" +

currentUser.name +
" 👑 \n<@&1503714193214406827>"

})

});

}


// SAVE REQUESTS
localStorage.setItem(

"withdrawRequests",

JSON.stringify(withdrawRequests)

);


alert(
"Status Updated ✅"
);


// REFRESH PAGE
openWithdrawRequests();

}


// ===============================
// MAKE ADMIN
// ===============================

function makeAdmin(){

// OWNER ONLY
if(currentUser.role !== "owner"){

alert(
"Only owner can use this ❌"
);

return;

}


// USERNAME
let target =
prompt("Enter Username");


// FIND USER
let user = users.find(
x => x.name === target
);


// USER NOT FOUND
if(!user){

alert(
"User not found ❌"
);

return;

}


// MAKE ADMIN
user.role = "admin";

save();

alert(
target +
" is now ADMIN 👑"
);

}
// ===============================
// ADD COINS
// ===============================

function addCoins(){

// OWNER ONLY
if(currentUser.role !== "owner"){

alert(
"Only owner can use this ❌"
);

return;

}


// USERNAME
let target =
prompt("Enter Username");


// COINS
let amount =
parseInt(
prompt("Enter Coins")
);


// INVALID
if(!amount){

alert(
"Invalid amount ❌"
);

return;

}


// FIND USER
let user = users.find(
x => x.name === target
);


// USER NOT FOUND
if(!user){

alert(
"User not found ❌"
);

return;

}


// ADD COINS
user.coins += amount;

save();


// HISTORY
addHistory(

user.name,

"You received " +
amount +
" coins from owner"

);


alert(

amount +
" coins added to " +
user.name +
" ✅"

);

}


// ===============================
// AUTO LOGIN
// ===============================

window.onload = function(){

let saved =
localStorage.getItem("currentUser");


// USER FOUND
if(saved){

let user = users.find(
x => x.name === saved
);

if(user){

currentUser = user;

showDashboard();

}

}

}
// ===============================
// AUTO REFRESH DATA
// ===============================

setInterval(()=>{

// RELOAD USERS
users = JSON.parse(
localStorage.getItem("users")
) || [];


// RELOAD REQUESTS
subscribeRequests = JSON.parse(
localStorage.getItem("subscribeRequests")
) || [];


// RELOAD WITHDRAWS
withdrawRequests = JSON.parse(
localStorage.getItem("withdrawRequests")
) || [];


// RELOAD VIDEOS
videos = JSON.parse(
localStorage.getItem("videos")
) || [];


// UPDATE UI
if(currentUser){

updateUI();

}

},2000);
