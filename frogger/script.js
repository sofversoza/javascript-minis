const timeLeftDisplay = document.querySelector("#time-left")
const resultDisplay = document.querySelector("#result")
const startPauseBtn = document.querySelector("#start-pause-btn")
const squares = document.querySelectorAll(".grid div")
const logsLeft = document.querySelectorAll(".log-left")
const logsRight = document.querySelectorAll(".log-right")
const carsLeft = document.querySelectorAll(".car-left")
const carsRight = document.querySelectorAll(".car-right")

const gridWidth = 9 //there are 9 squares inside the grid (9x9)
let currentIndex = 76 //starting point (bottom of grid)
let timerID //so we can stop the interval when we lose

function moveFrog(e) {
	//remove frog from its current position/index so it wont leave a trail
	squares[currentIndex].classList.remove("frog")

	//key comes from e — console.log(e)
	switch (e.key) {
		case "ArrowLeft":
			//move left only if currentIndex isn't divisible by 9
			if (currentIndex % gridWidth !== 0) currentIndex -= 1
			break
		case "ArrowRight":
			//move right only if the remainder is smaller than 8
			if (currentIndex % gridWidth < gridWidth - 1) currentIndex += 1
			break
		case "ArrowUp":
			//if current index = 1, 1-9=-8, -8<0, dont move up
			//if current index = 10, 10-9=1, 1>0, move up
			if (currentIndex - gridWidth >= 0) currentIndex -= gridWidth
			break
		case "ArrowDown":
			//if current index = 54, 54+9=63, 63<81, move down
			if (currentIndex + gridWidth < gridWidth * gridWidth) {
				currentIndex += gridWidth
			}
			break
	}

	squares[currentIndex].classList.add("frog")
}
document.addEventListener("keyup", moveFrog)

//grabbing logs & cars then passing each one through their own functions
function autoMoveElements() {
	logsLeft.forEach((logLeft) => moveLogLeft(logLeft))
	logsRight.forEach((logRight) => moveLogRight(logRight))
	carsLeft.forEach((carLeft) => moveCarLeft(carLeft))
	carsRight.forEach((carRight) => moveCarRight(carRight))
	lose() //check for lose each time an element moves (every 1 sec)
}

//switching the squares/logs to appear like they're moving to the left
function moveLogLeft(logLeft) {
	switch (true) {
		case logLeft.classList.contains("l1"):
			logLeft.classList.remove("l1")
			logLeft.classList.add("l2")
			break
		case logLeft.classList.contains("l2"):
			logLeft.classList.remove("l2")
			logLeft.classList.add("l3")
			break
		case logLeft.classList.contains("l3"):
			logLeft.classList.remove("l3")
			logLeft.classList.add("l4")
			break
		case logLeft.classList.contains("l4"):
			logLeft.classList.remove("l4")
			logLeft.classList.add("l5")
			break
		case logLeft.classList.contains("l5"):
			logLeft.classList.remove("l5")
			logLeft.classList.add("l1")
			break
	}
}

//switching the squares/logs to appear like they're moving to the right
function moveLogRight(logRight) {
	switch (true) {
		case logRight.classList.contains("l1"):
			logRight.classList.remove("l1")
			logRight.classList.add("l5")
			break
		case logRight.classList.contains("l2"):
			logRight.classList.remove("l2")
			logRight.classList.add("l1")
			break
		case logRight.classList.contains("l3"):
			logRight.classList.remove("l3")
			logRight.classList.add("l2")
			break
		case logRight.classList.contains("l4"):
			logRight.classList.remove("l4")
			logRight.classList.add("l3")
			break
		case logRight.classList.contains("l5"):
			logRight.classList.remove("l5")
			logRight.classList.add("l4")
			break
	}
}

//switching the squares/cars to appear like they're moving to the left
function moveCarLeft(carLeft) {
	switch (true) {
		case carLeft.classList.contains("c1"):
			carLeft.classList.remove("c1")
			carLeft.classList.add("c2")
			break
		case carLeft.classList.contains("c2"):
			carLeft.classList.remove("c2")
			carLeft.classList.add("c3")
			break
		case carLeft.classList.contains("c3"):
			carLeft.classList.remove("c3")
			carLeft.classList.add("c1")
			break
	}
}

//switching the squares/cars to appear like they're moving to the right
function moveCarRight(carRight) {
	switch (true) {
		case carRight.classList.contains("c1"):
			carRight.classList.remove("c1")
			carRight.classList.add("c3")
			break
		case carRight.classList.contains("c2"):
			carRight.classList.remove("c2")
			carRight.classList.add("c1")
			break
		case carRight.classList.contains("c3"):
			carRight.classList.remove("c3")
			carRight.classList.add("c2")
			break
	}
}

function lose() {
	if (squares[currentIndex].classList.contains("c1")) {
		resultDisplay.textContent = "You got squashed by a car!!!"
		clearInterval(timerID)
		squares[currentIndex].classList.remove("frog")
		document.removeEventListener("keyup", moveFrog)
	}
}

timerID = setInterval(autoMoveElements, 1000)
