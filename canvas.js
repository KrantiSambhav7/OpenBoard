let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
let mouseDown = false;
let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidth = document.querySelector(".pencil-width");
let download = document.querySelector(".download");
let penColor = "white";
let penWidth = pencilWidth.value;
let eraserWidth = penWidth.value * 2;
let eraserColor = "black";
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");
let undoRedoTracker = [] ;
let track = 0;

//API
let tool = canvas.getContext("2d");
tool.strokeStyle = penColor; // color of the line
tool.lineWidth = penWidth; // width of the line

canvas.addEventListener("mousedown", (e) => {
    mouseDown = true;
    beginPath({x : e.clientX , y : e.clientY});
});

canvas.addEventListener("mousemove", (e) => {
    if(mouseDown){
        drawStroke({x : e.clientX , y : e.clientY , color : eraserFlag ? eraserColor : penColor});
    }
});
canvas.addEventListener("mouseup", (e) => {
    mouseDown = false;
    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length - 1;

});

function beginPath(stroke){
    tool.beginPath();
    tool.moveTo(stroke.x , stroke.y);
}
function drawStroke(stroke){
    tool.lineTo(stroke.x , stroke.y); 
    tool.stroke();
}
pencilColor.forEach((color) => {
    color.addEventListener("click", (e) => {
        penColor = e.target.classList[0];
        tool.strokeStyle = penColor;
    });
});
pencilWidth.addEventListener("change", (e) => {
    pencilWidthValue = e.target.value;
    tool.lineWidth = pencilWidthValue;
    eraserWidth = pencilWidthValue * 2;
});
eraser.addEventListener("click", (e) => {
    if(eraserFlag){
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;
        eraserFlag = false;
    }else{
        tool.strokeStyle = penColor;
        tool.lineWidth = penWidth;
        eraserFlag = true;
    }
});
download.addEventListener("click", (e) => {
    let url = canvas.toDataURL(); // convert canvas to image
    let a = document.createElement("a");
    a.href = url ;
    a.download = "canvas.jpg";
    a.click();
});
undo.addEventListener("click", (e) => {
    if(track >= 0){
        track--;
    }
    undoRedoCanvas({
        trackValue : track,
        undoRedoTracker : undoRedoTracker
    });
});
redo.addEventListener("click", (e) => {
    if(track < undoRedoTracker.length - 1){
        track++;
    }
    undoRedoCanvas({
        trackValue : track,
        undoRedoTracker : undoRedoTracker
    });
});
function undoRedoCanvas(trackObj){
    track = trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker;
  
    let url = undoRedoTracker[track];
    let img= new Image();
    canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
    img.src = url;
    img.onload = (e)=>{
      tool.drawImage(img,0,0,canvas.width,canvas.height);      //starting coordinate and ending coordinate
    }
  }