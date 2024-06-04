

function setup(){
    window.resizeTo(window.parent.innerWidth/10, windowHeight);
    window.addEventListener('message', makeButtonList, false);
    for(let i = 0 ; i < 10 ; i++){
        let btn = makeButton("btn"+i, 0, 40*i, windowWidth, 40);
    }
}

function makeButtonList(event){
    // event -> {str_list, itemHeight, callback}
    event.data.str_list.forEach((e,i) => {
        let btn = makeButton("btn"+i, 0, event.data.itemHeight*i, windowWidth, event.data.itemHeight);
        let locali = i;
        btn.mousePressed(()=>{ event.data.callback(locali); });
        window.parent.postMessage(locali, "*");
    });
}