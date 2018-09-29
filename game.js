var grid = [[1,1,1,1,1,1,1,1,1,1],
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

function startGame() {
    myGameArea.start();
    drawBricks(grid);
    myGameArea.context.beginPath();
    myGameArea.context.lineWidth="6";
    myGameArea.context.strokeStyle="red";
    myGameArea.context.rect(5,5,290,140);
    myGameArea.context.stroke();   
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

function drawBricks(arr) {
    let r=0;
    const halfWidth=myGameArea.canvas.width / 2;
    const halfHeight=myGameArea.canvas.height / 2;
    let centre=[halfWidth,halfHeight];
    let squareLen=myGameArea.canvas.height/arr.length;
    let fontSize = "50px";
    let font = "serif"
    for (let row of arr) {
        let c=0;
        let posn=[centre[0] - halfHeight, centre[1] - halfHeight + squareLen * r];
        for (let num of row) {
            let element=num.toString();
            
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

            c++;
            posn[0] = posn[0] + squareLen;
        }
        r++;
    }
}

startGame();