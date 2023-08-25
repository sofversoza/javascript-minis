const timeLeftDisplay = document.querySelector("#time-left")
const resultDisplay = document.querySelector("#result")
const startPauseBtn = document.querySelector("#start-pause-btn")
const squares = document.querySelectorAll(".grid div")

const gridWidth = 9 //there are 9 squares inside the grid (9x9)
let currentIndex = 76 //starting point (bottom of grid)

function moveFrog(e) {
	//remove frog from its current position/index so it wont leave a trail
	squares[currentIndex].classList.remove("frog")

	//key comes from e — console.log(e)
	switch (e.key) {
		case "ArrowLeft":
			//move left only if currentIndex isn't divisible by 9
			if (currentIndex % gridWidth !== 0) currentIndex -= 1
			console.log("move left", currentIndex)
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
