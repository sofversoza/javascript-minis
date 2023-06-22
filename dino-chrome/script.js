import { updateGround, setupGround } from "./ground.js"
import { updateDino, setupDino } from "./dino.js"

const WORLD_WIDTH = 120
const WORLD_HEIGHT = 25
const SPEED_SCALE_INCREASE = 0.00001

// grab our elements
const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")

// function to scale our world based on how big/small our screen is
setPixelToWorldScale()
// anytime the pixel of the screen is resized, we update the world to the size we set
window.addEventListener("resize", setPixelToWorldScale)
// to start the game when a key is pressed the 1st time (runs only once)
document.addEventListener("keydown", handleStart, { once: true })

let lastTime
let speedScale
let score

// Update loop: runs every single frame & updates the position of everything on the screen
// takes in the time of when the program started
function update(time) {
  // by doing this first, delta is always going to be the right amount of time once we call this function the 2nd time (game actually starts)
  if (lastTime == null) {         // lastTime=0, first time we're on the screen
    lastTime = time               // update lastTime to be the current time
    window.requestAnimationFrame(update)   // 1st call to update
    return                        // return & waits until the game starts on 2nd call
  }  

  // determines the time between frames so we can scale how far we move the elements (dino, cactus, etc) based on how long each frame took so the movement is consistent no matter how slow or fast the frame rate is for each user's computer
  const delta = time - lastTime   // runs on 2nd call to update (game actually starts)

  updateGround(delta, speedScale)
  updateDino(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)

  lastTime = time
  window.requestAnimationFrame(update)  // 2nd call to keep this function on loop
}

// to update the speed of the game as you progress
function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

// to update the score 
function updateScore(delta) {
  score += delta * 0.01           // for every 100ms=1point & every 1second=10points
  scoreElem.textContent = Math.floor(score)  // so we only get full numbers
}

// to start the game after a key is pressed the 1st time
function handleStart() {
  lastTime = null                        // if block in update will run 
  speedScale = 1                         // how fast the speed is
  score = 0                              // reset score everytime the game restarts
  setupGround()                          // our ground starts moving on loop
  setupDino()                            // dino starts animation
  startScreenElem.classList.add("hide")  // hide start screen once the game starts (css)
  window.requestAnimationFrame(update)   // 1st call to start the loop 
}


function setPixelToWorldScale() {
  let worldToPixelScale

  // if our window is wider than our world ratio
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    // we know to pixel scale based on our width
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    // otherwise (window is higher), we know to pixel scale based on our height
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}