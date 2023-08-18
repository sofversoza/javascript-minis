const grid = document.querySelector(".grid")
const scoreDisplay = document.querySelector("#score")
const blockWidth = 100 // from css
const blockHeight = 20 // from css
const boardWidth = 560 // from css
const boardHeight = 300 // from css
const ballDiameter = 20 // ball's height & width (both 20)
let xDirection = -2
let yDirection = 2
let score = 0
let timerId

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

// draw user (helper function to avoid repetition)
function drawUser() {
	user.style.left = userCurrentPosition[0] + "px" // xAxis
	user.style.bottom = userCurrentPosition[1] + "px" // yAxis
}

// create user paddle
const user = document.createElement("div")
user.classList.add("user")
drawUser()
grid.appendChild(user)

// move user (by listening to left & right arrow keys)
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

// draw ball (helper function to avoid repetition)
function drawBall() {
	ball.style.left = ballCurrentPosition[0] + "px" // xAxis
	ball.style.bottom = ballCurrentPosition[1] + "px" // xAxis
}

// create ball
const ball = document.createElement("div")
ball.classList.add("ball")
drawBall()
grid.appendChild(ball)

// helper function for changing the balls position/direction
function changeDirection() {
	if (xDirection === 2 && yDirection === 2) {
		yDirection = -2 // go the opposite direction
		return
	}
	if (xDirection === 2 && yDirection === -2) {
		xDirection = -2
		return
	}
	if (xDirection === -2 && yDirection === -2) {
		yDirection = 2
		return
	}
	if (xDirection === -2 && yDirection === 2) {
		xDirection = 2
		return
	}
}

// check for collisions (grid wall & blocks) then change the ball's direction
function checkForCollisions() {
	// check for block collisions
	// if the ball's in the middle of any of the blocks bottomLeft's & bottomRight's xAxis (block's whole bottom width) & also in the height (side of the block)
	for (let i = 0; i < blocks.length; i++) {
		if (
			ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
			ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
			ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
			ballCurrentPosition[1] < blocks[i].topLeft[1]
		) {
			const allBlocks = Array.from(document.querySelectorAll(".block"))
			allBlocks[i].classList.remove("block")
			blocks.splice(i, 1)
			changeDirection()
			score++
			scoreDisplay.innerHTML = score

			// check for win
			if (blocks.length === 0) {
				scoreDisplay.innerHTML = "You win! :)"
				clearInterval(timerId)
				document.removeEventListener("keydown", moveUser)
			}
		}
	}

	// check for wall collisions (if larger = off the grid)
	if (
		ballCurrentPosition[0] >= boardWidth - ballDiameter ||
		ballCurrentPosition[1] >= boardHeight - ballDiameter ||
		ballCurrentPosition[0] <= 0 // if it goes to the left side of the board/grid
	) {
		changeDirection()
	}

	// check for user collisions (if the ball is between or in the middle of our user)
	if (
		ballCurrentPosition[0] > userCurrentPosition[0] &&
		ballCurrentPosition[0] < userCurrentPosition[0] + blockWidth &&
		ballCurrentPosition[1] > userCurrentPosition[1] &&
		ballCurrentPosition[1] < userCurrentPosition[1] + blockHeight
	) {
		changeDirection()
	}

	// check for game over (ball goes to the bottom of the board/grid)
	if (ballCurrentPosition[1] <= 0) {
		clearInterval(timerId)
		scoreDisplay.innerHTML = "Game Over! :("
		document.removeEventListener("keydown", moveUser)
	}
}

// move ball (by adding x & y axis)
function moveBall() {
	// the ball's default x & yDirection goes to the grid's top right corner
	ballCurrentPosition[0] += xDirection
	ballCurrentPosition[1] += yDirection
	drawBall()
	checkForCollisions()
}

// we'll clear timerId whenever we want the ball to stop
timerId = setInterval(moveBall, 20)
