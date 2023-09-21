const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d")
const toolBtns = document.querySelectorAll(".tool")
const fillColor = document.querySelector("#fill-color")
const sizeSlider = document.querySelector("#size-slider")
const colorBtns = document.querySelectorAll(".colors .option")
const colorPicker = document.querySelector("#color-picker")
const clearCanvas = document.querySelector(".clear-canvas")
const saveImage = document.querySelector(".save-img")

let isDrawing = false
let brushWidth = 3
let selectedTool = "brush"
let selectedColor = "#000"
let prevMouseX, prevMouseY // mousedown pointer values(to get width&height of rectangle)
let snapshot

// set background color to white when downloading image (default: transparent)
const setCanvasBackground = () => {
	ctx.fillStyle = "#fff"
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = selectedColor // set back to the selectedColor (brush color)
}

window.addEventListener("load", () => {
	// setting canvas w&h; offsetWidth/Height returns viewable width/height of an element
	canvas.width = canvas.offsetWidth
	canvas.height = canvas.offsetHeight
	setCanvasBackground()
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

const drawTriangle = (e) => {
	ctx.beginPath()
	ctx.moveTo(prevMouseX, prevMouseY) // move triangle to the mouse pointer
	ctx.lineTo(e.offsetX, e.offsetY) //creating first line according to the mouse pointer
	ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY) // creating triangle's bottom line
	ctx.closePath() // automatically draw third line, closing the triangle
	fillColor.checked ? ctx.fill() : ctx.stroke()
}

// start drawing on mousedown(on-click) instead of mousemove(right away)
const startDraw = (e) => {
	isDrawing = true
	prevMouseX = e.offsetX // passing current mouseX/Y pos as prev mouseX/Y values
	prevMouseY = e.offsetY
	ctx.beginPath() // starts new path to draw
	ctx.lineWidth = brushWidth // passing brushWidth as line width
	ctx.strokeStyle = selectedColor
	ctx.fillStyle = selectedColor
	// copy canvas data then save as snapshot; this stops dragging the imgs/shapes
	snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
}

// to draw or erase
const drawing = (e) => {
	if (!isDrawing) return // if false, return from here
	ctx.putImageData(snapshot, 0, 0) // adding copied canvas data onto this canvas

	if (selectedTool === "brush" || selectedTool === "eraser") {
		ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor
		ctx.lineTo(e.offsetX, e.offsetY) // creating line according to mouse pointer
		ctx.stroke() // drawing/filling line with color
	} else if (selectedTool === "rectangle") {
		drawRectangle(e)
	} else if (selectedTool === "circle") {
		drawCircle(e)
	} else {
		drawTriangle(e)
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

// change brush width based on slider (passing slider value as brushSize)
sizeSlider.addEventListener("change", () => (brushWidth = sizeSlider.value))

// change color
colorBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		// remove selected class from previous option then add it on current clicked option
		document.querySelector(".options .selected").classList.remove("selected")
		btn.classList.add("selected")
		// passing selected btn background-color as selectedColor value
		selectedColor = window
			.getComputedStyle(btn)
			.getPropertyValue("background-color")
	})
})

// color picker
colorPicker.addEventListener("change", () => {
	// passing picked color value from color picker to last color btn background
	colorPicker.parentElement.style.background = colorPicker.value
	colorPicker.parentElement.click()
})

// clear whole canvas
clearCanvas.addEventListener("click", () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	setCanvasBackground()
})

// download canvas as image
saveImage.addEventListener("click", () => {
	const link = document.createElement("a") // create link element
	link.download = `${Date.now()}.jpg` // current date as link download value
	link.href = canvas.toDataURL() // passing canvasData (toDataURL returns data url of img) as link href value
	link.click() // clicking link to download image
})

canvas.addEventListener("mousedown", startDraw) // startDraw on-click
canvas.addEventListener("mousemove", drawing)
canvas.addEventListener("mouseup", () => (isDrawing = false)) // stops drawing on un-click
