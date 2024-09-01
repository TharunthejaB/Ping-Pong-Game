const mainHome = document.querySelector(".main-home");
const mainTextBox = document.querySelector(".intro-text");
const mainText = document.querySelector(".intro-text h1");
const gameLink = document.querySelector(".game-link");
const hamBurgerMenu = document.querySelector(".hamburger-menu");
const startButton = document.getElementById("start");
const hamBurger = document.getElementById("hamburger-icon");
const menu = document.getElementById('hamburger-icon');
const lines = document.querySelectorAll('.not-active');
const gameArea = document.querySelector(".game-area");
const musicButton = document.querySelector(".music img");


function startFunction (){
    mainTextBox.style.top = "-600px";
    mainText.style.fontSize = "24px";
    startButton.style.bottom = "-800px"
    setTimeout(()=>{
        mainHome.style.display = "none";
        gameLink.style.opacity = 1;
    },700)
    setTimeout(()=>{
        gameArea.style.opacity = 1;
    },900)
}

function revStartFunction (){
    gameArea.style.opacity = 0;
    setTimeout(()=>{
        mainHome.style.display = "flex";
        gameLink.style.opacity = 0;
    },700)
    setTimeout(()=>{
        mainTextBox.style.top = "0px";
        mainText.style.fontSize = "96px";
        startButton.style.bottom = "0px";
    },900)
}

function hamburger(){
    const currentRight = window.getComputedStyle(hamBurgerMenu).right;
    if (currentRight === '0px') {
        hamBurgerMenu.style.right = "-500px"; 
    } else {
        hamBurgerMenu.style.right = "0"; 
    }
}

menu.addEventListener('click', ()=>{
	menu.classList.toggle('active');
	lines.forEach((line)=>{
		line.classList.remove('not-active');
	})
})

hamBurger.addEventListener('click',hamburger)