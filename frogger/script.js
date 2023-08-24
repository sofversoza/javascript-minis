const timeLeftDisplay = document.querySelector("#time-left")
const resultDisplay = document.querySelector("#result")
const startPauseBtn = document.querySelector("#start-pause-btn")
const squares = document.querySelectorAll(".grid div")

function moveFrog() {
	console.log("moved")
}
document.addEventListener("keyup", moveFrog)
