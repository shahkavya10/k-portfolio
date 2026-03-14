/* TYPING ANIMATION */

const textArray = [
"Aspiring Frontend Developer",
"B.Com + Tech Enthusiast",
"Learning Python & SQL",
"Building Modern Web Interfaces"
];

let index = 0;
let charIndex = 0;

const typingElement = document.getElementById("typing-text");

if (typingElement) {
  type();
}

function type() {

if(charIndex < textArray[index].length){

typingElement.textContent += textArray[index].charAt(charIndex);
charIndex++;

setTimeout(type,70);

}else{

setTimeout(erase,1500);

}

}

function erase(){

if(charIndex > 0){

typingElement.textContent =
textArray[index].substring(0,charIndex-1);

charIndex--;

setTimeout(erase,40);

}else{

index++;

if(index >= textArray.length) index = 0;

setTimeout(type,500);

}

}

type();



/* SCROLL REVEAL */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){

reveals.forEach(el => {

const windowHeight = window.innerHeight;
const elementTop = el.getBoundingClientRect().top;

if(elementTop < windowHeight - 80){
el.classList.add("active");
}

});

}

window.addEventListener("scroll", revealOnScroll);

/* SCROLL PROGRESS */

window.addEventListener("scroll", () => {

const scrollTop = document.documentElement.scrollTop;
const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

const progress = (scrollTop / scrollHeight) * 100;

document.getElementById("progress-bar").style.width = progress + "%";

});

particlesJS("particles-js", {

particles: {

number: { value: 80 },

size: { value: 3 },

move: { speed: 1 },

line_linked: {
enable: true,
distance: 150,
color: "#ffffff",
opacity: 0.2,
width: 1
}

},

interactivity: {

events: {
onhover: { enable: true, mode: "repulse" }
}

}

});