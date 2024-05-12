let playerState = "idle"

const dropdown = document.getElementById("animations")
dropdown.addEventListener("change", function (e) {
	playerState = e.target.value
})

const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext("2d")
const CANVAS_WIDTH = (canvas.width = 600) // same w&h values in css
const CANVAS_HEIGHT = (canvas.height = 600)

const playerIMG = new Image() // store img in js so we can animate it
playerIMG.src = "assets/shadow_dog.png"

const sprite_width = 575
const sprite_height = 523

let gameFrame = 0 // every increase in the frames number (animate() loop count)
const staggerFrames = 5 // always 5; slows down animation 5 times
const spriteAnimations = [] // contains all rows of animations
const animationStates = [
	// frame count starts at 1
	{
		name: "idle",
		frames: 7,
	},
	{
		name: "jump",
		frames: 7,
	},
	{
		name: "fall",
		frames: 7,
	},
	{
		name: "run",
		frames: 9,
	},
	{
		name: "dizzy",
		frames: 11,
	},
	{
		name: "sit",
		frames: 5,
	},
	{
		name: "roll",
		frames: 7,
	},
	{
		name: "bite",
		frames: 7,
	},
	{
		name: "ko",
		frames: 12,
	},
	{
		name: "gethit",
		frames: 4,
	},
]

animationStates.forEach((state, i) => {
	let frames = {
		loc: [],
	}

	for (let j = 0; j < state.frames; j++) {
		let positionX = j * sprite_width
		let positionY = i * sprite_height
		frames.loc.push({ x: positionX, y: positionY })
	}

	spriteAnimations[state.name] = frames
})
console.log(spriteAnimations)

function animate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

	let position =
		Math.floor(gameFrame / staggerFrames) %
		spriteAnimations[playerState].loc.length

	let frameX = sprite_width * position
	let frameY = spriteAnimations[playerState].loc[position].y // could do the same w frameX

	/* cut 1 frame at a time from the sprite sheet
    then draw the img w its original w&h */
	ctx.drawImage(
		playerIMG,
		frameX, // travels thru the sheet horizontally (frame)
		frameY, // travels thru the sheet vertically (animation)
		sprite_width,
		sprite_height,
		0,
		0,
		sprite_width,
		sprite_height
	)

	gameFrame++ // increment by 1 while this function loops
	requestAnimationFrame(animate) // loop animate function
}
animate()
