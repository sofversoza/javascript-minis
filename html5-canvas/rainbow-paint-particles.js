// on mousemove, we get a burst of rainbow particles following the cursor
// on click, we get a burst of rainbow particles

const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth;     
canvas.height = window.innerHeight; 
const particlesArray = []
let hue = 0

window.addEventListener("resize", function(){
  canvas.width = window.innerWidth;     
  canvas.height = window.innerHeight; 
})

// to get the users x & y coordinates so we apply an event listener & draw on the canvas
const mouse = {
  x: undefined,
  y: undefined,
}
// draws a circle where we clicked on the canvas
canvas.addEventListener("click", function(e) {
  mouse.x = e.x
  mouse.y = e.y
  for (let i = 0; i < 10; i++) {
    particlesArray.push(new Particle())
  }
})

// a paintbrush made of circles as we move the mouse on the canvas
canvas.addEventListener("mousemove", function(e) {
  mouse.x = e.x
  mouse.y = e.y
  for (let i = 0; i < 2; i++) {
    particlesArray.push(new Particle())
  }
})

class Particle {
  constructor() {
    this.x = mouse.x
    this.y = mouse.y
    this.size = Math.random() * 15 + 1;          // between 1 - 16
    this.speedX = Math.random() * 3 - 1.5        // could be - or + num
    this.speedY = Math.random() * 3 - 1.5        // could be - or + num
    this.color = "hsl(" + hue + ", 100%, 50%)"   // rainbow
  }
  // update x & y coordinates based on speedX & speedY values
  update() {
    this.x += this.speedX
    this.y += this.speedY
    if (this.size > 0.2) this.size -= 0.1       // shrink as they move around
  }
  // takes the updated coordinates & draws a circle
  draw() {
    ctx.fillStyle = this.color
    ctx.beginPath()    
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

// trigger update & draw methods for each Particles
function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update()
    particlesArray[i].draw()

    // Particles that shrink below certain size to be removed from the particle array
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1)
      i--
    }
  }
}

// will be called over-n-over creating an animation loop (almost like a cool cursor)
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)   // clears the whole canvas
  handleParticles()
  // hue += 5  // controls how fast the color changes
  hue++

  // calls the function we pased as an arg(this func) once, creating a loop
  requestAnimationFrame(animate)  
}
animate()
