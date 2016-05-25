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
  file: {
    create: function(content, opts) {
      // Generate data
      var d = new Date()
      var newBlob = new Blob([content], {
        type: "octet/stream"
      });

      if (opts && opts.download && opts.download === true) {
        PB.file.download(newBlob, opts.name);
        return newBlob;
      } else {
        return newBlob;
      }
    },
    download: function(file, name) {
      c = confirm('Do you want to download ' + name + "?");
      if (c === true) {
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
    },
    read: function() {

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
