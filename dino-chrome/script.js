import { updateGround, setupGround } from "./ground.js"

const WORLD_WIDTH = 120
const WORLD_HEIGHT = 25

const worldElem = document.querySelector("[data-world]")

// function to scale our world based on how big/small our screen is
setPixelToWorldScale()
// anytime the pixel of the screen is resized, we update the world to the size we set
window.addEventListener("resize", setPixelToWorldScale)

setupGround()

let lastTime
// Update loop: runs every single frame & updates the position of everything on the screen
// takes in the time since we started our program
function update(time) {
  // by doing this first, delta is always going to be the right amount of time once we call this function the second time (actually start using the program)
  if (lastTime == null) {     // lastTime=0, first time we're on the screen
    lastTime = time           // update lastTime to be the current time
    window.requestAnimationFrame(update)  // first call to update
    return                    // then return out & ignore the rest of the function
  }  

  // determine the time between frames so we can scale how far we move the elements (dino, cactus, etc) based on how long each frame took so the movement is consistent no matter how slow or fast the frame rate is for each user's computer
  const delta = time - lastTime  // runs on second call to update (game actually starts)

  updateGround(delta, 1)

  lastTime = time
  window.requestAnimationFrame(update)  // second call to keep this function on loop
}
window.requestAnimationFrame(update)    // first call to update (if block runs)

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