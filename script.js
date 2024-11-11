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
//Form validation
document.getElementById('myForm').addEventListener('submit', function(e) {
  e.preventDefault(); 

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const country = document.getElementById('country');
  const comment = document.getElementById('comment');
  const agreement = document.getElementById('agreement');

  const errorMessage = document.getElementById('error-message');
  errorMessage.innerHTML = '';  
  errorMessage.classList.remove('hidden')

  let valid = true;  

  if (name.value.trim() === '') {
    errorMessage.innerHTML += 'Name is required.<br>';
    valid = false;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email.value.trim())) {
    errorMessage.innerHTML += 'Please enter a valid email address.<br>';
    valid = false;
  }

  const phonePattern = /^[0-9]{10,}$/;
  if (!phonePattern.test(phone.value.trim())) {
    errorMessage.innerHTML += 'Phone number must be at least 10 digits long.<br>';
    valid = false;
  }

  if (country.value === 'Country') {
    errorMessage.innerHTML += 'Please select a country.<br>';
    valid = false;
  }

  if (!agreement.checked) {
    errorMessage.innerHTML += 'You must agree to the terms and conditions.<br>';
    valid = false;
  }

  if (valid) {
    errorMessage.innerHTML = 'Form submitted successfully!';
    name.value = ''
    email.value = ''
    phone.value = ''
    country.value = "Country"
    agreement.checked = false

    errorMessage.classList.remove('hidden')
  }
  setTimeout(function(){
    errorMessage.classList.add('hidden')
  }, 5000)
});

// BURGER MENU

document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = document.getElementById('burger-menu');
  const navLinksWrapper = document.getElementById('nav-links-wrapper');

  burgerMenu.addEventListener('click', () => {
    navLinksWrapper.classList.toggle('show');
  });
});



