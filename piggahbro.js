var DS = function(content) {
  return content;
}

DS.prototype = {
  add: function(name, content) {
    this[name] = content || {};
  },
  remove: function(from, item) {
    delete from[item];
  }
}

var Saves = new DS();
var CTXs = new DS();

var PB = {
  application: {
    fullscreen: function(key, id){
      document.body.addEventListener('keyup', function(e){
        var elem = (document.getElementById(id) || id || document.body);
        elem.requestFullScreen = elem.requestFullscreen || elem.msRequestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullscreen;
        if(e.keyCode === key){
          elem.requestFullScreen();
        }
      });
    },
		pointerLock: function(key, id){
		  document.body.addEventListener('keyup', function(e){
        var elem = (document.getElementById(id) || id || document.body);
        elem.requestPointerLock = elem.requestPointerLock || elem.msRequestPointerLock || elem.mozRequestPointerLock || elem.webkitRequestPointerLock;
        if(e.keyCode === key){
          elem.requestPointerLock();
        }
      });
		}
	},
  keyCode: {
		"Backspace": 8,
		"Tab": 9,
		"Enter": 13,
		'Shift': 16,
		'Ctrl': 17,
		'Alt': 18,
		'Pause/Break': 19,
		'Caps_Lock': 20,
		"Escape": 27,
		"Space_Bar": 32,
		'Page_Up': 33,
		'Page_Down': 34,
		'End': 35,
		'Home': 36,
		'Left_Arrow': 37,
		'Up_Arrow': 38,
		'Right_Arrow': 39,
		'Down_Arrow': 40,
		"Insert": 45,
		"Delete": 46,
		"0": 48,
		"1": 49,
		"2": 50,
		"3": 51,
		"4": 52,
		"5": 53,
		"6": 54,
		"7": 55,
		"8": 56,
		"9": 57,
		"a": 65,
		"b": 66,
		"c": 67,
		"d": 68,
		"e": 69,
		"f": 70,
		"g": 71,
		"h": 72,
		"i": 73,
		"j": 74,
		"k": 75,
		"l": 76,
		"m": 77,
		"n": 78,
		"o": 79,
		"p": 80,
		"q": 81,
		"r": 82,
		"s": 83,
		"t": 84,
		"u": 85,
		"v": 86,
		"w": 87,
		"x": 88,
		"y": 89,
		"z": 90,
		"Left_Window_Key": 91,
		"Right_Window_Key": 92,
		"Select_Key": 93,
		"Numpad_0": 96,
		"Numpad_1": 97,
		"Numpad_2": 98,
		"Numpad_3": 99,
		"Numpad_4": 100,
		"Numpad_5": 101,
		"Numpad_6": 102,
		"Numpad_7": 103,
		"Numpad_8": 104,
		"Numpad_9": 105,
		"Multiply": 106,
		"Add": 107,
		"Subtract": 109,
		"Decimal_Point": 110,
		"Divide": 111,
		"f1": 112,
		"f2": 113,
		"f3": 114,
		"f4": 115,
		"f5": 116,
		"f6": 117,
		"f7": 118,
		"f8": 119,
		"f9": 120,
		"f10": 121,
		"f11": 122,
		"f12": 123,
		"Num_Lock": 144,
		"Scroll_Lock": 145,
		";": 186,
		"=": 187,
		",": 188,
		"-": 189,
		".": 190,
		"/": 191,
		"`"	: 192,
		"[": 219,
		"\\": 220,
		"]": 221,
    "'": 222,
  },
	file: {
		create: function(content, opts){
			// Generate data
			var newBlob = new Blob([content], {type: "octet/stream"});
			
			if(opts && opts.download && opts.download === true){
				PB.file.download(newBlob, opts.name);
				return newBlob;
			} else {
				return newBlob;
			}
		},
		download: function(file, name) {
      if(name !== null && name !== undefined){
        c = confirm('Do you want to download ' + name + "?");
        if(c === true){
          // Generate data
          url = window.URL.createObjectURL(file);
          
          //Create hidden link
          var a = document.createElement('a');
          a.style = "display: none";
          a.id = 'downloadLink';
          a.href = url;
          a.download = name;
          document.body.appendChild(a);
          
          // Download & Remove link
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(document.getElementById('downloadLink'));
        }
      } else {
        console.error('Please give a name to your file!');
      }
		},
		read: function(file){
      var reader = new FileReader();
      reader.addEventListener("loadend", function() {
        return reader.result;
      });
      reader.readAsArrayBuffer(file);
		}
	},
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
      if (Saves[obj] === undefined || null) {
        Saves[obj] = document.getElementById(obj);
        console.log(obj + " has been saved!");
      } else {
        console.info(obj + " has already been saved!");
      }
    } else if (Saves[obj]) {
      console.info(obj + " has already been saved!");
    } else {
      console.error(obj + " is not a node!");
    }
  },
  load: function(obj, loc) {
    if (Saves[obj]) {
      if (document.getElementById(obj)) {
        console.info(obj + " has already been loaded or was never removed!");
      } else {
        (document.getElementById(loc) || loc || document.body).appendChild(Saves[obj]);
        console.log(obj + " has been loaded!");
      }
    } else {
      console.error(obj + " is not a saved node!");
    }
  },
  remove: function(obj, loc) {
    if (document.getElementById(obj)) {
      var object = document.getElementById(obj);
      (document.getElementById(loc) || loc || document.body).removeChild(document.getElementById(obj));
      console.log(obj + " has been removed!");
    } else {
      console.info(obj + " either isn't a node or has already been removed!");
    }
  },
  create: function(opts) {
    var Location = document.getElementById(opts.target) || opts.target || document.body;
    // Tests to see if the type is a normal or special element.
    switch (opts.type) {
      case 'circle':
        var element = document.createElement("div");
        element.style.width = opts.radius * 2 + "px";
        element.style.height = opts.radius * 2 + "px";
        element.style.fontSize = opts.fontSize + "px" || opts.fontSize || "16px";
        element.style.color = opts.textColor || "black";
        element.style.borderRadius = opts.radius + "px" || opts.radius;
        break;
      case 'canvas':
        var element = document.createElement(opts.type);
        element.width = opts.width || window.width;
        element.height = opts.height || window.height;
        element.innerHTML = "Your browser does not support the HTML5 canvas tag.";

        CTXs[(opts.ctx || opts.id)] = element.getContext("2d");
        break;
      default:
        var element = document.createElement(opts.type);
        element.style.width = opts.width + "px" || window.width + "px";
        element.style.height = opts.height + "px" || window.height + "px";
        element.style.fontSize = opts.fontSize + "px" || "16px";
        element.style.color = opts.textColor || "black";
        element.src = opts.src;
        break;
    }

    // Default Attributes
    element.style.backgroundColor = opts.BGcolor || "";
    element.id = opts.id || "my" + opts.type;
    element.style.position = "absolute";
    element.innerHTML = opts.text || "";

    // Append, Log, & Return Element
    Location.appendChild(element);
    console.log(element.id + " has been created!");
    return element;
  },
  canvas: {
    draw: function(ctx, opts) {
      var CTX = CTXs[ctx];
      switch (opts.type) {
        case "circle":
          CTX.beginPath();
          CTX.fillStyle = opts.BGcolor;
          CTX.arc(opts.x, opts.y, opts.radius, 0, 2 * Math.PI);
          CTX.fill();
          return {
            "x": opts.x,
            "y": opts.y,
            "radius": opts.radius
          };
          break;
        case "ellipse":
          CTX.beginPath();
          CTX.fillStyle = opts.BGcolor;
          CTX.ellipse(opts.x, opts.y, opts.radiusX, opts.radiusY, opts.rotation * Math.PI / 180, 0, 2 * Math.PI);
          CTX.fill();
          return {
            "x": opts.x,
            "y": opts.y,
            "radiusX": opts.radiusX,
            "radiusY": opts.radiusY,
            "rotation": opts.rotation
          };
          break;
        case "rect":
          CTX.beginPath();
          CTX.fillStyle = opts.BGcolor;
          CTX.fillRect(opts.x, opts.y, opts.width, opts.height);
          return {
            "x": opts.x,
            "y": opts.y,
            "width": opts.width,
            "height": opts.height
          };
          break;
        case "square":
          CTX.beginPath();
          CTX.fillStyle = opts.BGcolor;
          CTX.fillRect(opts.x, opts.y, opts.size, opts.size);
          return {
            "x": opts.x,
            "y": opts.y,
            "width": opts.size,
            "height": opts.size
          };
          break;
        case "text":
          CTX.beginPath();
          CTX.font = opts.size || "16" + "px " + opts.font || "Arial";
          CTX.fillText(opts.text, opts.x, opts.y);
          return {
            "text": opts.text,
            "x": opts.x,
            "y": opts.y
          };
          break;
        case "line":
          CTX.beginPath();
          CTX.moveTo(opts.startX, opts.startY);
          CTX.lineTo(opts.endX, opts.endY);
          CTX.strokeStyle = opts.BGcolor;
          CTX.lineWidth = opts.width || 1;
          CTX.lineCap = opts.lineCap || "square";
          CTX.stroke();
          return {
            "moveTo": {
              "x": opts.startX,
              "y": opts.startY
            },
            "lineTo": {
              "x": opts.endY,
              "y": opts.endY
            }
          };
          break;
      }
    },
    clear: function(ctx, opts) {
      CTX = CTXs[ctx];
      switch (opts.type) {
        case "all":
          CTX.clearRect(0, 0, CTX.canvas.width, CTX.canvas.height);
          break;
        case "section":
          CTX.clearRect(opts.x, opts.y, opts.width, opts.height);
          break;
        default:
          CTX.clearRect(0, 0, CTX.canvas.width, CTX.canvas.height);
      }
    }
  }
};
