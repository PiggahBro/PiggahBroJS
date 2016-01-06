var DS = { // Piggah Bro's Data Store
  CTXs: [],
  Saves: [],
};

var PB = {
  math: {
    area: {
      square: function(x) {
        return x*x;
      },
      rect: function(b,h) {
        return b*h;
      },
      trap: function(opts){
        var b = opts.base1 + opts.base2;
        return opts.height/2*b;
      },
      ellipse: function(opts){
        return Math.PI*opts.radius1*opts.radius2;
      },
      circle: function(r){
        var r2 = r*r;
        return Math.PI*r2;
      },
      triangle: function(opts){
        var x = opts.base*opts.height;
        return 0.5*x;
      },
      formula: {
        square: function() {
          console.log("x*x");
        },
        rect: function() {
          console.log("b*h");
        },
        trap: function(){
          console.log("h/2(b1+b2)");
        },
        ellipse: function(){
          console.log("Pi*r1*r2");
        },
        circle: function(){
          console.log("Pi*r2");
        },
        triangle: function(){
          console.log("1/2(b*h)");
        }
      }
    }
  },
  save: function (obj){
    if (DS.Saves.length === 0){
      DS.Saves.push(obj);
      console.log(obj + " has been saved!");
    } else {
      for (i=0;i<DS.Saves.length;i++){
        if(obj != DS.Saves[i]){
          DS.Saves.push(obj);
          console.log(obj + " has been saved!");
        } else {
          console.log(obj + " is already saved!");
        }
      }
    }
  },
  load: function (num, loc){
    if (DS.Saves.length > 0){
      (loc || document.body).appendChild(DS.Saves[num]);
      return console.log(DS.Saves[num] + " has been loaded!");
    } else {
      console.log("There is no item saved here!");
    }
  },
  remove: function (obj, loc){
    (loc || document.body).removeChild(obj);
    console.log(obj + " has been removed!");
  },
  create: function(opts){
    var Location = document.getElementById(opts.target) || document.body;
    var element = document.createElement(opts.type);
    element.id = opts.id || "my" + opts.type;
    element.style.width = opts.width + "px" || window.width + "px";
    element.style.height = opts.height + "px" || window.height + "px";
    element.style.backgroundColor = opts.BGcolor || "";
    element.style.fontSize = opts.fontSize + "px" || "16px";
    element.style.color = opts.textColor || "black";
    element.innerHTML = opts.text || "";
    Location.appendChild(element);
    if (opts.type === "canvas"){
      var newCTX = element.getContext("2d");
      DS.CTXs.push(newCTX);
    }
    return element;
  },
  draw: {
    circle: function(opts){
      var CTX = DS.CTXs[opts.ctx];
      CTX.fillStyle = opts.BGcolor;
      CTX.beginPath();
      CTX.arc(opts.x,opts.y,opts.radius,0,2*Math.PI);
      CTX.fill();
      return CTX;
    },
    rect: function(opts){
      var CTX = DS.CTXs[opts.ctx];
      CTX.fillStyle = opts.BGcolor;
      CTX.fillRect(opts.x,opts.y,opts.width,opts.height);
    },
    square: function(opts){
      var CTX = DS.CTXs[opts.ctx];
      CTX.fillStyle = opts.BGcolor;
      CTX.fillRect(opts.x,opts.y,opts.size,opts.size);
    },
    text: function(opts){
      var CTX = DS.CTXs[opts.ctx];
      CTX.font = opts.size || "16" + "px " + opts.font || "Arial";
      CTX.fillText(opts.text,opts.x,opts.y);
    }
  }
};
