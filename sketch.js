function setup() {
  fullscreen();
  createCanvas(windowWidth, windowHeight);
  
  let button = createButton("open sms");
  button.position(10,10);
  button.mousePressed(cb);
  
}


function cb(){
  let btn = createButton("huh?");
  btn.position(40,40);
  openSMS("01052293829","please....");
}

function draw() {
  background(220);
}
