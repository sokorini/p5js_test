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
    this.parent = null;
    this.kind = kind;
    this.idx = 0;
  }

  draw(){
    if(this.kind === "원재료") fill(150, 255, 150);
    if(this.kind === "비품") fill(255, 150, 150);
    if(this.kind === "현금부식") fill(150, 150, 255);
    let tmp = this.parent.y + this.parent.itemH*this.idx + this.parent.scroll;
    rect(this.parent.x, tmp, this.parent.w, this.parent.itemH);
    textSize(this.parent.itemH/2);
    textAlign(LEFT, CENTER);
    fill(0);
    text(this.show, this.parent.x+5, tmp, this.parent.w-5, this.parent.itemH);
  }

  rect(){
    let tmp = this.parent.y + this.parent.itemH*this.idx + this.parent.scroll;
    return new Rectangle(this.parent.x, tmp, this.parent.w, this.parent.itemH);
  }
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
    this.itemH = this.h/5;
    listViewList.push(this);
    this.setList(lst);
  }

  setList(lst){
    let html = '';
    for(let i = 0 ; i < lst.length ; i++){
      let locali = i; 
      html += '<button onClick="listViewCB(\''+this.name+'\','+locali+')"'+
              ' style="'+rectHTML(0, 0, this.w, this.itemH)+'">'+
              lst[i]+'</button>';
    }

    // console.log(html);

    this.div.innerHTML = html;
    document.querySelector('.body').append(this.div);

  }

}

let listViewList = [];

function listViewCB(name, idx){
  console.log('selected'+idx );
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
  
  