// constellation effect (connecting particles together with a line)
// check out the other 2 js files for some more info & explanation

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

const mouse = {
  x: undefined,
  y: undefined,
}

canvas.addEventListener("click", function(e) {
  mouse.x = e.x
  mouse.y = e.y
  for (let i = 0; i < 10; i++) {
    particlesArray.push(new Particle())
  }
})

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
  update() {
    this.x += this.speedX
    this.y += this.speedY
    if (this.size > 0.2) this.size -= 0.1        // shrink as they move around
  }
  draw() {
    ctx.fillStyle = this.color
    ctx.beginPath()    
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update()
    particlesArray[i].draw()

    for (let j = i; j < particlesArray.length; j++) {
      // calculate distance between 2 points in canvas (pythagorean theorem)
      const dx = particlesArray[i].x - particlesArray[j].x
      const dy = particlesArray[i].y - particlesArray[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)        // between particle i & j

      if (distance < 100) {
        ctx.beginPath()
        ctx.strokeStyle = particlesArray[i].color
        ctx.lineWidth = 0.2
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
        ctx.stroke()
      }
    }

    // Particles that shrink below certain size to be removed from the particle array
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1)
      i--
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)    // clears the whole canvas
  handleParticles()
  hue++
  requestAnimationFrame(animate)      // creates a loop bc were calling this function
}
animate()
