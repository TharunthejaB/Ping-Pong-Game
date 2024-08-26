const mainHome = document.querySelector(".intro-text");
const mainText = document.querySelector(".intro-text h1");
const gameLink = document.querySelector(".game-link");
const hamBurgerMenu = document.querySelector(".hamburger-menu");
const startButton = document.getElementById("start");
const hamBurger = document.getElementById("hamburger-icon");

function startFunction (){
    mainHome.style.top = "-600px";
    mainText.style.fontSize = "24px";
    startButton.style.bottom = "-800px"
    setTimeout(()=>{
        mainHome.style.display = "none";
        gameLink.style.opacity = 1;
    },700)
}

function hamburger(){
    const currentRight = window.getComputedStyle(hamBurgerMenu).right;
    if (currentRight === '0px') {
        hamBurgerMenu.style.right = "-500px"; 
    } else {
        hamBurgerMenu.style.right = "0"; 
    }
}

hamBurger.addEventListener('click',hamburger)