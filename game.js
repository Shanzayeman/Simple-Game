const gameArea = document.querySelector('.game-area');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');

let playerPosX = 50; // Player position in percentage
let gameSpeed = 2000; // Speed of obstacle falling in milliseconds
let score = 0;
let gameInterval;
let isGameOver = false;

// Move the player
document.addEventListener('keydown', (e) => {
    if (isGameOver) return;

    if (e.key === 'ArrowLeft' && playerPosX > 0) {
        playerPosX -= 5; // Move left by 5%
    } else if (e.key === 'ArrowRight' && playerPosX < 95) {
        playerPosX += 5; // Move right by 5%
    }
    player.style.left = playerPosX + '%';
});

// Create obstacles at intervals
function createObstacle() {
    if (isGameOver) return;

    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = Math.random() * 90 + '%';
    obstacle.style.top = '0px';
    gameArea.appendChild(obstacle);

    // Move the obstacle down
    let fallInterval = setInterval(() => {
        let obstacleTop = parseInt(window.getComputedStyle(obstacle).top);
        if (obstacleTop > window.innerHeight - 60) {
            clearInterval(fallInterval);
            gameArea.removeChild(obstacle);
            score++;
            scoreDisplay.textContent = 'Score: ' + score;
        } else {
            obstacle.style.top = obstacleTop + 5 + 'px';

            // Check for collision
            let obstacleRect = obstacle.getBoundingClientRect();
            let playerRect = player.getBoundingClientRect();
            if (
                obstacleRect.left < playerRect.right &&
                obstacleRect.right > playerRect.left &&
                obstacleRect.bottom > playerRect.top &&
                obstacleRect.top < playerRect.bottom
            ) {
                gameOver();
            }
        }
    }, 20);
}

// Start the game
function startGame() {
    score = 0;
    isGameOver = false;
    playerPosX = 50;
    player.style.left = playerPosX + '%';
    scoreDisplay.textContent = 'Score: ' + score;

    gameInterval = setInterval(createObstacle, gameSpeed);
}

// End the game
function gameOver() {
    isGameOver = true;
    clearInterval(gameInterval);
    alert('Game Over! Final Score: ' + score);
    // Restart the game after a delay
    setTimeout(startGame, 1000);
}

// Initialize the game
startGame();
