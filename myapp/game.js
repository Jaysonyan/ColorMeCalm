// TODO:
// ADD NUMBERS TO PALETTE

let currentSelection = 0;

// var testGrid = [[1,1,1,1,1,1,1,1,1,1],
//             [1,2,1,1,1,1,1,1,1,1],
//             [1,1,3,1,1,1,1,1,1,1],
//             [1,1,1,4,1,1,1,1,1,1],
//             [1,1,1,1,1,1,1,1,1,1],
//             [1,1,1,1,1,1,1,1,1,1],
//             [1,1,1,6,1,1,1,1,1,1],
//             [1,1,19,1,1,1,1,1,1,1],
//             [1,1,1,1,1,1,1,1,1,1],
//             [1,1,1,1,1,1,1,1,1,1],];
//
var testGrid = [[0,1,2], [3,4,5], [0,0,0]];

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.canvas.addEventListener("click", mouseClick);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

        
var grid = testGrid;
for (let r = 0; r < testGrid.length; r++) {
    for (let c = 0; c < testGrid.length; c++) {
        grid[c][r] = { x:0, y:0, n: testGrid[c][r], status: 0 };
    }
}
console.log(grid);

var paletteGrid1 = [];


var paletteGrid2 = [];


function startGame() {
    myGameArea.start();
    drawGrid(grid);
    drawPalette(palette1,[0,0]);
    drawPalette(palette2,[myGameArea.canvas.width - (2 * (myGameArea.canvas.height / palette2[0].length)),0]);
}

let palette1=[["#C0392B","#E74C3C","#9B59B6","#8E44AD","#2980B9","#3498DB"],["#1ABC9C","#16A085","#27AE60","#2ECC71","#F1C40F","#F39C12"]];
palette2=[["#E67E22","#D35400","#ECF0F1","#BDC3C7","#95A5A6","#7F8C8D"],["#34495E","#2C3E50","#F08080","#E9967A","#1B2631","#17202A"]];
palette=["#C0392B","#E74C3C","#9B59B6","#8E44AD","#2980B9","#3498DB","#1ABC9C","#16A085","#27AE60","#2ECC71","#F1C40F","#F39C12","#E67E22","#D35400","#ECF0F1","#BDC3C7","#95A5A6","#7F8C8D","#34495E","#2C3E50","#F08080","#E9967A","#1B2631","#17202A"]
// palette1 = [0,0,0,0,0,0,0,0,0,0,0,0];
// palette2 = [0,0,0,0,0,0,0,0,0,0,0,0];

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function drawPalette(arr, posn) {
    let squareLen = myGameArea.canvas.height / (arr[0].length);
    for (let r = 0; r < 6; r++) {
        let posn1 = posn;
        for (let c = 0; c < 2; c++) {
            myGameArea.context.beginPath();
            myGameArea.context.rect(posn1[0] + (squareLen * c), posn1[1] + (squareLen * r), squareLen, squareLen);
            myGameArea.context.fillStyle = arr[c][r];
            myGameArea.context.fill();
            myGameArea.context.stroke();
            myGameArea.context.closePath();
        }
    }
}

function drawGrid(arr) {
    let r=0;
    var halfWidth=myGameArea.canvas.width / 2;
    var halfHeight=myGameArea.canvas.height / 2;
    var squareLen=myGameArea.canvas.height/arr.length;
    var centre=[halfWidth,halfHeight];
    let fontSize = "50px";
    for (let row of arr) {
        let posn=[centre[0] - halfHeight, centre[1] - halfHeight + squareLen * r];
        for (let num of row) {
            let element=num.n.toString();

            myGameArea.context.beginPath();
            //console.log(num);
            if (num.status == 1) {
                myGameArea.context.rect(posn[0], posn[1], squareLen, squareLen);
                myGameArea.context.fillStyle = palette[num.n];
                myGameArea.context.fill();
                myGameArea.context.stroke();

            } else {
                myGameArea.context.rect(posn[0], posn[1], squareLen, squareLen);
                myGameArea.context.fillStyle = "#ffffff"
                myGameArea.context.fill();
                myGameArea.context.stroke();
                myGameArea.context.font = fontSize + " serif";
                myGameArea.context.textAlign = "left"
                myGameArea.context.textBaseline = "hanging";
                myGameArea.context.fillStyle = "black"
                myGameArea.context.fillText(element, posn[0], posn[1]);
            }

            myGameArea.context.closePath();


            num.x = posn[0];
            num.y = posn[1];

            posn[0] = posn[0] + squareLen;
        }
        r++;
    }
}

var origX = grid[0][0].x;
var origY = grid[0][0].y;


function mouseClick(e) {
    let squareLen = myGameArea.canvas.height / grid.length;
    let x = e.layerX;
    let y = e.layerY;
    let c = Math.floor((x - ((myGameArea.canvas.width / 2) - myGameArea.canvas.height / 2)) / squareLen);
    let r = Math.floor(y / squareLen);
    //console.log(r, c, x, y,((myGameArea.canvas.width / 2) - myGameArea.canvas.height / 2), squareLen, myGameArea.canvas.height);
    if (r < 0 || c < 0 || c >= grid.length || r >= grid.length) {
        let paletteLen = myGameArea.canvas.height / (palette1[0].length);
        let c2 = Math.floor(x / paletteLen);
        let r2 = Math.floor(y / paletteLen);
        console.log(currentSelection);
        currentSelection = (c2 * 6) + r2;
    }
    else if (grid[r][c].n == currentSelection && grid[r][c].status == 0) {
        grid[r][c].status = 1;
    }
    //console.log(r, c, grid[r][c].status, grid[r][c].n)
    console.log(c, r)
    console.log(currentSelection, grid[r][c].status);
    console.log(grid);

}


function updateGameArea() {
    myGameArea.clear();
    drawGrid(grid);
    drawPalette(palette1,[0,0]);
    drawPalette(palette2,[myGameArea.canvas.width - (2 * (myGameArea.canvas.height / palette2[0].length)),0]);
}


setInterval(updateGameArea, 10);

document.addEventListener("DOMContentLoaded", startGame);
//document.getElementById("myCanvas").addEventListener("click", mouseClick);
