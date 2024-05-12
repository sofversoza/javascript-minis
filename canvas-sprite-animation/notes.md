Canvas setup: set the canvas w&h to ensure correct scaling; by default canvas is
set to 300x150 pixels and drawing images could be distorted; manually set w&h to
the css dimensions

Sprite Sheet img setup using new Image() class constructor: creates an html
<img> element, but instead of appending it to our web page, we'll just store the
sprite sheet img in the img class so that we can animate it with javascript.

- Sprite Sheet full image size (WxH): 6876x5230 px (shadow dog img)
- Sprite Sheet col num (num of sprites of the longest row): 12 (shadow dog img)
- Sprite Sheet Animation count (num of rows): i.e. 10 rows = 10 animations

- Each Sprite (or frame) width: sheet_width / col_num
- Each Sprite (or frame) height: sheet_height / row_num

drawImage method w 9 args: ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)

- s —> source (or sprite); rect area to cut out from the src img
- d —> destination; where on the canvas the clipped area should be drawn to
- sw&sh: width & height of 1 frame from the src img (sprite sheet)
- from dw&dh to sw&sh (destination w&h, 1frame w&h): instead of stretching the
  img by setting dw&dh, "draw" it as its original size (1 frame's w&h) at the
  destination's x&y

Animating Rows (sx arg): jumping from 1 frame to another, animating each row:
ctx.drawImage(img, frame_num x sprite_width, sy, sw, sh, dx, dy, sw, sh)

- sx (frame_num x sprite_width): multiplying sprite's width by X allows for
  cycling through each frames in a row horizontally; as X increases, we move to
  the right, jumping by the amount of sprite_width; i.e. 0 or 0 x s_w = frame1;
  1 x s_w = frame2; 2 x s_w = frame3...

Animation Swapping (sy arg): switching between different rows of animations:
ctx.drawImage(img, sx, row_num x sprite_height, sw, sh, dx, dy, sw, sh)

- sy (row_num x sprite_height): multiplying sprite's height by X allows for
  swapping between diff animations or rows vertically; i.e. 0 or 0 x s_h = row1
- everytime we swap between diff row of animations, we have to update the
  frame's x&y —> create a variable that changes to the correct value reflecting
  the num of frames for each row, depending which one we're currently on.

- Math.floor(gameFrame / staggerFrames) = integer number
- Math.floor() to rid of decimals; we always want true integers (either 0 or 1)
- gameFrame(0) / staggerFrames(always 5): to go from 0 through 1 (decimals)
- 0 / 5 = 0 —> Math.floor(0) = 0
- 1 / 5 = 0.2 —> Math.floor(0.2) = 0
- 2 / 5 = 0.4 —> Math.floor(0.4) = 0
- 3 / 5 = 0.6 —> Math.floor(0.6) = 0
- 4 / 5 = 0.8 —> Math.floor(0.8) = 0
- 5 / 5 = 1 —> Math.floor(1) = 1; took 5x of incrementing gameFrame to get here
- range 0-5 is the gameFrame or loop count of animate function
- gameFrame = 0, gameFrame++ inside the animate function on each loop: increment
  gameFrame 5x before we get from 0 to 1; we get to 1 only when gameFrame is 5
  (gameFrame(5) x staggerFrames(5) = 1)

Math.floor(gameFrame / staggerFrames) % 6 = variable

- 6 since staggerFrames is always 5 & the counting of frames start at 0
- the variable increases by 1 everytime gameFrame increases by 5
- 0 / 5 = 0 —> Math.floor(0) = 0 —> 0 % 6 = 0
- 1 / 5 = 0.2 —> Math.floor(0.2) = 0 —> 0 % 6 = 0
- 2 / 5 = 0.4 —> Math.floor(0.4) = 0 —> 0 % 6 = 0
- 3 / 5 = 0.6 —> Math.floor(0.6) = 0 —> 0 % 6 = 0
- 4 / 5 = 0.8 —> Math.floor(0.8) = 0 —> 0 % 6 = 0
- 5 / 5 = 1 —> Math.floor(1) = 1; —> 1 % 6 = 1

- variable keeps increasing until it reaches 6; 6 % 6 = 0
- 0 % 6 = 0
- 1 % 6 = 1
- 2 % 6 = 2
- 3 % 6 = 3
- 4 % 6 = 4
- 5 % 6 = 5
- 6 % 6 = 0
- 7 % 6 = 1 & so on...
