import { incrementCustomProperty, setCustomProperty, getCustomProperty } from "./updateCustomProperty.js"

const SPEED = .05

const groundElems = document.querySelectorAll("[data-ground]")

// the ground is on loop (never ending) & is called right when we start our program
export function setupGround() {
  setCustomProperty(groundElems[0], "--left", 0)  // set 1st ground left prop to 0
  setCustomProperty(groundElems[1], "--left", 300)  // set 2nd ground left prop to 30
                                                    // (css width prop is set to 300%)
}

// Update ground by making it move to the left constantly everytime update is called in our script, which is where this function is called
// speedScale: scale of our game, as we go further in the game, it'll speed up
export function updateGround(delta, speedScale) {
  groundElems.forEach(ground => {
    // increment based on delta,scale,speed & we want it to move backwards (left) so -1
    incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)

    // our ground is twice as long now but still will end, we want it to loop
    // -300 -> has our ground move all the way off the edge of the screen?
    if (getCustomProperty(ground, "--left") <= -300) {
      // if so, loop ground all the way around and put on the end of the 2nd ground elem
      incrementCustomProperty(ground, "--left", 600)
    }
  })
}