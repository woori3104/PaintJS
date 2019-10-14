const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 400;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

function startPainting() {
    painting = true;
}

let painting = false;
let filling = true;

function onMouseMove(event) {
    // console.log(event);
    const x = event.offsetX;
    const y = event.offsetY;
    console.log(x, y);

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }

}

function stopPainting() {
    painting = false;
}

function onMouseLeave(event) {
    painting = false;
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    console.log(event);
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event) {
    console.log(event.target);
    if (filling === true) {
        filling = false;
        mode.innerText = "FILL"
    } else {
        filling = true;
        mode.innerText = "PAINT";

    }
}

function handleConvasClick() {
    if (filling !== true) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleContextMenu(event) {
    console.log(event);
    event.preventDefualt();
}

function saveImage(event) {
    const image = canvas.toDataURL("image/jpeg");
    console.log(image);
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJs[Export]";
    console.log(link);
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("click", handleConvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
);

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", saveImage);
}