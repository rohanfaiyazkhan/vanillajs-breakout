import './roundRectangle.js'

const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')
const boundingRect = canvas.getBoundingClientRect()
const ballRadius = 10

let speed = 3
let x = canvas.width / 2
let y = canvas.height - 30
let dx = speed
let dy = -speed

let paddleHeight = 20
let paddleWidth = 150
let paddleX = (canvas.width - paddleWidth) / 2
let rightPressed = false
let leftPressed = false
const brickWidth = 100
const brickHeight = 30
const brickPadding = 8
const brickOffsetTop = 30
const brickOffsetLeft = 20
const brickRowCount = 3
const brickColumnCount = Math.floor(canvas.width / (brickWidth + brickPadding))

const paddleRadius = 10

const bricks = []
for (let c = 0; c < brickColumnCount; c++) {
	bricks[c] = []
	for (let r = 0; r < brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0, visibile: true }
	}
}

function drawBall() {
	ctx.beginPath()
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
	ctx.fillStyle = '#0095DD'
	ctx.fill()
	ctx.closePath()
}

function drawPaddle() {
	ctx.beginPath()
	ctx.roundRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, paddleRadius)
	ctx.fillStyle = '#0095DD'
	ctx.fill()
	ctx.closePath()
}

function drawBricks() {
	for (let c = 0; c < brickColumnCount; c++) {
		for (let r = 0; r < brickRowCount; r++) {
			if (bricks[c][r].visibile) {
				let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft
				let brickY = r * (brickHeight + brickPadding) + brickOffsetTop
				bricks[c][r].x = brickX
				bricks[c][r].y = brickY
				ctx.beginPath()
				ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight)
				ctx.fillStyle = '#0095DD'
				ctx.fill()
				ctx.closePath()
			}
		}
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	drawPaddle()
	drawBall()
	drawBricks()
	collisionDetection()

	if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
		dx = -dx
	}

	if (y + dy < ballRadius) {
		dy = -dy
	} else if (y > canvas.height + ballRadius) {
		gameOver()
	}

	if (x + dx >= paddleX && x + dx < paddleX + paddleWidth && y + dy >= canvas.height - paddleHeight) {
		dy = -dy
		if (x + dx >= (paddleX + paddleWidth) * 0.95 || x + dx <= (paddleX + paddleWidth) * 0.2) {
			dx = (x + dx - (paddleX - paddleWidth / 2)) / (paddleWidth / 2)
		}
	}

	if (rightPressed && paddleX + paddleWidth < canvas.width) {
		paddleX += paddleSpeed
	}

	if (leftPressed && paddleX > 0) {
		paddleX -= paddleSpeed
	}

	x += dx
	y += dy
}

function mouseMoveListener(e) {
	let mouseX = e.clientX
	if (mouseX < boundingRect.left) {
		paddleX = 0
	} else if (mouseX > boundingRect.right - paddleWidth) {
		paddleX = canvas.width - paddleWidth
	} else {
		paddleX = mouseX - boundingRect.left
	}
}

function collisionDetection() {
	for (let c = 0; c < brickColumnCount; c++) {
		for (let r = 0; r < brickRowCount; r++) {
			let b = bricks[c][r]
			if (b.visibile && x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
				b.visibile = false
				dx *= 1.1
				dy *= 1.1
				dy = -dy
			}
		}
	}
}

function gameOver() {
	alert('GAME OVER')
	clearInterval(interval)
}

document.addEventListener('mousemove', mouseMoveListener, false)
const interval = setInterval(draw, 10)
