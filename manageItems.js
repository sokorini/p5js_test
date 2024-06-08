
// integ : sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4

let listView;
let addItem;
let itemType;
let itemName;
let itemUnit;
let listlist = [[],[],[]];

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

  addItem = makeButton("추가하기", 73, 50, 27, 10);
  addItem.mousePressed(addItemCB);
  
  // if([] != null){console.log('aaaaa');}

  listlist[0] = lstItemList(getItem('wonList'));
  listlist[1] = lstItemList(getItem('bipList'));
  listlist[2] = lstItemList(getItem('hyuList'));

  for(let i = 0 ; i < 3 ; i++){
    if(listlist[i] == null){
      listlist[i] = [];
    }else{
      console.log(listlist[i]);
    }
  }

  
  listView = new ListView("listview1", listlist[0], 
                          0, HPerC(10), WPerC(100), HPerC(40));
  listView.onSelected((str,i)=>{
    if(window.confirm('"'+str+'" 을(를) 삭제하시겠습니까?')){
      let l = [];
      listView.list.forEach((e,ii) => {
        if(ii != i){ l.push(e); }
      });
      listlist[itemTypeI] = l;
      listView.setList(l);
    }
  });
  
  
  itemName = makeInput("", 0, 50, 49, 10);
  itemName.style('font-size', 20+'px');
  
  itemUnit = makeInput("", 51, 50, 20, 10);
  itemUnit.style('font-size', 20+'px');

  itemType = makeButton("눌러서 변경 : "+"원재료",0, 0, 100, 9);
  itemType.mousePressed(itemTypeCB);
}


function saveAndGoBackCB(){
  storeItem('wonList', listlist[0]);
  storeItem('bipList', listlist[1]);
  storeItem('hyuList', listlist[2]);
  window.history.back();
}

let itemTypeI = 0;
let typeStr = ["원재료","비품","현금부식"];

function addItemCB(){
  let tmp = new lstItem(itemName.value(), itemUnit.value(), typeStr[itemTypeI]);
  listView.add(tmp);
  listlist[itemTypeI] = listView.list;
  
  itemUnit.value("");
  itemName.value("");
}

function itemTypeCB(){ 
  itemTypeI = (itemTypeI+1)%3;
  itemType.html("눌러서 변경 : "+typeStr[itemTypeI]);

  listView.setList(listlist[itemTypeI]);
}

// function draw(){
//   listView.update();
// }