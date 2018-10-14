let currentSelection = 0;
let counter = 0;
let timeoutID = 0;

const palette1=[["#d35400","#c0392b","#9b59b6","#2980b9","#1abc9c","#27ae60"],["#e67e22","#e74c3c","#8e44ad","#3498db","#16a085","#2ecc71"]];
const palette2=[["#f08080","#f1c40f", "#ecf0f1","#95a5a6","#34495e","#1b2631"],["#e9967a", "#f39c12", "#bdc3c7","#7f8c8d","#2c3e50","#17202a"]];
const palette=["#d35400","#c0392b","#9b59b6","#2980b9","#1abc9c","#27ae60","#e67e22","#e74c3c","#8e44ad","#3498db","#16a085","#2ecc71",
"#f08080","#f1c40f", "#ecf0f1","#95a5a6","#34495e","#1b2631","#e9967a", "#f39c12", "#bdc3c7","#7f8c8d","#2c3e50","#17202a"];
let grid = [];

let imageObj = new Image();
imageObj.src = 'uploads/image.png';
imageObj.onload = function() {
  startGame();
}

//buildGrid(int numSquares) takes in an int for the length of width and height of coloring grid and creates a grid based on image given
function buildGrid(numSquares) {
  let canvas = document.getElementById('myCanvas');
  let context = canvas.getContext('2d');
  const sideLength = Math.max(imageObj.height, imageObj.width);

  canvas.height = sideLength;
  canvas.width = sideLength;

  context.drawImage(imageObj, 0, 0, sideLength, sideLength);

  let imageData = context.getImageData(0, 0, sideLength, sideLength);
  let data = imageData.data;

  context.clearRect(0, 0, canvas.width, canvas.height);
  // "blurring" image through averaging colors

  let gridSideLength = Math.floor(sideLength / numSquares);
  let gridColors = [];
  
  for (let i = 0; i < numSquares; i++) {
    let l = data[i*30];
    // col of grid
    gridColors.push([]);
    for (let j = 0; j < numSquares; j++) {
      let rgb = {r:0,g:0,b:0};
      let count = 0;

      for (let y = 0; y < gridSideLength; y++) {
        // pixel col
        for (let x = 0; x < gridSideLength; x++) {
          rgb.r += data[4 * ((j * gridSideLength) + (i * gridSideLength * sideLength) + (y * sideLength) + x)];
          rgb.g += data[4 * ((j * gridSideLength) + (i * gridSideLength * sideLength) + (y * sideLength) + x) + 1];
          rgb.b += data[4 * ((j * gridSideLength) + (i * gridSideLength * sideLength) + (y * sideLength) + x) + 2];
          count++;
        }
      }

      rgb.r = Math.floor(rgb.r / count);
      rgb.g = Math.floor(rgb.g / count);
      rgb.b = Math.floor(rgb.b / count);

      gridColors[i].push({r:rgb.r, g:rgb.g, b:rgb.b});
    }
  }

  for (let c = 0; c < gridColors.length; c++) {
    grid.push([]);
      for (let r = 0; r < gridColors.length; r++) {
          let allPalletes = [].concat.apply([], palette1.concat(palette2));
          let min = {
            index: -1,
            distance: 1
          };
          let imageColour = gridColors[c][r];
          // console.log(min, c, r);
          for (let i = 0; i < allPalletes.length; i++) {
            let rgbPalleteColour = hexToRgb(allPalletes[i]);
            let colourDistance = Math.sqrt(Math.pow(rgbPalleteColour.r-imageColour.r, 2)+Math.pow(rgbPalleteColour.g-imageColour.g, 2)+Math.pow(rgbPalleteColour.b-imageColour.b, 2))/Math.sqrt(Math.pow(255, 2)*3);
            if (colourDistance < min.distance) {
              min = {
                index: i,
                distance: colourDistance
              };
            }
          }
          //creates 2D array to store information of the drawn grid
          grid[c].push({ x:0, y:0, n: min.index + 1, status: 0 });
      }
  }
}
/*
let testGrid = [[{r : 13, g : 14, b : 15},{r : 13, g : 14, b : 15},{r : 13, g : 14, b : 15}],
[{r : 13, g : 14, b : 15},{r : 13, g : 14, b : 15},{r : 13, g : 14, b : 15}],
[{r : 13, g : 14, b : 15},{r : 13, g : 14, b : 15},{r : 13, g : 14, b : 15}]];
*/

function createCanvas() {
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  document.body.insertBefore(canvas, document.body.childNodes[0]);
  canvas.setAttribute('id', "myCanvas");
  canvas.addEventListener("click", mouseAction);
  canvas.addEventListener("mousedown", function(){
      canvas.addEventListener("mousemove", mouseAction, true)
  });

  canvas.addEventListener("mouseup", function(){
      canvas.removeEventListener("mousemove", mouseAction, true)
  });
  
  $.ajaxSetup({
      async: false
  });
  $.getJSON("difficulty.json", function(json) {
    buildGrid(json.dimension);
    canvas.width = screen.width;
    canvas.height = window.innerHeight
  })
}

function startGame() {
    // myGameArea.start();
    createCanvas();
    let canvas = document.getElementById("myCanvas");
    drawGrid(grid, false);

    drawPalette(palette1,[0,0], 0);
    drawPalette(palette2,[canvas.width - (2 * (canvas.height / palette2[0].length)),0], 12);
}

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function drawPalette(arr, posn, offset) {
    let fontSize = "20px";
    let canvas = document.getElementById("myCanvas");
    let context = canvas.getContext("2d");
    let squareLen = canvas.height / 6;
    for (let r = 0; r < 6; r++) {
        let posn1 = posn;
        for (let c = 0; c < 2; c++) {
            let element = (c * 6) + r + 1 + offset;

            context.beginPath();

            context.rect(posn1[0] + (squareLen * c), posn1[1] + (squareLen * r), squareLen, squareLen);
            context.fillStyle = arr[c][r];
            context.fill();

            context.closePath();
            context.beginPath();

            context.rect(posn1[0] + (squareLen * c), posn1[1] + (squareLen * r), squareLen / 6, squareLen / 6);
            context.fillStyle = "white"
            context.fill();

            context.closePath();
            context.beginPath();

            context.rect(posn1[0] + (squareLen * c), posn1[1] + (squareLen * r), squareLen, squareLen);
            if (currentSelection == parseInt(element)) {
                context.lineWidth=3;
            }

            context.stroke();
            context.lineWidth=1;
            context.font = fontSize + " serif";
            context.textAlign = "left"
            context.textBaseline = "hanging";
            context.fillStyle = "black"
            context.fillText(element, posn1[0] + (squareLen * c), posn1[1] + (squareLen * r), squareLen, squareLen);
            context.closePath();
        }
    }
}

function drawGrid(arr, finished) {
    let myGameArea = document.getElementById("myCanvas");
    let context = myGameArea.getContext("2d");
    let r=0;
    const halfWidth=myGameArea.width / 2;
    const halfHeight=myGameArea.height / 2;
    const squareLen=myGameArea.height/arr.length;

    if (finished ){
        var centre=[myGameArea.width/4,halfHeight];
    } else { 
        var centre = [halfWidth, halfHeight];
    }

    let fontSize = "20px";
    for (let row of arr) {
        let posn=[centre[0] - halfHeight, centre[1] - halfHeight + squareLen * r];
        for (let num of row) {
            let element=num.n.toString();

            context.beginPath();

            if (num.status == 1) {
                context.rect(posn[0], posn[1], squareLen, squareLen);
                context.fillStyle = palette[num.n - 1];
                context.fill();
                context.stroke();

            } else {
                context.rect(posn[0], posn[1], squareLen, squareLen);
                context.fillStyle = "#ffffff"
                context.fill();
                context.stroke();
                context.font = fontSize + " serif";
                context.textAlign = "left"
                context.textBaseline = "hanging";
                context.fillStyle = "black"
                context.fillText(element, posn[0], posn[1]);
            }

            context.closePath();


            num.x = posn[0];
            num.y = posn[1];

            posn[0] = posn[0] + squareLen;
        }
        r++;
    }

    if (finished) {
        context.drawImage(imageObj, halfWidth-0.014*myGameArea.width, 0, halfWidth, myGameArea.height);
    }
}


function mouseAction(e) {
    let canvas = document.getElementById('myCanvas');
    const squareLen = canvas.height / grid.length;
    let x = e.layerX;
    let y = e.layerY;
    let c = Math.floor((x - ((canvas.width / 2) - canvas.height / 2)) / squareLen);
    let r = Math.floor(y / squareLen);

    let paletteLen = canvas.height / (palette1[0].length);
    let c2 = Math.floor(x / paletteLen);
    let r2 = Math.floor(y / paletteLen);

    if (x <= paletteLen * 2) {
        currentSelection = (c2 * 6) + r2 + 1;
    } else if (x >= canvas.width - (paletteLen * 2)) {
        c2 = Math.floor((x - canvas.width + (paletteLen * 2)) / paletteLen);
        currentSelection = (c2 * 6) + r2 + 1 + 12;
    } else if (grid[r][c].n == currentSelection && grid[r][c].status == 0) {
        grid[r][c].status = 1;
        counter++;
    }

    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(grid, false);
    drawPalette(palette1,[0,0], 0);
    drawPalette(palette2,[canvas.width - (2 * (canvas.height / palette2[0].length)),0], 12);
    checkFinished();
}

function checkFinished() {
  let canvas = document.getElementById('myCanvas');
  let context = canvas.getContext("2d");
  if (counter == grid.length*grid.length) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(grid, true);
    // context.beginPath();
    // context.lineWidth=1;
    // context.font = "100px serif";
    // context.textAlign = "left"
    // context.textBaseline = "hanging";
    // context.fillStyle = "black"
    // context.fillText("YOU WIN!", 150, 150);
    // context.closePath();
  }
}

//currently not in use
/*
let myGameArea = {
    canvas : document.createElement("canvas"),
    context: "",
    start : function() {
        this.canvas.width = screen.width;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

let myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}
*/
