let currentUser = null;

// SAFE INIT USERS
let users = JSON.parse(localStorage.getItem("users")) || [];

if(users.length === 0){
users = [
{name:"Lucas_Arora", password:"admin123", role:"owner", coins:0},
{name:"Robert YouTuber", password:"1234", role:"subscriber", coins:0}
];
save();
}

// SAVE FUNCTION
function save(){
localStorage.setItem("users", JSON.stringify(users));
}

// SIGNUP
function signup(){
let u=document.getElementById("username").value;
let p=document.getElementById("password").value;

if(users.find(x=>x.name===u)){
alert("User already exists");
return;
}

users.push({name:u,password:p,role:"subscriber",coins:0});
save();
alert("Signup done, now login");
}

// LOGIN
function login(){
let u=document.getElementById("username").value;
let p=document.getElementById("password").value;

let user = users.find(x => x.name === u && x.password === p);

if(!user){
alert("Wrong login");
return;
}

currentUser = user;
localStorage.setItem("currentUser", u);
showDashboard();
}

// DASHBOARD
function showDashboard(){
document.getElementById("loginPage").classList.add("hidden");
document.getElementById("dashboard").classList.remove("hidden");

document.getElementById("userInfo").innerText = "User: " + currentUser.name;
document.getElementById("roleInfo").innerText = "Role: " + currentUser.role;

updateUI();
}

// UPDATE UI
function updateUI(){

let user = users.find(x => x.name === currentUser.name);

// FIX: safe fallback
if(!user) return;

document.getElementById("coins").innerText = user.coins;

// reset admin panel
document.getElementById("adminPanel").classList.add("hidden");

// only owner sees admin panel
if(user.role === "owner"){
document.getElementById("adminPanel").classList.remove("hidden");
}
}

// EARN MONEY BUTTON
function earnMoney(){
alert("Coming Soon 🚀");
}

// ADD COINS (OWNER ONLY)
function addCoins(){

if(!currentUser || currentUser.role !== "owner"){
alert("Access Denied ❌ Only owner can add coins");
return;
}

let target = prompt("Username?");
let amount = parseInt(prompt("Coins?"));

let user = users.find(x => x.name === target);

if(user){
user.coins += amount;
save();
updateUI();
}
}

// MAKE ADMIN (OWNER ONLY)
function makeAdmin(){

if(!currentUser || currentUser.role !== "owner"){
alert("Access Denied ❌ Only owner can give admin role");
return;
}

let target = prompt("Username?");

let user = users.find(x => x.name === target);

if(!user){
alert("User not found");
return;
}

user.role = "admin";
save();

alert(target + " is now ADMIN 👑");
}

// MAKE OWNER (optional for Robert fix)
function makeOwner(name){

if(!currentUser || currentUser.role !== "owner"){
alert("Access Denied ❌");
return;
}

let user = users.find(x => x.name === name);

if(user){
user.role = "owner";
save();
alert(name + " is now OWNER 👑");
}
}

// VIEW USERS TABLE (OWNER ONLY)
function viewUsers(){

if(!currentUser || currentUser.role !== "owner"){
alert("Access Denied ❌ Only owner can view database");
return;
}

let table = document.getElementById("userTableBody");
table.innerHTML = "";

users.forEach((u, i) => {
table.innerHTML += `
<tr>
<td>${i+1}</td>
<td>${u.name}</td>
<td>${u.role}</td>
<td>${u.coins}</td>
</tr>
`;
});

document.getElementById("userTableBox").classList.remove("hidden");
}

// CLOSE TABLE
function closeTable(){
document.getElementById("userTableBox").classList.add("hidden");
}

// DATABASE RAW (OWNER ONLY)
function showDatabase(){

if(!currentUser || currentUser.role !== "owner"){
alert("Access Denied ❌ Only owner can view database");
return;
}

alert(JSON.stringify(users, null, 2));
}

// LOGOUT (ALL USERS)
function logout(){

currentUser = null;
localStorage.removeItem("currentUser");

document.getElementById("dashboard").classList.add("hidden");
document.getElementById("loginPage").classList.remove("hidden");

document.getElementById("username").value = "";
document.getElementById("password").value = "";

alert("Logged out successfully 🚪");
}

// AUTO LOGIN
window.onload = function(){

let saved = localStorage.getItem("currentUser");

if(saved){
let user = users.find(x => x.name === saved);

if(user){
currentUser = user;
showDashboard();
}
}
}
