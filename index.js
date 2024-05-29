
// integ : sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4
let mark22;
function preload() {
  mark22 = loadImage('src/22sa.png');
}

function setup() {
  //console.log(Kakao.isInitialized());
  //loginWithKakao();

  fullscreen();
  createCanvas(windowWidth, windowHeight);

  background(220);
  image(mark22,WPerC(40), 0, WPerC(20), HPerC(10));
  textSize(HPerC(5));
  textAlign(CENTER, CENTER);
  text("용촌", WPerC(20), 5, WPerC(20), HPerC(10));
  text("회관", WPerC(60), 5, WPerC(20), HPerC(10));

  textSize(HPerC(3));
  text("발주", 0, HPerC(10)+5, WPerC(100), HPerC(10));
  
  let manageItems = makeButton("품목 관리", 0, 20, 30, 10);
  let sendItemList = makeButton("발주 보내기", 30, 20, 70, 10);
  manageItems.mousePressed(manageItemsCB);
  sendItemList.mousePressed(sendItemListCB);
  
}


function manageItemsCB(){
  window.location.href = "manageItems.html";
}

function sendItemListCB(){

}
