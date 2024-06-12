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
  constructor(name, unit, kind, ent){
    this.name = name;
    this.unit = unit;
    this.kind = kind;
    this.entity = ent;
    if(ent == null){this.entity = 0;}
    this.update();
  }

  copy(){
    let a = new lstItem(this.name, this.unit, this.kind, this.entity);
    return a;
  }

  update(){
    if(this.entity == 0){
      this.show = this.name+' {x}'+this.unit;
    }else{
      this.show = this.name+' '+this.entity+this.unit;
    }
  }

  addEntity(){
    this.entity++;
    this.update();
  }

  toString(){
    return this.show;
  }

}

function rplcFUNC(form, key, v){
  let ret = form;
  if(form.indexOf(key) != -1){
    ret = form.replaceAll(key, v[key]);
  }
  return ret;
}

function replaceForm(form, v){
  let ret = form;
  Object.keys(v).forEach((e,i)=>{
    ret = rplcFUNC(ret, e, v);
  });
  return ret;
}

function initializeLocalSave(tag, val){
  let tmp = getItem(tag);
  if(tmp == null){storeItem(tag, val);}
}

function lstItemList(objList){
  let ret = [];
  objList.forEach((e,i) => {
    ret.push(new lstItem(e.name, e.unit, e.kind, e.entity));
  });
  return ret;
}

function rectHTML(x,y,w,h){
  return 'width:'+w+'px; height:'+h+'px; position:relative; left:'+x+'px; top:'+y+'px;';
}

class ListView{

  constructor(name, lst, x, y, w, h){

    this.div = document.createElement('div');
    this.div.setAttribute('style', 'overflow-y:auto; overflow-x:hidden; '+rectHTML(x,y,w,h));
    this.div.style.backgroundColor = '#505050';

    this.name = name;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.list = lst;
    this.itemH = this.h/5;
    this.func = (ele,i)=>{console.log("selected "+i+" : "+ele);}
    listViewList.push(this);
    this.setList();
    document.querySelector('.body').append(this.div);
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
  } else if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)){ 
    window.open('sms://'+ph+'/;body='+str);
    return;
  } else {
    console.log('ph : '+ph+'\ntext : '+str)
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
  
  