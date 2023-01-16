let inputy = []
let inputx =[]
let fourierY;
let fourierX;
let time = 0;
let path = []
let slider;
function setup() {
  smooth()
  let canvas = createCanvas(800,800)
  canvas.parent("sketchcont")
  slider = createSlider(5, 10, 1)
  const skip = 10
  for(let i = 0; i < xinput.length; i+=skip){
    inputx.push(-xinput[i]/2 + 500)
    inputy.push( -yinput[i]/2 + 400)
  }
  fourierX = dft(inputx)
  fourierY = dft(inputy)
  fourierX.sort((a, b) => b.amp - a.amp )
  fourierY.sort((a,b) => b.amp - a.amp)
}

function epiCycle(x, y, rotation,fourier){
  for(let i = 0; i < fourier.length; i++){
    let prevx = x
    let prevy = y

    let freq = fourier[i].freq
    let radius = fourier[i].amp
    let phase = fourier[i].phase
    x +=  radius * cos(freq*time + phase + rotation)
    y += radius * sin(freq*time + phase + rotation)

    stroke(255, 100)
    noFill()
    ellipse(prevx,prevy, radius * 2)

    stroke(255)
    line(prevx, prevy, x, y)
  }
  return createVector(x, y)
}

function draw() {
  background(0)
  let vx = epiCycle(width/2, 100, 0,fourierX)
  let vy = epiCycle(100, height/2, HALF_PI,fourierY)
  let v = createVector(vx.x, vy.y)
  path.unshift(v)
  line(vx.x , vx.y, v.x, v.y)
  line(vy.x , vy.y, v.x, v.y)
  beginShape()
  noFill()
  for(let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y)
  }
  endShape()

  const dt = TWO_PI/fourierY.length;
  time +=dt;
  if(path.length > 500) {
    path.pop()
  }
}