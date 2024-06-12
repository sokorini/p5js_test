
// integ : sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4

let listView;
let addItem;
let itemType;
let itemName;
let itemUnit;
let listlist = [];
let itemTypeI = 0;
let typeStr;

function setup() {

  typeStr = getItem('typeStr');

  for(let i = 0 ; i < typeStr.length ; i++){
      listlist.push(lstItemList(getItem(typeStr[i]+'List')));
  }

  let saveAndGoBack = makeButton("저장하고 돌아가기", 0, 90, 100, 10);
  saveAndGoBack.mousePressed(saveAndGoBackCB);

  addItem = makeButton("추가하기", 73, 52, 27, 10);
  addItem.mousePressed(addItemCB);
  

  
  listView = new ListView("listview1", listlist[0], 
                          0, 0, WPerC(100), HPerC(40));
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
  
  
  itemName = makeInput("", 0, 52, 49, 10);
  itemName.style('font-size', 20+'px');
  
  itemUnit = makeInput("", 51, 52, 20, 10);
  itemUnit.style('font-size', 20+'px');

  itemType = makeButton("눌러서 변경 : "+"원재료",0, 0, 100, 9);
  itemType.mousePressed(itemTypeCB);
}


function saveAndGoBackCB(){
  for(let i = 0 ; i < typeStr.length ; i++){
    storeItem(typeStr[i]+'List', listlist[i]);
  }
  window.history.back();
}



function addItemCB(){
  let tmp = new lstItem(itemName.value(), itemUnit.value(), typeStr[itemTypeI]);
  listView.add(tmp);
  listlist[itemTypeI] = listView.list;
  
  itemUnit.value("");
  itemName.value("");
}

function itemTypeCB(){ 
  itemTypeI = (itemTypeI+1)%typeStr.length;
  itemType.html("눌러서 변경 : "+typeStr[itemTypeI]);

  listView.setList(listlist[itemTypeI]);
}

// function draw(){
//   listView.update();
// }