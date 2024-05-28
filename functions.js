


function openSMS(ph, str){
  if(navigator.userAgent.match(/Android/i)){
    window.open('sms://'+ph+'/?body='+str);
  }
  if(navigator.userAgent.match(/iPad/i)){
    window.open('sms://01052293829/;body='+str);
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

