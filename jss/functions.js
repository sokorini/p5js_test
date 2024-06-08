class Rectangle{
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  containsPoint(x, y){
    return (this.x < x && this.w > x && this.y < y && this.h > y);
  }
}

class lstItem{
  constructor(name, unit, kind){
    this.show = name+' {x}'+unit;
    this.name = name;
    this.unit = unit;
    this.kind = kind;
  }

  toString(){
    return this.show;
  }

}

function lstItemList(objList){
  let ret = [];
  objList.forEach((e,i) => {
    ret.push(new lstItem(e.name, e.unit, e.kind));
  });
  return ret;
}


/*
    <iframe src="listView.html" 
            width="px" 
            height="180px" 
            frameBorder="0" 
            scrolling="yes" 
            id="testFrame" 
            style="position:relative;top:10px"></iframe>
*/
function rectHTML(x,y,w,h){
  return 'width:'+w+'px; height:'+h+'px; position:relative; left:'+x+'px; top:'+y+'px;';
}

class ListView{

  constructor(name, lst, x, y, w, h){

    this.div = document.createElement('div');
    this.div.setAttribute('style', 'overflow-y:auto; overflow-x:hidden; '+rectHTML(x,y,w,h));
    
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.list = lst;
    this.itemH = this.h/5;
    this.func = (str,i)=>{console.log("selected "+i+" : "+str);}
    listViewList.push(this);
    this.setList();
  }

  setList(lst){
    if(lst != null){
      this.list = lst;
    }

    let html = '';
    for(let i = 0 ; i < this.list.length ; i++){
      let locali = i;
      html += '<button onClick="listViewCB(\''+this.name+'\','+locali+')"'+
              ' style="'+rectHTML(0, 0, this.w, this.itemH)+'">'+
              this.list[i].toString()+'</button>';
    }
    this.div.innerHTML = html;
    document.querySelector('.body').append(this.div);

  }

  add(e){
    this.list.push(e);
    this.setList();
  }

  onSelected(f){
    this.func = f;
  }

  hide(){
    this.div.style.display = 'none';
  }

  show(){
    this.div.style.display = 'block';
  }
}

let listViewList = [];

function listViewCB(name, idx){
  for(let i = 0 ; i < listViewList.length ; i++){
    if(name === listViewList[i].name){
      let tmp = listViewList[i];
      tmp.func(tmp.list[idx], idx);
    }
  }
}


function downloadFileAt(filePath){
  var link = document.createElement('_a');
  link.href = filePath;
  link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
  link.click();
}

function makeInput(str, x,y,w,h){
  let inp = createInput(str);
  inp.position(WPerC(x), HPerC(y));
  inp.size(WPerC(w), HPerC(h));
  return inp;
}

function makeButton(str, x,y,w,h){
  let btn = createButton(str);
  btn.position(WPerC(x),HPerC(y));
  btn.size(WPerC(w),HPerC(h));
  return btn;
}

function WPerC(x){
  return windowWidth * x / 100;
}

function HPerC(x){
  return windowHeight * x / 100;
}

function openSMS(ph, str){ 
  if(navigator.userAgent.match(/Android/i)){
    window.open('sms://'+ph+'/?body='+str);
    return;
  } 
  if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)){ 
    window.open('sms://'+ph+'/;body='+str);
    return;
  } 
}
  
function copyStringToClipboard (str) {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
}
  
  