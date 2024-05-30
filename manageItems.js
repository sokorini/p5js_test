
// integ : sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4

let listView = null;
let addItem;

function setup() {

  //window.resizeTo(400, 400*windowHeight/windowWidth);
  
  fullscreen();
  createCanvas(WPerC(100), HPerC(50));
  setAttributes({ antialias: false });
  noStroke();
  background(220);

  // frameRate(30);

  let saveAndGoBack = makeButton("저장하고 돌아가기", 0, 90, 100, 10);
  saveAndGoBack.mousePressed(saveAndGoBackCB);

  addItem = makeButton("추가하기", 0, 61, 100, 10);
  addItem.mousePressed(addItemCB);

  listView = new ListView(0, HPerC(10), WPerC(100), HPerC(40));
  for(let i = 0 ; i < 10 ; i++){
    listView.add(new lstItem("원재료"+i, "개", "원재료"));
  }
  for(let i = 0 ; i < 10 ; i++){
    listView.add(new lstItem("비품"+i, "개", "비품"));
  }
  for(let i = 0 ; i < 10 ; i++){
    listView.add(new lstItem("현금부식"+i, "개", "현금부식"));
  }
  
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
  addItem.remove();
}

function draw(){
  listView.update();
}
