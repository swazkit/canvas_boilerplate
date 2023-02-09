
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

var n = innerWidth > 700? 400 : 200

// Utility Functions
  var randomIntFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  var randomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }


const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

var gravity = 1
var fraction = 0.59

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

addEventListener('click', () => {
  init()
})



// Objects
class Ball {
  constructor(x, y, radius, color, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.stroke()
    c.fill()
    c.closePath()
  }

  update() {
    if(this.y + this.radius + this.dy > canvas.height){
      this.dy = -this.dy * fraction;
    } else {
      this.dy += gravity;
    }

    if(this.x + this.radius > canvas.width || this.x + this.radius < 0) {
      this.dx = -this.dx;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw()
  }
}

    console.log(n);
// Implementation
let ballArray
let ball = new Ball(mouse.x, mouse.y, 30, colors[1], 5)
function init() {
  ballArray = []

  for (let i = 0; i < n; i++) {
    var radius = randomIntFromRange(10, 30)
    var x = randomIntFromRange(radius , canvas.width - radius)
    var y = randomIntFromRange(0, canvas.height - radius)
    var dx = randomIntFromRange(-2, 2)
    ballArray.push(new Ball(x, y, radius, randomColor(), dx, 5))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  ball.update()

  ballArray.forEach(ball => {
    ball.update()
  })
}


init()
animate()