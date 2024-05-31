function setup(){
    let returnButton = makeButton("이전 페이지로 돌아가기", 30, 40, 40, 20);
    returnButton.mousePressed(returnButtonCB);
}

function returnButtonCB(){
    window.history.back();
}