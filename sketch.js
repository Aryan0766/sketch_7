// Click: turn on the microphone
// Mouse:  moves the small circle
// Any key : changes the colors and plays a note
// Mic : louder sound makes the big circle bigger
// Webcam: shown in monochrome behind everything, changes color when any key is pressed(only when mic is on)

let mic;
let amp;
let osc;
let cam;
let micOn = false;
let c = "red";
let mono = "white"; //color for the webcam

function setup () {
  createCanvas(640, 480);

  // webcam
  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.hide();

  mic = new p5.AudioIn();
  amp = new p5.Amplitude();
  mic.connect(amp);
  osc = new p5.Oscillator(40, "sine");
}

function draw () {
  // draw the webcam, make it gray, then tint it with one color
  push();
  image(cam, 0, 0, width, height);
  filter(GRAY);
  blendMode(MULTIPLY);
  fill(mono);
  noStroke();
  rect(0, 0, width, height);
  pop();

  // get the mic volume and turn it into a size
  let level = 0;
  if (micOn) {
    level = amp.getLevel();
  }
  let size = map(level, 0, 0.1, 50, 400);

  // big circle in the middle
  push();
  translate(width / 2, height / 2);
  fill(c);
  noStroke();
  ellipse(0, 0, size, size);
  pop();

  // small circle that follows the mouse
  push();
  translate(mouseX, mouseY);
  fill(255);
  ellipse(0, 0, 30, 30);
  pop();

  push();
  fill(255);
  if (micOn) {
    text("Mic is on", 10, 20);
  } else {
    text("Click to turn on the mic", 10, 20);
  }
  pop();
}

function mousePressed () {
  userStartAudio();
  mic.start();
  micOn = true;
}

function keyPressed () {
  c = color(random(255), random(255), random(255));
  mono = color(random(255), random(255), random(255));
  osc.freq(random(200, 600));
  osc.start();
}

function keyReleased () {
  osc.stop();
}