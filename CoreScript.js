var PB = {
  set: {},
  create: { // Here you can see all my ".create" functions
    h: function(txt,s,c,id,loc) { 
      // in function under s, make it a number beteween 1-6
      var newH = document.createElement("H" + s || "H1");
      newH.id = id;
      newH.style.color = c || "black";
      newH.innerHTML = txt;
      (document.getElementById(loc) || document.body).appendChild(newH);
    },
    p: function(txt,s,c,id,loc) {
      var newP = document.createElement("p");
      newP.id = id;
      newP.style.fontSize = s + "px" || "16px";
      newP.style.color = c || "black";
      newP.innerHTML = txt;
      (document.getElementById(loc) || document.body).appendChild(newP);
    },
    div: function(w,h,c,id,loc) {
      var newDiv = document.createElement("div");
      newDiv.id = id;
      newDiv.style.width = w + "px";
      newDiv.style.height = h + "px";
      newDiv.style.backgroundColor = c;
      (document.getElementById(loc) || document.body).appendChild(newDiv);
    },
    canvas: function(w,h,c,id,loc) {
      var newCanvas = document.createElement("canvas");
      newCanvas.id = id;
      newCanvas.style.width = w + "px";
      newCanvas.style.height = h + "px";
      newCanvas.style.backgroundColor = c;
      (document.getElementById(loc) || document.body).appendChild(newCanvas);
    }
  }
}
