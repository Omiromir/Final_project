"use strict";

// Modal elements
const modal = document.querySelector(".modal");
const btn_modal = document.querySelector('#btn__modal');
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");


// Navigation elements
const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".nav__links");

//////////////////////////////////////////////////////////////
// Modal open/close functions
const openModal = function (e) {
  modal?.classList.remove("hidden");
  overlay?.classList.remove("hidden");
};

const closeModal = function () {
  modal?.classList.add("hidden");
  overlay?.classList.add("hidden");
};

// Open modal on button click
window.addEventListener("load", () => {
  if (!localStorage.getItem("modalOpened")) {
    openModal();
    // Set a flag in localStorage so it won't open again
    localStorage.setItem("modalOpened", "true");
}
});
btnCloseModal?.addEventListener("click", closeModal);
overlay?.addEventListener("click", closeModal);

// Close modal on "Escape" key press
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal && !modal.classList.contains("hidden")) {
    closeModal();
  }
});


////////////////////////////////////////////////
// Sticky navigation: Intersection Observer
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

////////////////////////////////////
// Reveal sections on scroll
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

////////////////////////////////
// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

////////////////////////////////////
// Status popup

const toast = document.querySelector(".toast"),
  closeIcon = document.querySelector(".close"),
  progress = document.querySelector(".progress"),
  formBtn = document.querySelector(".form-btn"),
  root = document.documentElement;

let statText = document.getElementById('toast__text--1'),
    descrText = document.getElementById('toast__text--2');


let timer1, timer2;

function setToastProgressColor(color) {
  root.style.setProperty('--toast-progress-bg', color);
  statText.style.color = color
}

function showToast(status, message) {
  statText.textContent = status
  descrText.textContent = message

  toast.classList.add("active");
  progress.classList.add("active");

  formBtn.classList.add("disabled");


  timer1 = setTimeout(() => {
    toast.classList.remove("active");

    formBtn.classList.remove("disabled");
  }, 5000); // 1s = 1000 milliseconds

  timer2 = setTimeout(() => {
    progress.classList.remove("active");
  }, 5300);
}

function closeToast() {
  toast.classList.remove("active");

  setTimeout(() => {
    progress.classList.remove("active");
  }, 300);

  clearTimeout(timer1);
  clearTimeout(timer2);
}


//Form validation
document.getElementById('myForm').addEventListener('submit', function(e) {
  e.preventDefault(); 

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const country = document.getElementById('country');
  const agreement = document.getElementById('agreement');
  
  // Function to handle validation errors
  function showError(message) {
    setToastProgressColor("#ff3d27");
    showToast("Error", message);
  }

  // 1. Name Validation (Alphabetic and minimum length)
  const nameValue = name.value.trim();
  if (nameValue === '') {
    showError("Name is required.");
    return;
  }
  if (!/^[a-zA-Z\s]+$/.test(nameValue)) {
    showError("Name must contain only letters and spaces.");
    return;
  }
  

  // 2. Email Validation (Format and domain check)
  const emailValue = email.value.trim();
  if (emailValue === '') {
    showError("Email is required.");
    return;
  }
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(emailValue)) {
    showError("Please enter a valid email address.");
    return;
  }

   // 3. Phone Number Validation
   const phoneValue = phone.value.trim();
   const phonenoPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
   
   if (!phonenoPattern.test(phoneValue)) {
     showError("Please enter a valid phone number in the format 123-456-7890, 123.456.7890, or 123 456 7890.");
     return;
   }

  // 4. Country Selection Validation (Ensure a country is selected)
  const countryValue = country.value;
  if (countryValue === 'Country' || countryValue === '') {
    showError("Please select a country from the list.");
    return;
  }

  // 5. Agreement Checkbox Validation
  if (!agreement.checked) {
    showError("You must agree to the terms and conditions before submitting.");
    return;
  }

  // If all validations pass, show success message
  setToastProgressColor("#27ff4f");
  showToast("Success", "Form submitted successfully!");

  // Reset form fields after submission
  name.value = '';
  email.value = '';
  phone.value = '';
  country.value = "Country";
  agreement.checked = false;
});




// BURGER MENU

document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = document.getElementById('burger-menu');
  const navLinksWrapper = document.getElementById('nav-links-wrapper');

  burgerMenu.addEventListener('click', () => {
    navLinksWrapper.classList.toggle('show');
  });
});



// Dark and  ligth mode 

const themeToggler = document.getElementById('theme-toggler');

window.onload = () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark-mode');
  }
};

themeToggler.addEventListener('click', () => {
  const isDarkMode = document.documentElement.classList.toggle('dark-mode');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});