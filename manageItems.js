
// integ : sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4

let listView = null;
let addItem;
let itemType;
let itemName;
let itemUnit;

function setup() {
  p5.disableFriendlyErrors = true;

  fullscreen();
  // createCanvas(WPerC(100), HPerC(50));
  noCanvas();
  setAttributes({ antialias: false });
  noStroke();
  background(220);

  if(navigator.userAgent.match(/Android/i) && navigator.userAgent.indexOf("Chrome") == -1){
    text("If you are laggy, try using chrome browser.",5,5, 400, 40);
  }
  
  // let downloadApk = makeButton("get Apk", 80,0,20,5);
  // downloadApk.mousePressed(downloadApkCB);

  let saveAndGoBack = makeButton("저장하고 돌아가기", 0, 90, 100, 10);
  saveAndGoBack.mousePressed(saveAndGoBackCB);

  addItem = makeButton("추가하기", 0, 61, 100, 10);
  addItem.mousePressed(addItemCB);



  
  // listView = new ListView(0, HPerC(10), WPerC(100), HPerC(40));  
  listView = new ListView("listview1", 0, HPerC(10), WPerC(100), HPerC(40));
  // listView.draw();
  
  
  itemName = makeInput("", 0, 50, 49, 10);
  itemName.style('font-size', 20+'px');
  
  itemUnit = makeInput("", 51, 50, 20, 10);
  itemUnit.style('font-size', 20+'px');

  itemType = makeButton("원재료",73, 50, 27, 10);
  itemType.mousePressed(itemTypeCB);
}

function downloadApkCB(){
  downloadFile("src/22sa.png");
}

function saveAndGoBackCB(){
  window.history.back();
}

let itemTypeI = 0;
let typeStr = ["원재료","비품","현금부식"];
function addItemCB(){
  // addItem.remove();
  listView.add(new lstItem(itemName.value(), itemUnit.value(), typeStr[itemTypeI]));
  itemUnit.value("");
  itemName.value("");
  //saveItem(listView.list);
}

function itemTypeCB(){ 
  itemTypeI = (itemTypeI+1)%3;
  itemType.html(typeStr[itemTypeI]);
}

// function draw(){
//   listView.update();
// }