var DS = { // Piggah Bro's Data Store
  CTXs: {},
  Saves: {},
};

var PB = {
  math: {
    area: {
      square: function(x) {
        return x * x;
      },
      rect: function(b, h) {
        return b * h;
      },
      trap: function(opts) {
        var b = opts.base1 + opts.base2;
        return opts.height / 2 * b;
      },
      ellipse: function(opts) {
        return Math.PI * opts.radius1 * opts.radius2;
      },
      circle: function(r) {
        var r2 = r * r;
        return Math.PI * r2;
      },
      triangle: function(opts) {
        var x = opts.base * opts.height;
        return 0.5 * x;
      },
      formula: {
        square: function() {
          return "x*x";
        },
        rect: function() {
          return "b*h";
        },
        trap: function() {
          return "h/2(b1+b2)";
        },
        ellipse: function() {
          return "Pi*r1*r2";
        },
        circle: function() {
          return "Pi*r2";
        },
        triangle: function() {
          return "1/2(b*h)";
        }
      }
    }
  },
  save: function(obj) {
    if (document.getElementById(obj)) {
      if (DS.Saves[obj] === undefined || null) {
        DS.Saves[obj] = document.getElementById(obj);
        console.log(obj + " has been saved!");
      } else {
        console.info(obj + " has already been saved!");
      }
    } else {
      console.error(obj + " is not a node!");
    }
  },
  load: function(obj, loc) {
    if (DS.Saves[obj]) {
      if (document.getElementById(obj)) {
        console.info(obj + " has already been loaded or was never removed!");
      } else {
        (document.getElementById(loc) || document.body).appendChild(DS.Saves[obj]);
        console.log(obj + " has been loaded!");
      }
    } else {
      console.error(obj + " is not a saved node!");
    }
  },
  remove: function(obj, loc) {
    if (document.getElementById(obj)) {
      var object = document.getElementById(obj);
      (document.getElementById(loc) || document.body).removeChild(document.getElementById(obj));
      console.log(obj + " has been removed!");
    } else {
      console.info(obj + " either isn't a node or has already been removed!");
    }
  },
  create: function(opts) {
    var Location = document.getElementById(opts.target) || document.body;
    var element = document.createElement(opts.type);
    element.id = opts.id || "my" + opts.type;
    element.style.width = opts.width + "px" || window.width + "px";
    element.style.height = opts.height + "px" || window.height + "px";
    element.style.backgroundColor = opts.BGcolor || "black";
    element.style.fontSize = opts.fontSize + "px" || "16px";
    element.style.color = opts.textColor || "black";
    element.innerHTML = opts.text || "";
    Location.appendChild(element);
    if (opts.type === "canvas") {
      DS.CTXs[opts.ctx.name] = element.getContext("2d");
    }
    return element;
  },
  draw: {
    circle: function(opts) {
      var CTX = DS.CTXs[opts.ctx];
      CTX.fillStyle = opts.BGcolor;
      CTX.beginPath();
      CTX.arc(opts.x, opts.y, opts.radius, 0, 2 * Math.PI);
      CTX.fill();
      return CTX;
    },
    rect: function(opts) {
      var CTX = DS.CTXs[opts.ctx];
      CTX.fillStyle = opts.BGcolor;
      CTX.fillRect(opts.x, opts.y, opts.width, opts.height);
    },
    square: function(opts) {
      var CTX = DS.CTXs[opts.ctx];
      CTX.fillStyle = opts.BGcolor;
      CTX.fillRect(opts.x, opts.y, opts.size, opts.size);
    },
    text: function(opts) {
      var CTX = DS.CTXs[opts.ctx];
      CTX.font = opts.size || "16" + "px " + opts.font || "Arial";
      CTX.fillText(opts.text, opts.x, opts.y);
    }
  }
};
