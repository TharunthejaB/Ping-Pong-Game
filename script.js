const mainHome = document.querySelector(".main-home");
const mainContent = document.querySelector(".main-content");
const mainTextBox = document.querySelector(".intro-text");
let audio = new Audio("./bg.mp3");
let effect = new Audio("./HitEffect.mp3");
let wallHitEffect = new Audio("./wallHitEffect.wav");
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
const instructionsModal = document.querySelector(".instruction-modal");
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
const sounds= document.querySelector(".sounds");
const music= document.querySelector(".music");
var paddle1Color = '#4D94AA';
var paddle2Color = '#7451BF';
var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');
var container = document.querySelector('.canvas-container');
c.width = container.clientWidth;
c.height = container.clientHeight;
let pauseStatus = 0;
let playStatus = 0;
let resetStatus = 0;
let canvasWidth = c.width;
let canvasHeight = c.height;
let interval;
let ballspeed = null;
let ball_x;
let ball_y;
let ballxdirection;
let ballydirection;
let player1score = 0;
let player2score = 0;
let paddle1 = {
    x : 20,
    y : 20,
}
let paddle2 = {
    x : canvasWidth - 60,
    y : canvasHeight - 210,
};
let paddleUp1;
let paddleDown1;
let paddleUp2;
let paddleDown2;
wallHitEffect.volume = 0.15;
let status = 0;



// Start button function 
function startFunction (){
    mainTextBox.style.top = "-600px";
    mainText.style.fontSize = "24px";
    startButton.style.bottom = "-800px"
    audio.play();
    audio.volume = 0.1;
    audio.loop = true;
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
        player1Name.innerHTML = "Player 1";
        player2Name.innerHTML = "Player 2";
        resetButton();
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
        playerDetailsModal.style.opacity= 0;
        playerDetailsModal.style.visibility= 'hidden';
        mainContent.style.filter = 'blur(0px)';
        document.querySelector('.transparent-bg').style.visibility = "hidden";
        player1Input.value = "";
        player2Input.value = "";
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
    if(playStatus==0){
    playStatus = 1;
    resetStatus = 0;
    countDown.style.opacity = 1;
    countDown.style.visibility = 'visible';
    mainContent.style.filter = 'blur(10px) brightness(0.5)';
    document.querySelector('.transparent-bg').style.visibility = "visible";
    setTimeout(()=>{
        let remainingTime = 3;
            function updateCountdown() {
                if (remainingTime <= 0) {
                    countDownText.innerHTML = '0';
                    clearInterval(intervalId);
                    mainContent.style.filter = 'blur(0px) brightness(1)';
                    countDown.style.opacity = 0;
                    countDown.style.visibility = 'hidden';
                    document.querySelector('.transparent-bg').style.visibility = "hidden";

                    return;
                }
                countDownText.innerHTML = remainingTime;
                remainingTime--;
            }
            const intervalId = setInterval(updateCountdown, 1000);
            updateCountdown();
    },500);
    setTimeout(()=>{
        createBall();
        nextStep();
    }, 4500)}
    else if(playStatus == 1 && pauseStatus == 1 || resetStatus == 1){
        createBall();
        nextStep();
        pauseStatus = 0;
    }
    window.addEventListener("keydown",changeDirection);
}
//pauseButton
function pauseButton(){
    if(resetStatus==0){
    ballspeed = 0;
    x = ball_x;
    y = ball_y;
    pauseStatus = 1;
    clearInterval(interval);
    drawBall(x,y);
    }
}

//ResetButton
function resetButton(){
    playStatus = 0;
    pauseStatus = 0;
    resetStatus = 1;
    player1score = 0;
    player2score = 0;
    document.querySelector(".score-1").innerHTML = 0;
    document.querySelector(".score-2").innerHTML = 0;
    clearInterval(interval);
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    paddle1 = {
        x : 20,
        y : 20,
    }
    paddle2 = {
        x : canvasWidth - 60,
        y : canvasHeight - 210,
    };
    middleLine();
    drawPaddle();
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
function createBall(){
    ballspeed = 3;
    if(Math.round(Math.random()) == 1){
        ballxdirection = 1;
    }
    else{
        ballxdirection = -1;
    }
    if(Math.round(Math.random())== 1){
        ballydirection = 1;
    }
    else{
        ballydirection = -1;
    }
    ball_x = canvasWidth/2;
    ball_y = canvasHeight/2;
    drawBall(ball_x,ball_y);
}
function moveBall(){
    ball_x += ballspeed * ballxdirection;
    ball_y += ballspeed * ballydirection;
}
function drawBall(ball_x,ball_y){
    ctx.beginPath();
    ctx.arc(ball_x,ball_y,20,0,2*Math.PI);
    ctx.fillStyle = "#F26464";
    ctx.fill();
}
function collision(){
    if(ball_y <= 10){
        wallHitEffect.play();
        ballydirection *= -1;
    }
    if(ball_y >= canvasHeight-10){
        wallHitEffect.play();
        ballydirection *= -1;
    }
    if(ball_x < 0){
        player2score += 1;
        document.querySelector(".score-2").innerHTML = player2score;
        createBall();
        return;
    }
    if(ball_x > canvasWidth){
        player1score += 1;
        document.querySelector(".score-1").innerHTML = player1score;
        createBall();
        return;
    }
    if(ball_x <= (paddle1.x+45)){
        if(ball_y > paddle1.y && ball_y < paddle1.y+190){
           
            effect.play();
            ball_x = (paddle1.x+45);
            ballxdirection *= -1;
            ballspeed += 0.5; 
        }
    }
    if(ball_x > (paddle2.x-20)){
        if(ball_y > paddle2.y && ball_y < paddle2.y+190){
    
            effect.play();
            ball_x = (paddle2.x-20)
            ballxdirection *= -1;
            ballspeed += 0.5; 

        }
    }
}
function nextStep(){
    interval = setTimeout(()=>{
        clearBoard();
        middleLine();
        drawPaddle();
        moveBall();
        drawBall(ball_x,ball_y);
        collision();
        nextStep();
    }, 10)
}

function clearBoard(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}


function changeDirection(event) {
    const key = event.keyCode;
    const paddleUp1 = 87; // W key
    const paddleDown1 = 83; // S key
    const paddleUp2 = 38; // Up arrow
    const paddleDown2 = 40; // Down arrow
    const p = 80;
    const n = 78;
    const m = 77;
    switch(key){
        case paddleUp1:
            if(paddle1.y > 0){
                paddle1.y -= 25;
            }
            break;
        case paddleDown1:
            if(paddle1.y <= canvasHeight - 190){
                paddle1.y += 25;
            }
            break;
        case paddleUp2:
            if(paddle2.y > 0){
                paddle2.y -= 25;
            }
            break;
        case paddleDown2:
            if(paddle2.y < canvasHeight - 190){
                paddle2.y += 25;
            }
            break;
        case p:
            if(status == 0){
                pauseButton();
                status = 1;
            }
            else{
                playButton();
                status = 0;
            }
        break;
        case n:
            toggleSound();
        break;
        case m:
            toggleMusic();
        break;
    }
    drawPaddle(); // Make sure the paddles are redrawn
}


function helpButton(){
    pauseButton();
    instructionsModal.style.opacity= 1;
    instructionsModal.style.visibility= 'visible';
    mainContent.style.filter = 'blur(10px)';
    document.querySelector('.transparent-bg').style.visibility = "visible";
}
function closeHelpButton(){
    instructionsModal.style.opacity= 0;
    instructionsModal.style.visibility= 'hidden';
    mainContent.style.filter = 'blur(0px)';
    document.querySelector('.transparent-bg').style.visibility = "hidden";
}
document.querySelector(".close-modal").addEventListener('click', ()=>{
    closeHelpButton();
})
// Canvas code
    document.addEventListener('DOMContentLoaded', function() {
   
    c.style.background = 'rgba(255, 255, 255, 0.12)';
    c.style.backdropFilter = 'blur(18.899999618530273px)';
    c.style.borderRadius = '30px';
    c.style.border = "1px solid rgba(255, 255, 255, 0.10)"
    middleLine();
    // playBall();
});
function toggleSound(){

        var image = document.getElementById('sounds');

        var currentSrc = image.getAttribute('src');
        
        if (currentSrc.endsWith('volume-high-solid.svg')) {
            image.setAttribute('src', './volume-min-svgrepo-com.svg');
            effect.volume = 0;
            wallHitEffect.volume = 0;
        }
        else{
            image.setAttribute('src', './volume-high-solid.svg');
            effect.volume = 1;
            wallHitEffect.volume = 0.15;
        }
}
function toggleMusic(){
    var image = document.getElementById('music');
    var currentSrc = image.getAttribute('src');
    if (currentSrc.endsWith('music-note-svgrepo-com.svg')) {
        image.setAttribute('src', './music-note-svgrepo-com2.svg'); 
        audio.pause();
    } else {
        image.setAttribute('src', './music-note-svgrepo-com.svg'); 
        audio.play();
    }
}
sounds.addEventListener('click', toggleSound);
music.addEventListener('click', toggleMusic);
