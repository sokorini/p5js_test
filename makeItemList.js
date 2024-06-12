

let itemType;
let listlist = [];
let retlist = [];

let itemTypeI = 0;
let typeStr;

function setup(){
    typeStr = getItem('typeStr');

    for(let i = 0 ; i < typeStr.length ; i++){
        listlist.push(lstItemList(getItem(typeStr[i]+'List')));
        retlist.push(lstItemList(getItem(typeStr[i]+'Table')));
    }





    sendMessage = makeButton("발주 보내기", 0, 91, 100, 9);
    sendMessage.mousePressed(sendMessageCB);

    itemType = makeButton("눌러서 변경 : "+"원재료",0, 0, 100, 9);
    itemType.mousePressed(itemTypeCB);

    listView1 = new ListView("listView1", listlist[0], 0, 0, WPerC(100), HPerC(40));
    listView2 = new ListView("listView2", retlist[0], 0,HPerC(1), WPerC(100), HPerC(40)); // retlist[0]

    listView1.onSelected((ele,i)=>{
        let flag = true;
        listView2.list.forEach((e,i) => {
            if(e.name === ele.name && e.unit === ele.unit){
                e.addEntity(); 
                listView2.setList();
                flag = false;
            }
        });
        if(flag){
            let tmp = ele.copy();
            tmp.addEntity();
            listView2.add(tmp);
            
        }
    });

    listView2.onSelected((ele,i)=>{
        ele.entity--;
        ele.update();
        if(ele.entity == 0){
            let l = [];
            listView2.list.forEach((e,ii) => {
                if(ii != i){ l.push(e); }
            });
            listView2.setList(l);
            retlist[itemTypeI] = l;
        }
        listView2.setList();
    });
}


function itemTypeCB(){
    itemTypeI = (itemTypeI+1)%typeStr.length;
    itemType.html("눌러서 변경 : "+typeStr[itemTypeI]);

    listView1.setList(listlist[itemTypeI]);
    listView2.setList(retlist[itemTypeI]);
}

function sendMessageCB(){
    for(let i = 0 ; i < typeStr.length ; i++){
        storeItem(typeStr[i]+'Table', retlist[i]);
    }
    window.location.href = "sendMessage.html";
}