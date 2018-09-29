var currentStatus = 1;

var testGrid = [[1,1,1,1,1,1,1,1,1,1],
            [1,2,1,1,1,1,1,1,1,1],
            [1,1,3,1,1,1,1,1,1,1],
            [1,1,1,4,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,6,1,1,1,1,1,1],
            [1,1,19,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
        ]

var grid = testGrid;
for (let c = 0; c < testGrid.length; c++) {
    for (let r = 0; r < testGrid.length; r++) {
        grid[c][r] = { x:0, y:0, n: testGrid[c][r], status: 0 };
    }
}


console.log(grid)

function color(num) {
    return palette[num];
}

function startGame() {
    myGameArea.start();
    myGameArea.canvas.setAttribute('id', "myCanvas");
    drawGrid(grid);
    drawPalette(palette1,[0,0]);
    drawPalette(palette2,[myGameArea.canvas.width - (2 * (myGameArea.canvas.height / (palette2.length / 2))),0]);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

palette1=[1,2,3,4,5,6,7,8,9,10,11,12];
palette2=[13,14,15,16,17,18,19,20,21,22,23,24];

function drawPalette(arr, posn) {
    let squareLen = myGameArea.canvas.height / (arr.length / 2);
    for (let r = 0; r < 6; r++) {
        let posn1 = posn;
        for (let c = 0; c < 2; c++) {
            myGameArea.context.beginPath();
            myGameArea.context.rect(posn1[0] + (squareLen * c), posn1[1] + (squareLen * r), squareLen, squareLen);
            myGameArea.context.fillStyle = "#ffffff"
            myGameArea.context.fill();
            myGameArea.context.stroke();
            myGameArea.context.closePath();
        }
    }
}

function drawGrid(arr) {
    let r=0;
    const halfWidth=myGameArea.canvas.width / 2;
    const halfHeight=myGameArea.canvas.height / 2;
    let centre=[halfWidth,halfHeight];
    let squareLen=myGameArea.canvas.height/arr.length;
    let fontSize = "50px";
    for (let row of arr) {
        console.log(row);
        let posn=[centre[0] - halfHeight, centre[1] - halfHeight + squareLen * r];
        for (let num of row) {
            console.log(num);
            let element=num.n.toString();

            myGameArea.context.beginPath();
            myGameArea.context.rect(posn[0], posn[1], squareLen, squareLen);
            myGameArea.context.fillStyle = "#ffffff"
            myGameArea.context.fill();
            myGameArea.context.stroke();
            myGameArea.context.font = fontSize + " serif";
            myGameArea.context.textAlign = "left"
            myGameArea.context.textBaseline = "hanging";
            myGameArea.context.fillStyle = "black"
            myGameArea.context.fillText(element, posn[0], posn[1]);
            myGameArea.context.closePath();

            num.x = posn[0];
            num.y = posn[1];

            posn[0] = posn[0] + squareLen;
        }
        r++;
    }
}

startGame();

document.getElementById("myCanvas").addEventListener("click", function(e){
    alert("wtf");
});