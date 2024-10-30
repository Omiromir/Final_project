"use strict"

var logForm = document.getElementById("login-form");
var regForm = document.getElementById("register-form");
var btn = document.getElementById("btn");

function register() {
  logForm.style.left = "-400px";
  regForm.style.left = "50px";
  btn.style.left = "110px";
}
function login() {
  logForm.style.left = "50px";
  regForm.style.left = "450px";
  btn.style.left = "0px";
}

logForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const loginStatus = document.getElementById("login-status");
  
    // Retrieve accounts from localStorage or fallback to predefined accounts
    const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || accounts;
  
    // Find the account matching the entered username and password
    const account = storedAccounts.find(
      (acc) => acc.username === username && acc.pin === +password
    );
  
    if (account) {
      // Successful login
      localStorage.setItem("loggedInUser", JSON.stringify({ username: account.username }));
      loginStatus.textContent = `Welcome, ${account.owner}! Redirecting...`;
      loginStatus.style.color = "green";
  
      // Redirect to the app page after a brief delay
      setTimeout(() => {
        window.location.href = "../bank/index.html"; // Update this path if needed
      }, 1000);
    } else {
      // Failed login attempt
      loginStatus.textContent = "Invalid username or password.";
      loginStatus.style.color = "red";
    }
  
    // Clear form inputs
    document.getElementById("login-username").value = "";
    document.getElementById("login-password").value = "";
  });



//////////////////////////////////////////////////////////////////////

  
  regForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const registerStatus = document.getElementById("register-status");
  
    // Fetch existing accounts from localStorage or initialize with an empty array
    const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
  
    // Check if username already exists
    const userExists = storedAccounts.some((acc) => acc.username === username);
  
    if (userExists) {
      // Username is already taken
      registerStatus.textContent = "Username already exists. Please choose a different one.";
      registerStatus.style.color = "red";
    } else {
      // Create new account
      const newAccount = {
        owner: username,
        movements: [],
        interestRate: 1.2,
        pin: +password,
        movementsDates: [],
        currency: "USD",
        locale: "en-US",
        username: username.toLowerCase().split(" ").map(name => name[0]).join(""),
      };
  
      // Add new account to the array and save to localStorage
      storedAccounts.push(newAccount);
      localStorage.setItem("accounts", JSON.stringify(storedAccounts));
  
      // Show success message and redirect to login
      registerStatus.textContent = "Registration successful! Redirecting to login...";
      registerStatus.style.color = "green";
  
      setTimeout(() => {
        window.location.href = "../Login-Registration/index.html"; // Redirect to login page
      }, 1000);
    }
  
    // Clear form inputs
    document.getElementById("register-username").value = "";
    document.getElementById("register-password").value = "";
  });
  