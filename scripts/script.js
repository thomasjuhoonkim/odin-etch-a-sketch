var grid = document.getElementById("grid-container");
loadArea(100, 50);

var resize = document.getElementById("resize");
resize.addEventListener("click", getNewArea);

function loadArea(width, height) {
  // remove existing children of grid
  grid.textContent = "";

  // set grid columns
  grid.style.gridTemplateColumns = "auto ".repeat(width);

  // fill grid
  var numGridItems = width * height;
  for (var i = 0; i < numGridItems; i++) {
    var gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    grid.appendChild(gridItem);
  }

  // add event listner for all grid items
  gridItemAddEvent();
}

function draw(evt) {
  evt.currentTarget.style.backgroundColor = "gray";
}

function gridItemAddEvent() {
  var gridItem = document.querySelectorAll(".grid-item");
  gridItem.forEach((item) => {
    item.addEventListener("mouseover", draw);
  });
}

function gridItemRemoveEvent() {
  var gridItem = document.querySelectorAll(".grid-item");
  gridItem.forEach((item) => {
    item.removeEventListener("mouseover", draw);
  });
}

function getNewArea() {
  resize.removeEventListener("click", getNewArea);
  var gridItem = document.querySelectorAll(".grid-item");
  gridItemRemoveEvent(gridItem);

  var resizePopup = document.createElement("div");
  resizePopup.classList.add("popup");

  var resizeText = document.createElement("p");
  resizeText.innerHTML = "Please Enter the width and height.";
  resizeText.style.margin = "0";
  resizePopup.appendChild(resizeText);

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
    var width = parseInt(resizeWidth.value, 10);
    var height = parseInt(resizeHeight.value, 10);

    if (!width || !height) {
      resizeError.innerHTML = "Please enter a value";
    } else if (!Number.isInteger(width) || !Number.isInteger(height)) {
      resizeError.innerHTML = "Please enter valid integers.";
    } else if (width > MAX_WIDTH || height > MAX_HEIGHT) {
      resizeError.innerHTML = `Max width and height is ${MAX_WIDTH} x ${MAX_HEIGHT}.`;
    } else {
      loadArea(width, height);
      document.querySelector("body").removeChild(resizePopup);
      resize.addEventListener("click", getNewArea);
      return;
    }
    resizeConfirmContainer.prepend(resizeError);
  });
  resizePopup.appendChild(resizeConfirmContainer);
  document.querySelector("body").appendChild(resizePopup);
}
