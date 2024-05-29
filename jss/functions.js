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
  }

  draw(idx){
    if(this.kind === "원재료") fill(150, 255, 150);
    if(this.kind === "비품") fill(255, 150, 150);
    if(this.kind === "현금부식") fill(150, 150, 255);
    let tmp = this.parent.y + this.parent.itemH*idx + this.parent.scroll;
    rect(this.parent.x, tmp, this.parent.w, this.parent.itemH);
    textSize(this.parent.itemH/2);
    textAlign(LEFT, CENTER);
    fill(0);
    text(this.show, this.parent.x+5, tmp, this.parent.w-5, this.parent.itemH);
  }
}

class ListView{
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.itemH = 50;
    this.color = 100;
    this.list = [];
    this.neverscrolled = true;
    this.scroll = 0;
    this.scrollSpd = 0;
    this.startScroll = false;
    this.pmouseIsPressed = false;
    this.contentHeight = 0;
  }

  draw(){
    push();
    fill(this.color);
    rect(this.x,this.y,this.w,this.h);
    clip(()=>{rect(this.x,this.y,this.w,this.h);})
    this.list.forEach((e, i)=>{
      e.draw(i);
    });
    pop();
  }

  rect(){
    return new Rectangle(this.x, this.y, this. w, this.h);
  }

  listSelected(){
    
    
  }

  update(){
    if(mouseIsPressed){
      if(this.rect().containsPoint(mouseX, mouseY) &&
          this.rect().containsPoint(pmouseX, pmouseY)){
        if(mouseY-pmouseY != 0){
          this.startScroll = true;
          this.neverscrolled = false;
        }
      }
      if(this.startScroll){ 
        this.scrollSpd = mouseY-pmouseY;
        this.scroll += this.scrollSpd;
      }
      
    }else{
      this.startScroll = 0;
      if(this.scrollSpd > 0){
        this.scrollSpd = this.scrollSpd-HPerC(0.1);
      }else if(this.scrollSpd < 0){
        this.scrollSpd = this.scrollSpd+HPerC(0.1);
      }
      if(this.scrollSpd < HPerC(0.1) && this.scrollSpd > -HPerC(0.1)){ this.scrollSpd = 0; }
      this.scroll += this.scrollSpd;
      if(this.scroll < this.h - this.contentHeight){
        this.scroll = this.h - this.contentHeight;
      }
      if(this.scroll > 0) { 
        this.scroll = 0; 
      }
      
      if(this.neverscrolled){
        if(this.pmouseIsPressed){ this.listSelected(); }
      }else{
        this.neverscrolled = true;
      }
    }
    this.pmouseIsPressed = mouseIsPressed;
    listView.draw();
  }

  add(e){
    this.list.push(e);
    this.contentHeight = this.list.length * this.itemH;
    e.parent = this;
  }
}

function isMouseIn(rct){

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
    }
    if(navigator.userAgent.match(/iPhone/i)){ 
      window.open('sms://'+ph+'/;body='+str);
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
  
  