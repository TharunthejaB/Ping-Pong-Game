window.onload = function(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    let audio = new Audio("hiteffect.m4a");
    var resetButton = document.getElementById("resetButton");
    var pauseButton = document.getElementById("pauseButton");
    var startButton = document.getElementById("startButton");
    var helpButton = document.getElementById("helpButton")
    var modal = document.getElementById("myModal");
    let score = document.getElementById("score");
    let player1name = document.getElementById("player1");
    let player2name = document.getElementById("player2");
    var span = document.getElementsByClassName("close")[0];
    var canvasHeight = c.height;
    var canvasWidth = c.width;
    let player1 = 0;
    let player2 = 0;
    let paddleUp1;
    let paddleDown1;
    let paddleUp2;
    let paddleDown2;
    let interval;
    let ballspeed = null;
    let ball_x;
    let ball_y;
    let ballxdirection;
    let ballydirection;
   
    let paddle1 = {
        x: 10,
        y: 0,
        color: "white"
    };
    let paddle2 = {
        x : canvasWidth-35,
        y: canvasHeight-90,
        color: "#9debc6"
    };

    window.addEventListener("keydown",changeDirection);
    resetButton.addEventListener("click",resetbutton);
    pauseButton.addEventListener("click",pausebutton);
    startButton.addEventListener("click",gameStart);

    drawPaddle();
    middleLine();
    //gameStart();

    function middleLine(){
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.moveTo(canvasWidth/2,0);
        ctx.lineTo(canvasWidth/2,canvasHeight);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.arc(canvasWidth/2,canvasHeight/2,15,0,2*Math.PI);
        ctx.stroke();

    }

    function gameStart(){
        createBall();
        nextStep();
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
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,canvasWidth,canvasWidth);
    }
    function createBall(){
        ballspeed = 2.25;
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
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.arc(ball_x,ball_y,10,0,2*Math.PI);
        ctx.fillStyle = "red";
        ctx.stroke();
        ctx.fill();
    }
    function collision(){
        if(ball_y <= 10){
            ballydirection *= -1;
        }
        if(ball_y >= canvasHeight-10){
            ballydirection *= -1;
        }
        if(ball_x < 0){
            player2 += 1;
            scoreUpdate();
            createBall();
            return;
        }
        if(ball_x > canvasWidth){
            player1 += 1;
            scoreUpdate();
            createBall();
            return;
        }
        if(ball_x <= (paddle1.x+35)){
            if(ball_y > paddle1.y && ball_y < paddle1.y+90){
                ball_x = (paddle1.x+35);
                ballxdirection *= -1;
                audio.play();
            }
        }
        if(ball_x > (paddle2.x-10)){
            if(ball_y > paddle2.y && ball_y < paddle2.y+90){
                ball_x = (paddle2.x-10)
                ballxdirection *= -1;
                audio.play();
            }
        }
    }

    function drawPaddle(){
        ctx.beginPath();
        ctx.fillStyle = paddle1.color;
        ctx.roundRect(paddle1.x,paddle1.y,25,90,[40]);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = paddle2.color;
        ctx.roundRect(paddle2.x,paddle2.y,25,90,[40]);
        ctx.fill();
        ctx.stroke();
    }

    function changeDirection(event){
        const key = event.keyCode;
        paddleUp1 = 87;
        paddleDown1= 83;
        paddleUp2 = 38;
        paddleDown2= 40;

        console.log(key);
        switch(key){
            case paddleUp1:
                if(paddle1.y>0){
                    paddle1.y -= 25;
                }
            break;
            case paddleDown1:
                if(paddle1.y <= canvasHeight-90){
                    paddle1.y += 25;
                }
            break;
            case paddleUp2:
                if(paddle2.y > 0){
                    paddle2.y -= 25;
                }
            break;
            case paddleDown2:
                if(paddle2.y < canvasHeight-90){
                    paddle2.y += 25;
                }
            break;
        };
    }

    function scoreUpdate(){
        score.textContent = `${player1}:${player2}`;
    }

    function resetbutton(){
        player1 = 0;
        player2 = 0;
        ballspeed = 2.25;
        paddle1 = {
            x: 10,
            y: 0,
            color: "white"
        };
        paddle2 = {
            x : canvasWidth-35,
            y: canvasHeight-90,
            color: "#9debc6"
        };
        scoreUpdate();
        clearInterval(interval);
        gameStart();
    }
    function pausebutton(){
        ballspeed = 0;
        x = ball_x;
        y = ball_y;
        clearInterval(interval);
        drawBall(x,y);
    }

    helpButton.onclick = function() {
        modal.style.display = "block";
    }
    span.onclick = function() {
        modal.style.display = "none";
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }}
}
