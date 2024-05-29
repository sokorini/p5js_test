
// integ : sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4

let listView = null;

function setup() {
  fullscreen();
  createCanvas(windowWidth, windowHeight);
  frameRate(20);

  background(220);

  let saveAndGoBack = makeButton("저장하고 돌아가기", 0, 90, 100, 10);
  saveAndGoBack.mousePressed(saveAndGoBackCB);

  let addItem = makeButton("추가하기", 0, 61, 100, 10);
  addItem.mousePressed(addItemCB);

  listView = new ListView(0, HPerC(10), WPerC(100), HPerC(40));
  listView.add(new lstItem("대파", "단", "원재료"));
  listView.draw();
  
  let itemName = makeInput("", 0, 50, 49, 10);
  itemName.style('font-size', 20+'px');
  
  let itemUnit = makeInput("", 51, 50, 20, 10);
  itemUnit.style('font-size', 20+'px');
}

function saveAndGoBackCB(){
  window.history.back();
}

function addItemCB(){
  openSMS("01052293829", "SMS test");
}

function draw(){
  listView.update();
}
