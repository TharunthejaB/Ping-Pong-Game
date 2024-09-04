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
const playerDetailsModal = document.querySelector(".player-details-modal");

// Start button function 
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
    setTimeout(()=>{
        playerDetailsModal.style.opacity= 1;
        playerDetailsModal.style.visibility= 'visible';
        gameArea.style.backdropFilter = "blur(20px)";
    }, 1400)
}
// Start button reverse function
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
// Responsive Hamburger menu
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



// Canvas code
document.addEventListener('DOMContentLoaded', function() {
    var c = document.getElementById('myCanvas');
    var ctx = c.getContext('2d');
    c.style.background = 'rgba(255, 255, 255, 0.12)';
    c.style.backdropFilter = 'blur(18.899999618530273px)';
    c.style.borderRadius = '30px';
    c.style.border = "1px solid rgba(255, 255, 255, 0.10)"
    var container = document.querySelector('.canvas-container');
    c.width = container.clientWidth;
    c.height = container.clientHeight;
    let canvasWidth = c.width;
    let canvasHeight = c.height;
    let paddle1 = {
        x : 20,
        y : 20,
    }
    let paddle2 = {
        x : canvasWidth - 60,
        y : canvasHeight - 210,
    };

    // Paddle1
    ctx.beginPath();
    ctx.fillStyle = '#4D94AA';
    ctx.roundRect(paddle1.x,paddle1.y,35,190,[40]);
    ctx.fill();
    // Paddle2
    ctx.beginPath();
    ctx.fillStyle = '#7451BF';
    ctx.roundRect(paddle2.x,paddle2.y,35,190,[40]);
    ctx.fill();

    // Middle line
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.moveTo(canvasWidth/2,0);
    ctx.lineTo(canvasWidth/2,canvasHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.arc(canvasWidth/2,canvasHeight/2,60,0,6*Math.PI);
    ctx.stroke();

    //Play ball
    ctx.beginPath();
    ctx.arc(canvasWidth/2,canvasHeight/2,20,0,2*Math.PI);
    ctx.fillStyle = "#F26464";
    ctx.fill();

});