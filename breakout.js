const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')
const ballRadius = 10

let speed = 5
let x = canvas.width / 2
let y = canvas.height - 30
let dx = speed
let dy = -speed

let paddleHeight = 10
let paddleWidth = 150
let paddleX = (canvas.width - paddleWidth) / 2
let rightPressed = false
let leftPressed = false

const paddleSpeed = 10

function drawBall() {
	ctx.beginPath()
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
	ctx.fillStyle = '#0095DD'
	ctx.fill()
	ctx.closePath()
}

function drawPaddle() {
	ctx.beginPath()
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
	ctx.fillStyle = '#0095DD'
	ctx.fill()
	ctx.closePath()
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	drawPaddle()
	drawBall()

	if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
		dx = -dx
	}
	if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
		dy = -dy
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

function keyDownHandler(e) {
	if (e.key == 'Right' || e.key == 'ArrowRight') {
		rightPressed = true
	} else if (e.key == 'Left' || e.key == 'ArrowLeft') {
		leftPressed = true
	}
}

function keyUpHandler(e) {
	if (e.key == 'Right' || e.key == 'ArrowRight') {
		rightPressed = false
	} else if (e.key == 'Left' || e.key == 'ArrowLeft') {
		leftPressed = false
	}
}

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)
setInterval(draw, 10)
