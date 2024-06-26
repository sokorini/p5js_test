
// integ : sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4
let mark22;
function preload() {
  mark22 = loadImage('src/22sa.png');
}

function setup() {
  //console.log(Kakao.isInitialized());
  //loginWithKakao();

  initLocalSaves();

  fullscreen();
  createCanvas(windowWidth, windowHeight);

  background(220);

  text("v1.6", 0,0,100,100);
  
  if(mark22.height*WPerC(20)/mark22.width > HPerC(10)){
    let tmp = mark22.width*HPerC(10)/mark22.height;
    image(mark22,WPerC(50)-tmp/2, 5, tmp, HPerC(10));
  }else{
    image(mark22,WPerC(40), 5, WPerC(20), mark22.height*WPerC(20)/mark22.width);
  }

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
  //openSMS("01052293829","SMS test");
  window.location.href = "makeItemList.html";
}


function initLocalSaves(){
  // item types
  initializeLocalSave('typeStr', ["원재료","비품","현금부식"]);
  
  let typeStr = getItem('typeStr');
  for(let i = 0 ; i < typeStr.length ; i++){
    initializeLocalSave(typeStr[i]+'List', []);
  }
  for(let i = 0 ; i < typeStr.length ; i++){
    initializeLocalSave(typeStr[i]+'Table', []);
  }

  initializeLocalSave('balju form', "\n({tag})\n\n{items}\n");
}