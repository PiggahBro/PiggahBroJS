/*       This is a addon to PiggahBroJS or piggahbro.js!        */
/* This script allows you to make javascript act like a server! */

PB.server = {
  viewFile: function (opts) {
    
    if (window.XMLHttpRequest) {
      var xhttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
      console.error('This library does not support your browser!');
    };
    xhttp.onreadystatechange = function(){
      if (xhttp.readyState === XMLHttpRequest.DONE) {
        if (xhttp.status === 200) {
          alert(xhttp.responseText);
        } else {
          alert('There was a problem with the request.\n\nCheck the console to know why.');
        }
      }
    };
    xhttp.open('GET', opts.url);
    xhttp.setRequestHeader('Content-Type', 'text/js');
    xhttp.send();
    
    return xhttp;
  },
};
