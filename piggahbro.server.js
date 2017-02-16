//////////////////////////////////////////////////////////////////////
/*                                                                  */
/*         This is a addon to PiggahBroJS or piggahbro.js!          */
/* This script allows you to use Server-Side javascript using AJAX! */
/*                                                                  */
//////////////////////////////////////////////////////////////////////
/*                                                                  */
/*                             WARNING!                             */
/*                                                                  */
/* Please make sure you have piggahbro.js in use or this won't work */
/*                                                                  */
//////////////////////////////////////////////////////////////////////

PB.server = {
  getFile: function (type, opts) {
    
    // Tests for Http Request
    if (window.XMLHttpRequest) {
      var xhttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
      console.error('This library does not support your browser!');
    };
    if(opts && xhttp){
      // Set onReady function
      xhttp.onreadystatechange = function(){
        if (xhttp.readyState === XMLHttpRequest.DONE) {
          if(opts.onready) {
            opts.onready(xhttp);
          } else if(opts.onreadystatechange){
            opts.onreadystatechange(xhttp);
          };
        }
      };
      // Set functions
      if(opts.onload){
        xhttp.onload = opts.onload(xhttp);
      };
      if(opts.onloadstart){
        xhttp.onloadstart = opts.onloadstart(xhttp);
      };
      if(opts.onloadend){
        xhttp.onloadend = opts.onloadend(xhttp);
      };
      if(opts.onprogress){
        xhttp.onprogress = opts.onprogress(xhttp);
      };
      if(opts.onerror){
        xhttp.onerror = opts.onerror(xhttp);
      };
      if(opts.onabort){
        xhttp.onabort = opts.onabort(xhttp);
      };
      if(opts.ontimeout){
        xhttp.ontimeout = opts.ontimeout(xhttp);
      };
      
      xhttp.withCredentials = opts.withCredentials || false;
      
      // Open URL
      xhttp.open(type, opts.url, true);
      
      // Set headers
      if(opts.headers){
        for(i=0; i<(opts.headers.length/2); i+2){
          xhttp.setRequestHeader(opts.headers[i], opts.headers[i+1]);
        }
      };
      
      // Send request
      xhttp.send(opts.request || null);
      
      // Return request
      return xhttp;
    };
  }
};

/*
EXAMPLE:

PB.server.getFile('GET', {
  url: 'http://piggahbrostudios.github.io/project/piggahbrojs/piggahbro.js',
  headers: ['Content-Type', 'text/js'],
  onready: function(xhttp){
    if (xhttp.status === 200) {
      alert(xhttp.responseText);
    } else if(xhttp.status === 404) {
      alert('There was a 404 error');
    } else {
      alert('There was a problem with the request.\n\nCheck the console to know why.');
    };
  }
});

*/
