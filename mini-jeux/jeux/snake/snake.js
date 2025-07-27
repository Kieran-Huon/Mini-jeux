const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 5, y: 5 };
let score = 0;
let speed = 120;
let gameOver = false;

document.addEventListener("keydown", handleKey);
restartBtn.addEventListener("click", restartGame);

function gameLoop() {
  if (gameOver) return;

  let head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  // Traversée des bords
  head.x = (head.x + tileCount) % tileCount;
  head.y = (head.y + tileCount) % tileCount;

  // Collision avec soi-même
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return endGame();
    }
  }

  snake.unshift(head);

  // Manger la pomme
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.textContent = score;
    placeFood();

    // Augmenter la vitesse tous les 5 points
    if (score % 5 === 0 && speed > 40) {
      speed -= 10;
    }
  } else {
    snake.pop();
  }

  // Fond
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Serpent
  ctx.fillStyle = "#00b894";
  for (let part of snake) {
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
  }

  // Pomme
  ctx.fillStyle = "#e74c3c";
  ctx.beginPath();
  ctx.arc(
    food.x * gridSize + gridSize / 2,
    food.y * gridSize + gridSize / 2,
    gridSize / 2.5,
    0,
    Math.PI * 2
  );
  ctx.fill();

  setTimeout(gameLoop, speed);
}

function handleKey(e) {
  switch (e.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
}

function placeFood() {
  food.x = Math.floor(Math.random() * tileCount);
  food.y = Math.floor(Math.random() * tileCount);
}

function endGame() {
  gameOver = true;
  restartBtn.style.display = "inline-block";
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.font = "24px Poppins";
  ctx.fillText("💀 Game Over !", canvas.width / 2 - 80, canvas.height / 2);
}

function restartGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  food = { x: 5, y: 5 };
  score = 0;
  speed = 120;
  gameOver = false;
  scoreEl.textContent = score;
  restartBtn.style.display = "none";
  gameLoop();
}

gameLoop();
