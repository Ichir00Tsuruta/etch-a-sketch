const slider = document.getElementById("myRange");
const dimension = document.getElementById("dimension");
const grid = document.querySelector(".grid"); 
const heightGrid = 380; 
fillGrid(parseInt(slider.value));

dimension.textContent = `${slider.value} x ${slider.value}`;
dimension.classList.add("dimension-text"); 

const stacked = grid.querySelectorAll('div');
let colorMode = "black"; 

let toyOn = true; 

//initial dimensions 

slider.addEventListener ("input", () => {
    const numberOfSquares = parseInt(slider.value);
    dimension.textContent = `${slider.value} x ${slider.value}`;
    fillGrid(parseInt(slider.value));
})

function makeSquares (numberOfSquares) {
    const row = document.createElement('div');

    for (let i = 0; i < numberOfSquares; i++) {
        const square = document.createElement("div");
        square.classList.add('square'); 
        
            square.addEventListener('mouseenter', () => {
            if (colorMode === "black") {
                fillBlack(square);
            } else if (colorMode === "rainbow") {
                fillRainbow(square);
            } else if (colorMode === "random"){
                fillRandom(square);
            } else if (colorMode === "funny") {
                fillFunny(square); 
            }})
        
        row.appendChild(square);
    }

    return row;
}

function fillGrid (numberOfSquares) {
    grid.innerHTML = ""; 
    for (let i = 0; i < numberOfSquares; i++) {
        const row = makeSquares(numberOfSquares); 
        if (i === 0) row.classList.add('first-row');
        grid.appendChild(row);
    }
}


stacked.forEach(div => {
    div.classList.add('rows');
}) 

//color modes 
const upArrow = document.getElementById("upArrow"); 
const downArrow = document.getElementById("downArrow"); 
const rightArrow = document.getElementById("rightArrow"); 
const leftArrow = document.getElementById("leftArrow"); 
const colorKnob = document.getElementById("colorKnob");

colorKnob.addEventListener('click', (e) => {
    const choice = e.target.closest('[data-mode]');
    colorMode = choice.dataset.mode;
    console.log("Color mode changed to:", colorMode);
})

//sketch functions 


function fillBlack (square){
    square.style.backgroundColor = 'black';
}


const array = ["#de0930","#ff8400","#f2ed55", "#1cba3e","#1d99e0", "#0e3b9c", "#753ba8"];
let arrayIndex = 0; 

function fillRainbow (square) {
    if (!square.classList.contains("rainbow")) {
    square.style.backgroundColor = array[arrayIndex];
    arrayIndex = (arrayIndex +1) % array.length; 
    square.classList.add("rainbow");
    }
}

let letters = "0123456789ABCDEF"; 
let color = '#'; 
let emoji = '&#'

for (let i = 0; i <6; i++)
    color += letters[(Math.floor(Math.random()*16))];
console.log(color); 

function fillRandom (square) {
    square.style.backgroundColor = color;
}

function getRandomEmoji () {
    const ranges = [
        [0x1F600, 0x1F64F], 
        [0x1F300, 0x1F5FF], 
        [0x1F680, 0x1F6FF],
        [0x1F900, 0x1F9FF]
    ];
    const [start, end] = ranges[Math.floor(Math.random() * ranges.length)];
    const codePoint = Math.floor(Math.random() * (end - start + 1)) + start;
    return String.fromCodePoint(codePoint);
}


function fillFunny (square) {
    if (!square.classList.contains("funny")) {
        const emojiBox = document.createElement("div"); 
        const emoji = getRandomEmoji(); 
        emojiBox.textContent = emoji;

        Object.assign(emojiBox.style, {
            width: "100%",
            height: "100%",
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            textAlign: "center", 
            fontSize: "calc(0.7 * min(100%, 100%))", 
            overflow: "hidden", 
            lineHeight: "1", 
            padding: "0", 
            margin: "0", 
            position: "absolute", 
        })

        square.appendChild(emojiBox); 
        square.classList.add("funny");
    }
}

const reset = document.getElementById("resetButton"); 

function resetFill () {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.backgroundColor = "#e0d8d7"; 
        square.innerHTML = '';
        square.classList.remove("rainbow", "funny");
    })
}

reset.addEventListener('click', resetFill);

