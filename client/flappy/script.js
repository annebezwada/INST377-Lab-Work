document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const bird = document.querySelector('.bird');
  const gameDisplay = document.querySelector('.game-container');
  const ground = document.querySelector('.ground-moving');

  // Configuration
  const birdLeft = 220;
  let birdBottom = 100;
  const gravity = 3;
  let isGameOver = false;
  const gap = 430;
  const gameTimerId = setInterval(startGame, 20);

  // Add Event Listener
  document.addEventListener('keyup', control);

  // Start Game Function
  function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = `${birdBottom}px`;
    bird.style.left = `${birdLeft}px`;
  }

  // Handle Input
  function control(e) {
    // eslint-disable-next-line default-case
    switch (e.keyCode) {
      case 32: // Spacebar
      case 38: // Up arrow
        jump();
    }
  }

  // Jump bird
  function jump() {
    if (birdBottom < 480) {
      birdBottom += 50;
    }

    bird.style.bottom = `${birdBottom}px`;
  }

  // Create new obstacle
  function generateObstacle() {
    // Create div
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    let obLeft = 440;
    let obHeight = Math.random() * 250;
    obHeight = obHeight < 110 ? 110 : obHeight;
    let obstacleGone = 0;
    let newObstacle = 0;

    // Attributes
    div.classList.add('obstacle');
    div.style.left = `${obLeft}px`;
    div.style.bottom = '20%';
    div.style.height = `${obHeight}px`;
    div2.classList.add('topObstacle');
    div2.style.left = `${obLeft}px`;
    div2.style.top = '0px';
    div2.style.height = `${obHeight}px`;

    // Append
    gameDisplay.appendChild(div);
    gameDisplay.appendChild(div2);

    // Move generated obstacle
    setInterval(() => {
      if (!div || isGameOver) {
        return 0;
      }
      if (obLeft <= -60) {
        div.remove();
        div2.remove();
        obstacleGone = 1;
      }
      if (obstacleGone && !newObstacle) {
        generateObstacle();
        newObstacle = 1;
      }
      if (
        obLeft > 200
        && obLeft < 280
        && birdLeft === 220
        && birdBottom < obHeight
      ) {
        gameOver();
      }
      if (
        obLeft > 200
        && obLeft < 280
        && birdLeft === 220
        && birdBottom > obHeight + gap
      ) {
        gameOver();
      }
      if (birdBottom === 0) {
        gameOver();
      }

      obLeft -= 1.5;
      div.style.left = `${obLeft}px`;
      div2.style.left = `${obLeft}px`;
    }, 20);
  }
  generateObstacle();

  // Manage game over
  function gameOver() {
    clearInterval(gameTimerId);
    isGameOver = true;
    document.removeEventListener('keyup', control);
  }
});
