var DS = { // Piggah Bro's Data Store
	CTXs: [],
	Saves: [],
}

var PB = {
  save: function (obj){
    if (DS.Saves.length == 0){
      DS.Saves.push(obj);
    } else {
      for (i=0;i<DS.Saves.length;i++){
        if(obj != DS.Saves[0]){
          DS.Saves.push(obj);
        } else {
          return;
        }
      }
    }
  },
  load: function (num, loc){
  (loc || document.body).appendChild(DS.Saves[num]);
  },
  remove: function (obj, loc){
  (loc || document.body).removeChild(obj);
  },
  set: {
    sizeMode: "px",
  },
  create: { // Here you can see all my ".create" functions
    h: function(txt,s,c,id,loc) { 
      // in function under s, make it a number beteween 1-6
      var newH = document.createElement("H" + s || "H1");
      newH.id = id;
      newH.style.color = c || "black";
      newH.innerHTML = txt;
      (document.getElementById(loc) || document.body).appendChild(newH);
      return newH;
    },
    p: function(txt,s,c,id,loc) {
      var newP = document.createElement("p");
      newP.id = id;
      newP.style.fontSize = s + "px" || "16px";
      newP.style.color = c || "black";
      newP.innerHTML = txt;
      (document.getElementById(loc) || document.body).appendChild(newP);
      return newP;
    },
    div: function(w,h,c,id,loc) {
      var newDiv = document.createElement("div");
      newDiv.id = id;
      newDiv.style.width = w + "px";
      newDiv.style.height = h + "px";
      newDiv.style.backgroundColor = c;
      (document.getElementById(loc) || document.body).appendChild(newDiv);
      return nweDiv;
    },
    canvas: function(w,h,c,id,loc) {
      var newCanvas = document.createElement("canvas");
      newCanvas.id = id;
      newCanvas.style.width = w + "px";
      newCanvas.style.height = h + "px";
      newCanvas.style.backgroundColor = c;
      (document.getElementById(loc) || document.body).appendChild(newCanvas);
      return newCanvas;
    },
  ctx: {
      new: function(cnvs) {
        var newCTX = document.getElementById(cnvs).getContext("2d");
        DS.CTXs.push(newCTX);
        return newCTX;
      },
      filledCircle: function(x,y,r,c,ctx){
        var CTX = ctx || DS.CTXs[0]
        CTX.fillStyle = c;
        CTX.beginPath();
        CTX.arc(x,y,r,0,2*Math.PI);
        CTX.fill();
        return CTX;
      }
    }
  }
}
