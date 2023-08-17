const grid = document.querySelector(".grid")
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560

const userStartPosition = [230, 10]
let userCurrentPosition = userStartPosition

const ballStartPosition = [270, 40]
let ballCurrentPosition = ballStartPosition

// create a Block class
// xAxis, yAxis = bottom left of block; to decipher all 4points of each block to be used for collisions & their position on our grid using their width & height
class Block {
	constructor(xAxis, yAxis) {
		this.bottomLeft = [xAxis, yAxis]
		this.bottomRight = [xAxis + blockWidth, yAxis]
		this.topLeft = [xAxis, yAxis + blockHeight]
		this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
	}
}

// all blocks
const blocks = [
	new Block(10, 270),
	new Block(120, 270),
	new Block(230, 270),
	new Block(340, 270),
	new Block(450, 270),

	new Block(10, 240),
	new Block(120, 240),
	new Block(230, 240),
	new Block(340, 240),
	new Block(450, 240),

	new Block(10, 210),
	new Block(120, 210),
	new Block(230, 210),
	new Block(340, 210),
	new Block(450, 210),
]
console.log(blocks[0])

// draw all blocks
function drawBlocks() {
	for (let i = 0; i < blocks.length; i++) {
		const block = document.createElement("div")
		block.classList.add("block")
		block.style.left = blocks[i].bottomLeft[0] + "px" // bottomLeft[0] = xAxis
		block.style.bottom = blocks[i].bottomLeft[1] + "px" // bottomLeft[1] = yAxis
		grid.appendChild(block)
	}
}
drawBlocks()

// create user (paddle)
const user = document.createElement("div")
user.classList.add("user")
drawUser()
grid.appendChild(user)

// draw user (helper function to avoid repetition)
function drawUser() {
	user.style.left = userCurrentPosition[0] + "px" // xAxis
	user.style.bottom = userCurrentPosition[1] + "px" // yAxis
}

// move user
function moveUser(e) {
	switch (e.key) {
		case "ArrowLeft":
			// as long as user's xAxis[0] is larger than 0 (the starting point from the left)
			if (userCurrentPosition[0] > 0) {
				userCurrentPosition[0] -= 10 // move the xAxis position
				drawUser() // re-draw user
			}
			break
		case "ArrowRight":
			// boardWidth = grid's width; -blockWidth bc the anchor point is the bottom-left
			if (userCurrentPosition[0] < boardWidth - blockWidth) {
				userCurrentPosition[0] += 10
				drawUser()
			}
			break
	}
}
document.addEventListener("keydown", moveUser)

// create ball
const ball = document.createElement("div")
ball.classList.add("ball")
ball.style.left = ballCurrentPosition[0] + "px" // xAxis
ball.style.bottom = ballCurrentPosition[1] + "px" // xAxis
grid.appendChild(ball)
