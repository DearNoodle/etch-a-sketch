
let gridSize = 32;
let gridLength = 50/gridSize;

const gridContainer = document.querySelector(".grid-container");
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
    element.style.cssText = `height:${gridLength}vh;`;
})
Grids.forEach((element) => {
    element.style.cssText = `width:${gridLength}vh; height:${gridLength}vh;`;
})




let mouseDown;
let mouseDownListener = (event) => {
    mouseDown = true;
    event.preventDefault();
};
let mouseUpListener = () => {mouseDown = false;};
let mouseMoveListener = (event) => {
    if (mouseDown === true){
        event.target.style.backgroundColor = "black";
    }
};

Grids.forEach((element) =>{
    element.addEventListener("mousedown", mouseDownListener);
    element.addEventListener('mouseup', mouseUpListener);
    element.addEventListener('mousemove', mouseMoveListener);
})
