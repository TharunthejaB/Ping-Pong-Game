const mainHome = document.querySelector(".main-home");
const mainContent = document.querySelector(".main-content");
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
const player1Input = document.querySelector("#player1");
const player2Input = document.querySelector("#player2");
const player1Name = document.querySelector(".player1-name p");
const player2Name = document.querySelector(".player2-name p");
const warningMessage1 = document.querySelector("#warning1");
const warningMessage2 = document.querySelector("#warning2");
const color1= document.querySelector("#color1");
const color2= document.querySelector("#color2");
const countDown= document.querySelector(".countdown");
const countDownText= document.querySelector(".countdown p");
var paddle1Color = '#4D94AA';
var paddle2Color = '#7451BF';
var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');
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
        mainContent.style.filter = 'blur(10px)';
        document.querySelector('.transparent-bg').style.visibility = "visible";
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

//PLayerDetails Modal
function submitButton(){
    if(player1Input.value.trim()=="" && player2Input.value.trim()==""){
        warningMessage1.style.display="block";
        warningMessage2.style.display="block";
    }
    else if(player1Input.value.trim()==""){
        warningMessage1.style.display="block";
    }
    else if(player2Input.value.trim()==""){
        warningMessage2.style.display="block";
    }
    else{
        player1Name.innerHTML = player1Input.value;
        player2Name.innerHTML = player2Input.value;
        paddle1Color = color1.value;
        paddle2Color = color2.value;
        drawPaddle();
        setTimeout(()=>{
            playerDetailsModal.style.opacity= 0;
            playerDetailsModal.style.visibility= 'hidden';
            mainContent.style.filter = 'blur(0px)';
            document.querySelector('.transparent-bg').style.visibility = "hidden";
        },150)
    }
}
player1Input.addEventListener('focus', () => {
    warningMessage1.style.display='none';
});
player2Input.addEventListener('focus', () => {
    warningMessage2.style.display='none';
});

//PLayButton
function playButton(){
    countDown.style.opacity = 1;
    countDown.style.visibility = 'visible';
    mainContent.style.filter = 'blur(10px) brightness(0.5)';
    setTimeout(()=>{
        let remainingTime = 3;
            function updateCountdown() {
                if (remainingTime <= 0) {
                    countDownText.innerHTML = '0';
                    clearInterval(intervalId);
                    mainContent.style.filter = 'blur(0px) brightness(1)';
                    countDown.style.opacity = 0;
                    countDown.style.visibility = 'hidden';
                    return;
                }
                countDownText.innerHTML = remainingTime;
                remainingTime--;
            }
            const intervalId = setInterval(updateCountdown, 1000);
            updateCountdown();
    },500)
}

//DrawingPaddle
function drawPaddle(){// Paddle1
    ctx.beginPath();
    ctx.fillStyle = paddle1Color;
    ctx.roundRect(paddle1.x,paddle1.y,35,190,[40]);
    ctx.fill();
    // Paddle2
    ctx.beginPath();
    ctx.fillStyle = paddle2Color;
    ctx.roundRect(paddle2.x,paddle2.y,35,190,[40]);
    ctx.fill();
}

//DrawingMiddleLine
function middleLine(){
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
}

//DrawingPlayBall
function playBall(){
    ctx.beginPath();
    ctx.arc(canvasWidth/2,canvasHeight/2,20,0,2*Math.PI);
    ctx.fillStyle = "#F26464";
    ctx.fill();
}
// Canvas code
    document.addEventListener('DOMContentLoaded', function() {
   
    c.style.background = 'rgba(255, 255, 255, 0.12)';
    c.style.backdropFilter = 'blur(18.899999618530273px)';
    c.style.borderRadius = '30px';
    c.style.border = "1px solid rgba(255, 255, 255, 0.10)"
    drawPaddle(); 
    middleLine();
    playBall();
});