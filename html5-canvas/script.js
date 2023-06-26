const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d")
// console.log(ctx);
canvas.width = window.innerWidth;     
canvas.height = window.innerHeight; 
const particlesArray = []

// canvas resize with the browser & distorts it (stretches our drawing), so we set a resize listener to make sure everytime the window changes its size canvas is sync
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
  // both x & y coordinates are given to us by the event object (log it)
  mouse.x = e.x
  mouse.y = e.y
})

// a paintbrush made of circles as we move the mouse on the canvas
canvas.addEventListener("mousemove", function(e) {
  mouse.x = e.x
  mouse.y = e.y
})

// JS classes: to make js objects (each Particle = 1 circle)
class Particle {
  constructor() {
    // this.x = mouse.x
    // this.y = mouse.y
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 5 + 1;    // we want all circles to be diff sizes
    // all particles (randomly assign) to move in all directions from the mouse
    this.speedX = Math.random() * 3 - 1.5     // could be - or + num
    this.speedY = Math.random() * 3 - 1.5     // could be - or + num
  }
  // update x & y coordinates based on speedX & speedY values
  update() {
    this.x += this.speedX
    this.y += this.speedY
  }
  // takes the updated coordinates & draws a circle
  draw() {
    ctx.fillStyle = "blue"   
    ctx.beginPath()    
    ctx.arc(this.x, this.y, 50, 0, Math.PI * 2)
    ctx.fill()
  }
}

// to call Particle class & create sets of Particles
function init() {
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle())
  }
}
init()

// trigger update & draw methods for each Particles
function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update()
    particlesArray[i].draw()
  }
}

// will be called over-n-over creating an animation loop (almost like a cool cursor)
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)   // clears the whole canvas
  handleParticles()
  // calls the function we pased as an arg(this func) once, creating a loop
  requestAnimationFrame(animate)  
}
animate()
