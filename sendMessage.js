

let typeStr;
retlist = [];
let lastCheck;
let baljuForm;
let sms;

function setup(){

    //Kakao.init('b51bfef3753534fcfa367493f328e390'); // 사용하려는 앱의 JavaScript 키 입력

    // console.log(Kakao.isInitialized());

    noCanvas();
    typeStr = getItem('typeStr');

    for(let i = 0 ; i < typeStr.length ; i++){
        retlist.push(lstItemList(getItem(typeStr[i]+'Table')));
    }

    ret = "";

    baljuForm = getItem('balju form');

    for(let i = 0 ; i < typeStr.length ; i++){
        let items = '';
        for(let ii = 0; ii < retlist[i].length ; ii++){
            if(ii != 0){items += '\n';}
            items += retlist[i][ii].toString();
        }
        if(items != ''){
            ret += replaceForm(baljuForm,
                {
                    "{tag}" : typeStr[i], 
                    '{items}' : items
                });
        }
    }

    console.log(ret);

    let body = document.querySelector('.body');
    body.innerHTML +=   "<textarea id='txtArea' style='"+
                        rectHTML(0, HPerC(10), WPerC(100), HPerC(70))+
                        "'>"+ret+"</textarea>";

    let ph = getItem('sms ph');

    let cpy = makeButton("클립보드에 복사하기", 1, 80, 32, 10);
    sms = makeButton("SMS 문자 전송\n없음", 34, 80, 32, 10);
    let shr = makeButton("공유하기", 67, 80, 32, 10);
    cpy.mousePressed(cpyCB);
    sms.mousePressed(smsCB);
    shr.mousePressed(shareCB);
    if(ph != null){
        sms.html("SMS 문자 전송\n"+ph);
    }
}

function cpyCB(){
    let textarea = document.getElementById('txtArea');
    copyStringToClipboard(textarea.value);
}

function smsCB(){
    let ph = getItem('sms ph');
    if(ph == null){    
        ph = prompt('지정된 전화번호가 없습니다.\n전화번호를 입력해주세요.', '');
        if (ph != null){
            storeItem('sms ph', ph);
            sms.html("SMS 문자 전송\n"+ph);
        }
        storeItem('sms ph', ph);
    }
    if(ph == null){
        alert('전화번호를 입력해주세요.');
    }else{
        let conf = window.confirm('전화번호 : "'+ph+'" 에 다음 내용을 전송합니까?');
        if(conf){
            let textarea = document.getElementById('txtArea');
            openSMS(ph, textarea.value);
        }else{
            ph = prompt('다른 전화번호를 등록합니다.\n전화번호를 입력해주세요.', '');
            
            if (ph != null){
                storeItem('sms ph', ph);
                sms.html("SMS 문자 전송\n"+ph);
            }
        }
    }
}

function shareCB(){
    let textarea = document.getElementById('txtArea');
    navigator.share({
        text: textarea.value
    });
}