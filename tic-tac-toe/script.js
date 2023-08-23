const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")
const startCells = ["", "", "", "", "", "", "", "", ""] //they'll be empty upon startup

let go = "circle"
infoDisplay.textContent = "Circle goes first!"

//create 9 cells
function createBoard() {
	startCells.forEach((_cell, index) => {
		const cellElement = document.createElement("div")
		cellElement.classList.add("square")
		cellElement.id = index
		cellElement.addEventListener("click", addGo)
		gameBoard.append(cellElement)
	})
}
createBoard()

//add either O or X on the clicked cell
function addGo(e) {
	const goDisplay = document.createElement("div")
	goDisplay.classList.add(go) //adds either x or o class
	e.target.append(goDisplay)
	go = go === "circle" ? "cross" : "circle" //change go
	infoDisplay.textContent = `Now it's ${go}'s turn!`
	e.target.removeEventListener("click", addGo) //cant click on the same square
	checkScore()
}

function checkScore() {
	//grab all the squares each time we call this function
	const allSquares = document.querySelectorAll(".square")
	const winningCombos = [
		//horizontally
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		//vertically
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		//diagonally
		[0, 4, 8],
		[2, 4, 6],
	]

	//8 arrays with 3 cells in each
	winningCombos.forEach((array) => {
		const circleWins = array.every((cell) =>
			allSquares[cell].firstChild?.classList.contains("circle")
		)

		if (circleWins) {
			infoDisplay.textContent = "Circle Wins!"
			//remove eventListener
			allSquares.forEach((square) => square.replaceWith(square.cloneNode(true)))
			return //return out after true otherwise if we continue we'll get false
		}
	})

	winningCombos.forEach((array) => {
		const crossWins = array.every((cell) =>
			allSquares[cell].firstChild?.classList.contains("cross")
		)

		if (crossWins) {
			infoDisplay.textContent = "Cross Wins!"
			allSquares.forEach((square) => square.replaceWith(square.cloneNode(true)))
			return
		}
	})
}
