import { 
  getCustomProperty, 
  incrementCustomProperty, 
  setCustomProperty 
} from "./updateCustomProperty.js"

const SPEED = 0.05                 // has to be the same speed as the ground
const CACTUS_INTERVAL_MIN = 500    // how long between summoning a cactus on the screen
const CACTUS_INTERVAL_MAX = 2000

const worldElem = document.querySelector("[data-world]")  // so we can add the cactus 

let nextCactusTime

export function setupCactus() {
  nextCactusTime = CACTUS_INTERVAL_MIN
  // when we restart the game, get rid of all the previous cactus on the screen 
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    cactus.remove()
  })
}

export function updateCactus(delta, speedScale) {
  // we want it to move backwards (left) so -1, just like our ground
  document.querySelectorAll("[data-cactus]").forEach(cactus => {
    incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)

    // is our cactus way off the edge of the screen? if so, remove it
    if (getCustomProperty(cactus, "--left") <= -100) {
      cactus.remove()   
    }
  })

  if (nextCactusTime <= 0) {
    createCactus()
    // divided by speedScale so as the game gets faster, more cactus will spawn
    nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale     
  }

  // on every single update frame, constantly making the value smaller & once its below 0, a cactus will be created (if block above runs)
  nextCactusTime -= delta
}

// to lose the game (has the dino run into a cactus?): we'll have to get the dimensions of our cactus & dino to find out. getBoundingClientRect() gives us a rectangle w/ top,left,right,bottom position for every cactus on screen so we can interact with them
export function getCactusRects() {
  // spread operator so we can use map to convert each cactus element to a diff value
  return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
    return cactus.getBoundingClientRect()   
  })
}

function createCactus() {
  const cactus = document.createElement("img")
  cactus.dataset.cactus = true                  // so we can select all cactus elements
  cactus.src = "imgs/cactus.png"                // add images
  cactus.classList.add("cactus")                // to add css style
  setCustomProperty(cactus, "--left", 100)      // 100: right side of screen
  worldElem.append(cactus)                      // add to the world
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}