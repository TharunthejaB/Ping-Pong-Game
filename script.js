const mainHome = document.querySelector(".intro-text");
const mainText = document.querySelector(".intro-text h1");
const gameLink = document.querySelector(".game-link");
const startButton = document.getElementById("start");

function startFunction (){
    mainHome.style.top = "-198px";
    mainText.style.fontSize = "24px";
    setTimeout(()=>{
        mainHome.style.display = "none";
        gameLink.style.visibility = "visible"
    },700)
}