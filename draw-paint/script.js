const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const toolBtns = document.querySelectorAll(".tool")
const fillColor = document.querySelector("#fill-color")

let isDrawing = false
let brushWidth = 3
let selectedTool = "brush"
let prevMouseX, prevMouseY // mousedown pointer values(to get width&height of rectangle)
let snapshot

window.addEventListener("load", () => {
	// setting canvas w&h; offsetWidth/Height returns viewable width/height of an element
	canvas.width = canvas.offsetWidth
	canvas.height = canvas.offsetHeight
})

const drawRectangle = (e) => {
	// if fillColor isn't checked, draw rectangle w/o fill (default)
	if (!fillColor.checked) {
		return ctx.strokeRect(
			// draws rectangle, no fill; (x-coordinate, y-coordinate, width, height)
			e.offsetX,
			e.offsetY,
			prevMouseX - e.offsetX,
			prevMouseY - e.offsetY
		)
	}
	// otherwise, draw with color fill
	ctx.fillRect(
		e.offsetX,
		e.offsetY,
		prevMouseX - e.offsetX,
		prevMouseY - e.offsetY
	)
}

const drawCircle = (e) => {
	ctx.beginPath() // new path to draw circle
	// get radius of circle according to the mouse pointer
	let radius = Math.sqrt(
		Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2)
	)
	// draw circle around mouse pointer (x-coordinate, y-coordinate, radius, start angle, end angle)
	ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI)
	fillColor.checked ? ctx.fill() : ctx.stroke()
}

// start drawing on mousedown(on-click) instead of mousemove(right away)
const startDraw = (e) => {
	isDrawing = true
	prevMouseX = e.offsetX // passing current mouseX/Y pos as prev mouseX/Y values
	prevMouseY = e.offsetY
	ctx.beginPath() // starts new path to draw
	ctx.lineWidth = brushWidth // passing brushWidth as line width
	// copy canvas data then save as snapshot; this stops dragging the imgs/shapes
	snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
}

const drawing = (e) => {
	if (!isDrawing) return // if false, return from here
	ctx.putImageData(snapshot, 0, 0) // adding copied canvas data onto this canvas

	if (selectedTool === "brush") {
		ctx.lineTo(e.offsetX, e.offsetY) // creating line according to mouse pointer
		ctx.stroke() // drawing/filling line with color
	} else if (selectedTool === "rectangle") {
		drawRectangle(e)
	} else if (selectedTool === "circle") {
		drawCircle(e)
	}
}

toolBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		// remove active class from previous option then add it on current clicked option
		document.querySelector(".options .active").classList.remove("active")
		btn.classList.add("active")
		selectedTool = btn.id
		console.log(selectedTool)
	})
})

canvas.addEventListener("mousedown", startDraw) // startDraw on-click
canvas.addEventListener("mousemove", drawing)
canvas.addEventListener("mouseup", () => (isDrawing = false)) // stops drawing on un-click
