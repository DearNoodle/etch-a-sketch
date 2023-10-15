
const generatedGrids = (gridSize) => {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    let gridLength = 500/gridSize;

    for (let i = 0; i < gridSize; i++) {
        let gridSubContainer = document.createElement('div');
        gridSubContainer.classList.add("grid-sub-container");
        gridContainer.appendChild(gridSubContainer);
        for (let j = 0; j < gridSize; j++) {
            let Grid = document.createElement('div');
            Grid.classList.add("grid");
            gridSubContainer.appendChild(Grid);
        }
    }
    let gridSubContainers = document.querySelectorAll(".grid-sub-container");
    let Grids = document.querySelectorAll(".grid");

    gridSubContainers.forEach((element) => {
        element.style.cssText = `height:${gridLength}px;`;
    })
    Grids.forEach((element) => {
        element.style.cssText = `width:${gridLength}px; height:${gridLength}px;`;
    })

    return Grids;
}

const setBtnReference = () => {   
    let btnNormal = document.querySelector(".normal");
    let btnColor = document.querySelector(".color");
    let btnErase = document.querySelector(".erase");
    let btnReset = document.querySelector(".reset");
    
    currentMode = "normal";
    
    btnNormal.addEventListener("click", function() {
        currentMode = "normal";
    });
    btnColor.addEventListener("click", function() {
        currentMode = "color";
    });
    btnErase.addEventListener("click", function() {
        currentMode = "erase";
    });
    btnReset.addEventListener("click", function() {
        Grids.forEach((element) =>{
            element.style.backgroundColor = "lightgrey";
        })
        currentMode = "normal";
    });
    }

const setMouseDragEvent = () => {
    let hue = Math.floor(Math.random() * 360);
    let lastGridEntered;
    let mouseDown;

    let mouseDownListener = (event) => {
        mouseDown = true;
        event.preventDefault();
        lastGridEntered = event.target;
        if (currentMode === "normal") {
            event.target.style.backgroundColor = "black";
        }
        if (currentMode === "erase") {
            event.target.style.backgroundColor = "lightgrey";
        }
        if (currentMode === "color") {
            hue = (hue + colorChangeRate) % 360;
            event.target.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
        }
    };
    let mouseUpListener = () => {
        mouseDown = false;
    };
    let mouseMoveListener = (event) => {
        if (mouseDown === true){
            if (event.target !== lastGridEntered) {
                lastGridEntered = event.target;
                if (currentMode === "normal") {
                    event.target.style.backgroundColor = "black";
                }
                if (currentMode === "erase") {
                    event.target.style.backgroundColor = "lightgrey";
                }
                if (currentMode === "color") {
                    hue = (hue + colorChangeRate) % 360;
                    event.target.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
                }
            }
        }
    };

    Grids.forEach((element) =>{
        element.addEventListener("mousedown", mouseDownListener);
        element.addEventListener('mouseup', mouseUpListener);
        element.addEventListener('mousemove', mouseMoveListener);
    })
}

const gridSizeTextInput = document.querySelector(".grid-size");
const gridContainer = document.querySelector(".grid-container");
let colorChangeRate = 5;
let gridSize = 16;
let currentMode = "normal";

gridSizeTextInput.addEventListener("keypress", (event) => {
    inputText = Number(gridSizeTextInput.value)
    if (event.key === "Enter") {
        if (Number.isInteger(inputText) && inputText <= 64 && inputText > 0){
            gridSize = inputText;
            gridSizeTextInput.placeholder = `Grid: ${gridSize}`;
            Grids = generatedGrids(gridSize);
            setBtnReference();
            setMouseDragEvent();
        }
        gridSizeTextInput.value = "";
        return Grids
    }
})

gridSizeTextInput.placeholder = `Grid: ${gridSize}`;
Grids = generatedGrids(gridSize);
setBtnReference();
setMouseDragEvent();