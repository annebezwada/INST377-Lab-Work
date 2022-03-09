// Global configuration
const gameHeight = 600;
let isGameOver = false;
let isJumping, isGoingRight, isGoingLeft = false;
let leftTimer, rightTimer = null;
let score = 0;

// DOM Event Listeners
document.addEventListener("DOMContentLoaded", (e) => {
  // Elements
  const grid = document.querySelector('.grid');

  start(grid);
});

function controlInput(e, doodler) {
    switch (e.key) {
      case "ArrowRight":
        moveRight(e, doodler);
        break;
      case "ArrowUp":
      case "Space":
        moveStraight(doodler);
        break;
      case "ArrowLeft":
        moveLeft(e, doodler);
        break;
    }
  }
  
  function moveStraight(doodler) {
    isGoingLeft = false;
    isGoingRight = false;
    clearInterval(leftTimer);
    clearInterval(rightTimer);
  }
  
  function moveLeft(e, doodler) {
    isGoingLeft = true;
    clearInterval(rightTimer);
    leftTimer = setInterval(() => {
      const left = parseInt(doodler.style.left.replace("px", "")) - 5;
      if (left <= -5) {
        isGoingLeft = false;
        clearInterval(leftTimer);
      } else {
        doodler.style.left = left + "px";
      }
    }, 20);
  }
  
  function moveRight(e, doodler) {
    isGoingRight = true;
    clearInterval(leftTimer);
    rightTimer = setInterval(() => {
      const left = parseInt(doodler.style.left.replace("px", "")) + 5;
      if (left >= 335) {
        isGoingRight = false;
        clearInterval(rightTimer);
      } else {
        doodler.style.left = left + "px";
      }
    }, 20);
  }
  
  
  function start(grid) {
    // Check game status
    if (isGameOver) {
      return false;
    }
  
    // Start game
    let doodler = createDoodler(grid);
    let platforms = createPlatforms(grid, 5);
    let jumpInterval = jump(doodler, platforms);
    let moveInterval = setInterval(() => { movePlatforms(platforms, doodler, grid); }, 30);
    let controlListener = document.addEventListener("keyup", (event) => {
      controlInput(event, doodler);
    });
  }
  

  function end() {
    alert("Game Over");
    isGameover = true;
    document.querySelector('.grid').innerHTML = `<h1>${score}</h1>`;
  }
  

  function jump(doodler, platforms) {
    let interval = setInterval(() => {
      if (isGameOver) { return; }
  
      // Variables
      const bottom = parseInt(doodler.style.bottom.replace("px", "")) + 20;
  
      // Move doodler up
      doodler.style.bottom = bottom + "px";
  
      // Move doodler down
      if (bottom > 380) {
        clearInterval(interval);
        fall(doodler, platforms);
      }
    }, 30);
  
    // Return ID
    return interval;
  }
  
  
   */
  function fall(doodler, platforms) {
    let interval = setInterval(() => {
      if (isGameOver) { return; }
  
      // Variables
      const bottom = parseInt(doodler.style.bottom.replace("px", "")) - 5;
      const left = parseInt(doodler.style.left.replace("px", ""));
  
      // Move doodler down
      doodler.style.bottom = bottom + "px";
  
      // Move doodler down
      if (bottom <= -5) {
        clearInterval(interval);
        end();
      }
      platforms.forEach((p) => {
        if (isJumping) {
          return;
        }
        if (p.bottom >= bottom && bottom <= p.bottom + 15 && left + 60 >= p.left && left <= p.left + 85) {
          clearInterval(interval);
          jump(doodler, platforms);
          score++;
        }
      });
    }, 30);
  
    // Return ID
    return interval;
  }
  
  
  function createDoodler(grid) {
    // Checks
    if (!grid) return null;
  
    // Element
    const div = document.createElement('div');
  
    // Attributes
    div.classList.add('doodler');
    div.style.left = "50px";
    div.style.bottom = "150px";
  
    // Insert element
    grid.appendChild(div);
  
    // Return handle
    return div;
  }
  
  /**
   * Create N platforms for the game
   *
   * @param {DomElement} game container
   * @param {int} number of platforms
   * @author Alec M. <https://amattu.com>
   * @date 2021-09-29T08:40:35-040
   */
  function createPlatforms(grid, count = 5) {
    // Checks
    if (!grid) return false;
  
    // Variables
    let platforms = [];
    let gap = gameHeight / count;
  
    // Create N platforms
    for (let i = 0; i < count; i++) {
      // Variables
      let bottom = 100 + (i * gap);
      platforms.push(new Platform(grid, bottom));
    }
  
    // Return platforms variable
    return platforms;
  }
  
  function movePlatforms(platforms, doodler, grid) {
    // Checks
    if (!platforms || !(platforms instanceof Array)) {
      return false;
    }
    if (!doodler || parseInt(doodler.style.bottom.replace("px", "")) <= 200) {
      return false;
    }
  
    // Move platforms
    platforms.forEach((p) => {
      p.bottom -= 5;
      p.div.style.bottom = p.bottom + "px";
  
      if (p.bottom < 10) {
        platforms[0].div.remove();
        platforms.shift();
        platforms.push(new Platform(grid, 600));
      }
    });
  }
  

//Game platform encapsulator
   
  class Platform {

    constructor(parent, bottom) {
      // Class attributes
      this.bottom = bottom;
      this.left = Math.random() * 315;
      this.div = document.createElement('div');
  
      // Style element
      this.div.classList.add('platform');
      this.div.style.left = this.left + "px";
      this.div.style.bottom = this.bottom + "px";
  
      // Append to parent
      parent.appendChild(this.div);
    }
  }
  
  class Doodler {
  
  }