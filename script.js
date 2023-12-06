const gameScreen = document.getElementById("gameScreen");
const ctx = gameScreen.getContext("2d");
const scoreElement = document.getElementById("score");
const gameover = document.getElementById("gameover");
const highscoreElement = document.getElementById("highscore");
const restartButton = document.getElementById("restart");
const boardSize = document.getElementById("boardSize");

const units = prompt("Enter Board Size:");
const unitSize = gameScreen.width / units; //px
const snakeColor = "green";
const foodColor = "red";

boardSize.textContent = "Size: " + units;
let highscore = 0;
let score = 0;
let directionX = 1;
let directionY = 0;
let foodX = Math.floor(units / 2);
let foodY = Math.floor(units / 2);
let snake = [
    {x: 2, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 0},
];

let run = setInterval(render, 150);
window.addEventListener("keydown", changeDirection);
restartButton.addEventListener("click", () => {
    gameover.style.visibility = "hidden";
    score = 0;
    directionX = 1;
    directionY = 0;
    foodX = Math.floor(units / 2);
    foodY = Math.floor(units / 2);
    snake = [
        {x: 2, y: 0},
        {x: 1, y: 0},
        {x: 0, y: 0},
    ];
    run = setInterval(render, 200);
});

function render(){
    ctx.clearRect(0, 0, gameScreen.width, gameScreen.height);
    updateSnake();
    updateFood();
    checkGameOver();
    renderFood();
    renderSnake();
    scoreElement.textContent = "Score: " + score;
    if (score > highscore) highscore = score;
    highscoreElement.textContent = "High Score: " + highscore;
}
function renderFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX * unitSize, foodY * unitSize, unitSize, unitSize);
}
function renderSnake(){
    ctx.fillStyle = snakeColor;
    for (part of snake){
        ctx.fillRect(part.x * unitSize, part.y * unitSize, unitSize, unitSize);
    }
}
function updateSnake(){
    snake.unshift({x: snake[0].x + directionX, y: snake[0].y + directionY});
    snake.pop();
}
function changeDirection(event){
    switch (event.key){
        case "ArrowUp":
            if (snake[0].y - 1 == snake[1].y) break;
            directionY = -1;
            directionX = 0;
            break;
        case "ArrowDown":
            if (snake[0].y + 1 == snake[1].y) break;
            directionY = 1;
            directionX = 0;
            break;
        case "ArrowLeft":
            if (snake[0].x -1 == snake[1].x) break;
            directionY = 0;
            directionX = -1
            break;
        case "ArrowRight":
            if (snake[0].x + 1 == snake[1].x) break;
            directionY = 0;
            directionX = 1;
            break;
    }
}
function updateFood(){
    if (foodX != snake[0].x || foodY != snake[0].y) return;
    snake.push(snake[snake.length-1]);
    ++score;
    changeFood();
    function changeFood(){
        foodX = Math.floor(Math.random() * units);
        foodY = Math.floor(Math.random() * units);
        let valid = true;
        for (let part of snake){
            if (part.y == foodY && part.x == foodX){
                valid = false;
                break;
            }
        }
        if (!valid) changeFood();
    }
}
function checkGameOver(){
    let gameOver = false;
    if (snake[0].x >= units || snake[0].x < 0 || snake[0].y >= units || snake[0].y < 0){
        gameOver = true;
    }
    for (let i = 1; i < snake.length; ++i){
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            gameOver = true;
            break;
        }
    }
    if (gameOver){
        clearInterval(run);
        gameover.style.visibility = "visible";
    }
}
