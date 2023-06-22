// to position our dino to move to the right (run), and jump up & down

import { 
  getCustomProperty, 
  incrementCustomProperty, 
  setCustomProperty 
} from "./updateCustomProperty.js"

const dinoElem = document.querySelector("[data-dino]")  // grab dino element

const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2   // we have 2 different dino imgs -> 2 frames
const FRAME_TIME = 100       // each frame lasts 100ms (every 1s our dino changes 10x)

let isJumping
let dinoFrame
let currentFrameTime
let yVelocity

export function setupDino() {
  isJumping = false
  dinoFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(dinoElem, "--bottom", 0)
  // everytime we lose the game we're calling this function again so we'll remove it first
  document.removeEventListener("keydown", onJump)   
  document.addEventListener("keydown", onJump)
}

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

function handleRun(delta, speedScale) {
  // if the dino is jumping we dont want to change its animation
  if (isJumping) {    
    dinoElem.src = `imgs/dino-stationary.png`
    return
  }

  // once currentFrameTime becomes larger than FRAME_TIME, we'll swap the dino frame
  if (currentFrameTime >= FRAME_TIME) {
    // current dinoFrame is default to 0; % makes sure the animation loops between 0-1
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
    dinoElem.src = `imgs/dino-run-${dinoFrame}.png`   // switch between 0 or 1 dino img
    currentFrameTime -= FRAME_TIME      // to reset back to 0 then start the loop again
  }

  // increment everytime we go through this function, so when the game gets faster, the dino moves quicker
  currentFrameTime += delta * speedScale
}

// to make dino jump: take the bottom position of the dino & move it up or down depending on what the velocity of the dino is (velocity: the speed of x in a given direction)
// when we start our jump, we'll set the velocity to an upward value (JUMP_SPEED) then as time passes, we'll be subtracting GRAVITY from our velocity; so as dino moves up in the air, its going to get slower as the velocity starts to reach 0, then the dino will start moving down bc the velocity will be negative, bc GRAVITY is pulling it back down
function handleJump(delta) {
  if (!isJumping) return       // only run this function if dino is jumping

  // incrementing dino's bottom prop by yVelocity * delta to scale with our frame rate
  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)
  
  // if dino's bottom prop is already 0 or less we dont want to move it down anymore
  if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0)
    isJumping = false           // once we touch the ground, we're no longer jumping
  }

  yVelocity -= GRAVITY * delta
}

// to actually jump, event listener for when we click on the space bar
function onJump(e) {
  if (e.code !== "Space" || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
}