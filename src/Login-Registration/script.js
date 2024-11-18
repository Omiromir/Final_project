"use strict"

var logForm = document.getElementById("login-form");
var regForm = document.getElementById("register-form");
var btn = document.getElementById("btn");

// Predefined accounts, similar to those in the app script
const predefinedAccounts = [
  {
    owner: "Omir Sondai",
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 12345678,
    movementsDates: [
      "2019-11-18T21:31:17.178Z",
      "2019-12-23T07:42:02.383Z",
      "2020-01-28T09:15:04.904Z",
      "2020-04-01T10:17:24.185Z",
      "2020-05-08T14:11:59.604Z",
      "2020-07-26T17:01:17.194Z",
      "2020-07-28T23:36:17.929Z",
      "2020-08-01T10:51:36.790Z",
    ],
    currency: "EUR",
    locale: "pt-PT", 
    username: "os"
  },
  {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 87654321,
    movementsDates: [
      "2019-11-01T13:15:33.035Z",
      "2019-11-30T09:48:16.867Z",
      "2019-12-25T06:04:23.907Z",
      "2020-01-25T14:18:46.235Z",
      "2020-02-05T16:33:06.386Z",
      "2020-04-10T14:43:26.374Z",
      "2020-06-25T18:49:59.371Z",
      "2020-07-26T12:01:20.894Z",
    ],
    currency: "USD",
    locale: "en-US",
    username: "jd"
  },
];

// Save predefined accounts to localStorage if it’s empty
if (!localStorage.getItem("accounts")) {
  localStorage.setItem("accounts", JSON.stringify(predefinedAccounts));
}


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
  
    // Retrieve accounts from localStorage or fallback to predefined accounts
    const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || accounts;
  
    // Find the account matching the entered username and password
    const account = storedAccounts.find(
      (acc) => acc.username === username && acc.pin === +password
    );

    if (password.length < 4) openAlert("Password must be at least 4 characters long.");
  
    if (account) {

      localStorage.setItem("loggedInUser", JSON.stringify({ username: account.username }));

  
      setTimeout(() => {
        window.location.href = "../bank/index.html"; 
      }, 1000);
    } else {
      if (password.length < 4) openAlert("Password must be at least 4 characters long.");
      else openAlert("Username or password is incorrect")
    }
  
    // Clear form inputs
    document.getElementById("login-username").value = "";
    document.getElementById("login-password").value = "";
  });



//////////////////////////////////////////////////////////////////////

  
regForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("register-username").value.trim();
  const password = document.getElementById("register-password").value;
  const chpwrd = document.getElementById("confirm-password").value;

  // Basic input validation
  if (!username || !password || !chpwrd) {
    showError("All fields are required.");
    return;
  }

  // Fetch existing accounts from localStorage or initialize with an empty array
  const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];

  // Check if username already exists
  const userExists = storedAccounts.some((acc) => acc.owner === username);

  if (userExists) {
    openAlert("Username already exists. Please choose a different one.");
    return;
  }

  if (username.length < 6 || username.length > 50) {
    openAlert("Username must contain at least 6 characters.");
    return;
  }

  // Password matching check
  if (password !== chpwrd) {
    openAlert("Passwords don't match, try again!");
    clearFormInputs();
    return;
  }

  // Password validation using if statements
  if (password.length < 4) {
    openAlert("Password must be at least 4 characters long.");
    clearFormInputs();
    return;
  }

  if (/\s/.test(password)) {
    openAlert("Password must not contain spaces.");
    clearFormInputs();
    return;
  }

  // If all checks pass, continue with account creation
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

  setTimeout(() => {
    window.location.href = "../Login-Registration/index.html";
  }, 1000);

  // Clear form inputs
  clearFormInputs();
});

// Function to clear form inputs
function clearFormInputs() {
  document.getElementById("register-username").value = "";
  document.getElementById("register-password").value = "";
  document.getElementById("confirm-password").value = "";
}




  // ALERT LOGIC

  function openAlert(message) {
    const button = document.getElementById("alert");
    const text = document.getElementById('alert-message')
    text.textContent = message
    button.classList.add("active");
    button.style.display = "block";
  
    setTimeout(() => {
      button.classList.remove("active");
      button.classList.add("hide");
      setTimeout(() => {
        button.style.display = "none";
        button.classList.remove("hide");
      }, 500);
    }, 5000);
  }