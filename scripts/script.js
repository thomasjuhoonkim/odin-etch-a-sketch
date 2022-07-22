var color = "gray";

var grid = document.getElementById("grid-container");
loadArea(100, 50);

var resize = document.getElementById("resize");
resize.addEventListener("click", getNewArea);

var clear = document.getElementById("clear");
clear.addEventListener("click", clearArea);

var eraser = document.getElementById("eraser");
eraser.addEventListener("click", eraserColor);

var gray = document.getElementById("gray");
gray.addEventListener("click", grayColor);

var rainbow = document.getElementById("rainbow");
rainbow.addEventListener("click", rainbowColor);

var slider = document.getElementById("range");
sliderErase(100);

function eraserColor() {
  window.onmouseover = null;
  color = "white";
}

function grayColor() {
  window.onmouseover = null;
  color = "gray";
}

function rainbowColor() {
  var o = Math.round,
    r = Math.random,
    s = 256;
  window.onmouseover = () => {
    color =
      "rgba(" +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      r().toFixed(1) +
      ")";
  };
}

function sliderErase(width) {
  slider.setAttribute("max", width - 1);
  var gridItems = document.querySelectorAll(".grid-item");
  slider.oninput = () => {
    gridItems.forEach((item) => {
      if (item.getAttribute("data-id") % width === parseInt(slider.value, 10)) {
        item.style.backgroundColor = "white";
      }
    });
  };
}

function loadArea(width, height) {
  // remove existing children of grid
  grid.textContent = "";

  // set grid columns
  grid.style.gridTemplateColumns = "auto ".repeat(width);

  // fill grid
  var numGridItems = width * height;
  for (var i = 0; i < numGridItems; i++) {
    var gridItem = document.createElement("div");
    gridItem.setAttribute("data-id", `${i}`);
    gridItem.onclick = draw;
    gridItem.classList.add("grid-item");
    grid.appendChild(gridItem);
  }

  // add event listner for all grid items
  gridItemAddEvent();
}

function clearArea() {
  var gridItem = document.querySelectorAll(".grid-item");
  gridItem.forEach((item) => {
    item.style.backgroundColor = "white";
  });
}

function draw(e) {
  e.currentTarget.style.backgroundColor = color;
}

function mouseDownListener() {
  var gridItem = document.querySelectorAll(".grid-item");
  gridItem.forEach((item) => {
    item.addEventListener("mousemove", draw, true);
  });
}

function mouseUpListener() {
  var gridItem = document.querySelectorAll(".grid-item");
  gridItem.forEach((item) => {
    item.removeEventListener("mousemove", draw, true);
  });
  window.removeEventListener("mousemove", draw, true);
}

function gridItemAddEvent() {
  window.addEventListener("mousedown", mouseDownListener, true);
  window.addEventListener("mouseup", mouseUpListener, true);
}

function gridItemRemoveEvent() {
  window.removeEventListener("mousedown", mouseDownListener, true);
  window.removeEventListener("mouseup", mouseUpListener, true);
}

function getNewArea() {
  resize.removeEventListener("click", getNewArea);
  var gridItem = document.querySelectorAll(".grid-item");
  gridItemRemoveEvent();

  var resizePopup = document.createElement("div");
  resizePopup.classList.add("popup");

  var resizeText = document.createElement("p");
  resizeText.innerHTML = "Enter a new width and height.";
  resizeText.style.margin = "0";
  resizePopup.appendChild(resizeText);

  var resizeRestriction = document.createElement("p");
  resizeRestriction.innerHTML = "(Limit: 50 X 50 to 200 X 100)";
  resizeRestriction.style.margin = "5px 0";
  resizeRestriction.style.color = "red";
  resizeRestriction.style.textAlign = "center";
  resizePopup.appendChild(resizeRestriction);

  var resizeWidth = document.createElement("input");
  resizeWidth.setAttribute("id", "width");
  resizeWidth.setAttribute("placeholder", "Width");

  var resizeHeight = document.createElement("input");
  resizeHeight.setAttribute("id", "height");
  resizeHeight.setAttribute("placeholder", "Height");

  var resizeDimenContainer = document.createElement("div");
  var resizeDimenX = document.createElement("p");
  resizeDimenX.innerHTML = "X";
  resizeDimenX.style.margin = "0 5px";
  resizeDimenContainer.setAttribute("id", "resize-dimen-container");
  resizeDimenContainer.appendChild(resizeWidth);
  resizeDimenContainer.appendChild(resizeDimenX);
  resizeDimenContainer.appendChild(resizeHeight);
  resizePopup.appendChild(resizeDimenContainer);

  var resizeConfirmContainer = document.createElement("div");
  var resizeConfirm = document.createElement("button");
  resizeConfirm.innerHTML = "Confirm";
  resizeConfirmContainer.setAttribute("id", "resize-confirm-container");
  resizeConfirmContainer.appendChild(resizeConfirm);
  var resizeError = document.createElement("p");
  resizeError.setAttribute("id", "resize-error");
  resizeConfirm.addEventListener("click", () => {
    const MAX_WIDTH = 200;
    const MAX_HEIGHT = 100;
    const MIN_WIDTH = 50;
    const MIN_HEIGHT = 50;
    var width = parseInt(resizeWidth.value, 10);
    var height = parseInt(resizeHeight.value, 10);

    if (!width || !height) {
      resizeError.innerHTML = "Please enter a value";
    } else if (!Number.isInteger(width) || !Number.isInteger(height)) {
      resizeError.innerHTML = "Please enter valid integers.";
    } else if (
      width > MAX_WIDTH ||
      width < MIN_WIDTH ||
      height > MAX_HEIGHT ||
      height < MIN_HEIGHT
    ) {
      resizeError.innerHTML = `Max width and height is ${MAX_WIDTH} X ${MAX_HEIGHT}.`;
    } else {
      loadArea(width, height);
      sliderErase(width);
      document.querySelector("body").removeChild(resizePopup);
      resize.addEventListener("click", getNewArea);
      return;
    }
    resizeConfirmContainer.prepend(resizeError);
  });
  resizePopup.appendChild(resizeConfirmContainer);
  document.querySelector("body").appendChild(resizePopup);
}
