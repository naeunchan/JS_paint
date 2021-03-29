const body = document.getElementsByTagName("body");
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const pen = document.getElementById("jsPen");
const fill = document.getElementById("jsFill");
const save = document.getElementById("jsSave");
const erase = document.getElementById("jsEraser");

const INITIAL_COLOR = "black";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let isPen = true;
let isFill = false;
let isErase = false;
let prevColor = null;
let prevMode = null;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;

  if (prevColor !== null && ctx.strokeStyle !== color && ctx.fillStyle !== color) {
    prevColor.toggle("pickedColor");
  }

  event.target.classList.toggle("pickedColor");
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  prevColor = event.target.classList;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handlePenClick(event) {
  if (prevMode.id !== event.target.id) {
    prevMode.classList.toggle("pickedMode");
  }
  console.log(body);
  if (!isPen) {
    isPen = true;
    isFill = false;
    isErase = false;
    ctx.globalCompositeOperation = "source-over";
    // body[0].style.cursor =
    //   "url('https://www.flaticon.com/svg/vstatic/svg/63/63438.svg?token=exp=1617025973~hmac=427b741db0a8f350e9bf07e125c1d8bb') 10 10, auto";
    event.target.classList.toggle("pickedMode");
  }

  prevMode = event.target;
}

function handleFillClick(event) {
  if (prevMode.id !== event.target.id) {
    prevMode.classList.toggle("pickedMode");
  }

  if (!isFill) {
    isFill = true;
    isPen = false;
    isErase = false;
    ctx.globalCompositeOperation = "source-over";
    event.target.classList.toggle("pickedMode");
  }

  prevMode = event.target;
}

function handleEraserClick(event) {
  if (prevMode.id !== event.target.id) {
    prevMode.classList.toggle("pickedMode");
  }

  if (!isErase) {
    isErase = true;
    isPen = false;
    isFill = false;
    // ctx.strokeStyle = "white";
    ctx.globalCompositeOperation = "destination-out";
    event.target.classList.toggle("pickedMode");
  }

  prevMode = event.target;
}

function handleCanvasClick() {
  if (isFill) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleContextMenu(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS_Result";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleContextMenu);
}

if (colors) {
  Array.from(colors).forEach((color) => {
    if (color.style.backgroundColor === INITIAL_COLOR) {
      prevColor = color.classList;
    }
    color.addEventListener("click", handleColorClick);
  });
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (pen) {
  prevMode = pen;
  pen.addEventListener("click", handlePenClick);
}

if (fill) {
  fill.addEventListener("click", handleFillClick);
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}

if (erase) {
  erase.addEventListener("click", handleEraserClick);
}
