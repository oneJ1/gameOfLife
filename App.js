const rows = 44;
const columns = 90;
const gridArray = [];
const nextArray = [];
var presetArray = [];

var mouseDown = false;

var colorShown = false;

var timer;
var gameState = false;

//0 = dead, 1 = alive
function initializeArray(){
    for(let i = 0; i < rows; i++){
        gridArray[i] = new Array(columns);
        nextArray[i] = new Array(nextArray);
    }
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            gridArray[i][j] = 0;
            nextArray[i][j] = 0;
        }
    }
}

initializeArray();
initializeBoard();

function gameStart(){
    let button = document.getElementById("button-start");

    if(!gameState){
        gameState = true;
        button.innerHTML = "Pause";

        gamePlay();
    }
    else{
        gameState = false;

        button.innerHTML = "Resume";
    }
}

function updateBoard(i, j){
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            gridArray[i][j] = nextArray[i][j];
            nextArray[i][j] = 0;
        }
    }

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            let cell = document.getElementById(i + '-' + j);
            let neigh = countNeighbors(i, j);

            if(neigh >= 3 && gridArray[i][j] == 1){
                cell.classList.add("live");
                cell.classList.remove("mid");
                cell.classList.remove("small");
            }
            else if(neigh == 2 && gridArray[i][j] == 1){
                cell.classList.add("live");
                cell.classList.add("mid");
                cell.classList.remove("small");
            }
            else if(neigh <= 1 && gridArray[i][j] == 1){
                cell.classList.add("live");
                cell.classList.remove("mid");
                cell.classList.add("small");
            }
            else{
                cell.classList.remove("live");
                cell.classList.remove("mid");
                cell.classList.remove("small");
            }
        }
    }
}

function gamePlay(){
    if(gameState){
        gameAlgorithm();

        updateBoard();

        timer = setTimeout(gamePlay, 50);
    }
}

function gameClear(){
    let button = document.getElementById("button-start");
    button.innerHTML = "Start";
    gameState = false;

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            nextArray[i][j] = 0;
        }
    }

    updateBoard();
}

function gameRandom(){
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            let cell = document.getElementById(i + '-' + j);

            let randomNum = Math.random();

            if(randomNum < 0.5){
                nextArray[i][j] = 0;
            }
            else{
                nextArray[i][j] = 1;
            }
        }
    }

    updateBoard();
}

function gameAlgorithm(){
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < columns; j++){
            let cell = gridArray[i][j];

            //if dead cell
            if(cell == 0){
                if(countNeighbors(i, j) == 3){
                    nextArray[i][j] = 1;
                }
                else{
                    nextArray[i][j] = 0;
                }
            }
            //if alive
            else{
                if(countNeighbors(i, j) < 2 || countNeighbors(i, j) > 3){
                    nextArray[i][j] = 0;
                }
                else{
                    nextArray[i][j] = 1;
                }
            }
        }
    }
}

function mouseHold(){
    mouseDown = true;
}

function mouseLet(){
    mouseDown = false;
}

function updateNeigh(i, j){
    //top left
    if(i == 0 && j == 0){
        sudoCheck(i, j+1, document.getElementById(i + '-' + (j+1)));
        sudoCheck(i+1, j, document.getElementById((i+1) + '-' + j));
        sudoCheck(i+1, j+1, document.getElementById((i+1) + '-' + (j+1)));
    }
    //top right
    else if(i == 0 && j == columns-1){
        sudoCheck(i, j-1, document.getElementById(i + '-' + (j-1)));
        sudoCheck(i+1, j, document.getElementById((i+1) + '-' + j));
        sudoCheck(i+1, j-1, document.getElementById((i+1) + '-' + (j-1)));
    }
    //bottom left
    else if(i == rows-1 && j == 0){
        sudoCheck(i, j+1, document.getElementById(i + '-' + (j+1)));
        sudoCheck(i-1, j, document.getElementById((i-1) + '-' + j));
        sudoCheck(i-1, j+1, document.getElementById((i-1) + '-' + (j+1)));
    }
    //bottom right
    else if(i == rows-1 && j == columns-1){
        sudoCheck(i, j-1, document.getElementById(i + '-' + (j-1)));
        sudoCheck(i-1, j, document.getElementById((i-1) + '-' + j));
        sudoCheck(i-1, j-1, document.getElementById((i-1) + '-' + (j-1)));
    }
    //right column
    else if(j == columns-1){
        sudoCheck(i-1, j, document.getElementById((i-1) + '-' + j));
        sudoCheck(i-1, j-1, document.getElementById((i-1) + '-' + (j-1)));
        sudoCheck(i, j-1, document.getElementById(i + '-' + (j-1)));
        sudoCheck(i+1, j-1, document.getElementById((i+1) + '-' + (j-1)));
        sudoCheck(i+1, j, document.getElementById((i+1) + '-' + j));
    }
    //bot row
    else if(i == rows-1){
        sudoCheck(i-1, j, document.getElementById((i-1) + '-' + j));
        sudoCheck(i-1, j-1, document.getElementById((i-1) + '-' + (j-1)));
        sudoCheck(i, j-1, document.getElementById(i + '-' + (j-1)));
        sudoCheck(i-1, j+1, document.getElementById((i-1) + '-' + (j+1)));
        sudoCheck(i, j+1, document.getElementById(i + '-' + (j+1)));
    }
    //top row
    else if(i == 0){
        sudoCheck(i+1, j, document.getElementById((i+1) + '-' + j));
        sudoCheck(i+1, j-1, document.getElementById((i+1) + '-' + (j-1)));
        sudoCheck(i, j-1, document.getElementById(i + '-' + (j-1)));
        sudoCheck(i+1, j+1, document.getElementById((i+1) + '-' + (j+1)));
        sudoCheck(i, j+1, document.getElementById(i + '-' + (j+1)));
    }
    //left column
    else if(j == 0){
        sudoCheck(i-1, j, document.getElementById((i-1) + '-' + j));
        sudoCheck(i-1, j+1, document.getElementById((i-1) + '-' + (j+1)));
        sudoCheck(i, j+1, document.getElementById(i + '-' + (j+1)));
        sudoCheck(i+1, j+1, document.getElementById((i+1) + '-' + (j+1)));
        sudoCheck(i+1, j, document.getElementById((i+1) + '-' + j));
    }
    //main body
    else{
        sudoCheck(i-1, j, document.getElementById((i-1) + '-' + j));
        sudoCheck(i-1, j+1, document.getElementById((i-1) + '-' + (j+1)));
        sudoCheck(i, j+1, document.getElementById(i + '-' + (j+1)));
        sudoCheck(i+1, j+1, document.getElementById((i+1) + '-' + (j+1)));
        sudoCheck(i+1, j, document.getElementById((i+1) + '-' + j));
        sudoCheck(i-1, j-1, document.getElementById((i-1) + '-' + (j-1)));
        sudoCheck(i, j-1, document.getElementById(i + '-' + (j-1)));
        sudoCheck(i+1, j-1, document.getElementById((i+1) + '-' + (j-1)));
    }
}

function killCell(i, j, cell){
    cell.classList.remove("live");
    cell.classList.remove("mid");
    cell.classList.remove("small");

    gridArray[i][j] = 0;
}

function liveCell(i, j, cell){
    cell.classList.add("live");

    gridArray[i][j] = 1;

    if(countNeighbors(i, j) == 2){
        cell.classList.add("mid");
        cell.classList.remove("small");
    }
    if(countNeighbors(i, j) <= 1){
        cell.classList.remove("mid");
        cell.classList.add("small");
    }
}

function cellToggle(){
    let cellID = this.id.split("-");
    let i = parseInt(cellID[0]);
    let j = parseInt(cellID[1]);
    
    if(this.classList.contains("live") && mouseDown){
        killCell(i, j, this);
        updateNeigh(i, j);
    }
    else if(mouseDown){
        liveCell(i, j, this);
        updateNeigh(i, j);
    }
}

function cellToggleClick(){
    let cellID = this.id.split("-");
    let i = parseInt(cellID[0]);
    let j = parseInt(cellID[1]);

    if(this.classList.contains("live")){
        killCell(i, j, this);
        updateNeigh(i, j);
    }
    else{
        liveCell(i, j, this);
        updateNeigh(i, j);
    }
}

function sudoCheck(i, j, cell){
    if(cell.classList.contains("live")){
        if(countNeighbors(i, j) >= 3){
            cell.classList.remove("mid");
            cell.classList.remove("small");
        }
        if(countNeighbors(i, j) == 2){
            cell.classList.add("mid");
            cell.classList.remove("small");
        }
        else if(countNeighbors(i, j) == 1){
            cell.classList.remove("mid");
            cell.classList.add("small");
        }
    }
}

function initializeBoard(){
    let gridContainer = document.getElementById("grid-container");

    let table = document.createElement("table");

    for(let i = 0; i < rows; i++){
        let row = document.createElement("tr");
        row.id = "row" + i;

        for(let j = 0; j < columns; j++){
            let cell = document.createElement("td");

            cell.id = i + '-' + j;
            cell.classList.add("dead");
            cell.onmouseover = cellToggle;
            cell.onmousedown = cellToggleClick;

            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    gridContainer.appendChild(table);
}

function countNeighbors(i, j){
    let numNeighbors = 0;
    
    //top left
    if(i == 0 && j == 0){
        numNeighbors = gridArray[i][j+1] + gridArray[i+1][j] + gridArray[i+1][j+1];
    }
    //top right
    else if(i == 0 && j == columns-1){
        numNeighbors = gridArray[i][j-1] + gridArray[i+1][j] + gridArray[i+1][j-1];
    }
    //bottom left
    else if(i == rows-1 && j == 0){
        numNeighbors = gridArray[i][j+1] + gridArray[i-1][j] + gridArray[i-1][j+1];
    }
    //bottom right
    else if(i == rows-1 && j == columns-1){
        numNeighbors = gridArray[i][j-1] + gridArray[i-1][j] + gridArray[i-1][j-1];
    }
    //right column
    else if(j == columns-1){
        numNeighbors = gridArray[i-1][j] + gridArray[i-1][j-1] + gridArray[i][j-1] + gridArray[i+1][j-1] + gridArray[i+1][j];
    }
    //bot row
    else if(i == rows-1){
        numNeighbors = gridArray[i][j-1] + gridArray[i-1][j-1] + gridArray[i-1][j] + gridArray[i-1][j+1] + gridArray[i][j+1];
    }
    //top row
    else if(i == 0){
        numNeighbors = gridArray[i][j-1] + gridArray[i+1][j-1] + gridArray[i+1][j] + gridArray[i+1][j+1] + gridArray[i][j+1];
    }
    //left column
    else if(j == 0){
        numNeighbors = gridArray[i-1][j] + gridArray[i-1][j+1] + gridArray[i][j+1] + gridArray[i+1][j+1] + gridArray[i+1][j];
    }
    //main body
    else{
        numNeighbors = gridArray[i][j-1] + gridArray[i-1][j-1] + gridArray[i-1][j] + gridArray[i-1][j+1] + gridArray[i][j+1] + gridArray[i+1][j-1] + gridArray[i+1][j] + gridArray[i+1][j+1];
    }

    return numNeighbors;
}

function infoPop(){
    let popup = document.getElementById("pop-up");
    popup.classList.remove("hidden");
}

function infoClose(){
    let popup = document.getElementById("pop-up");
    popup.classList.add("hidden");
}

function showColors(){
    let colorButton = document.getElementById("color-trigger");
    let purp = document.getElementById("color-purple");
    let red = document.getElementById("color-red");
    let orange = document.getElementById("color-orange");
    let green = document.getElementById("color-green");
    let blue = document.getElementById("color-blue");

    if(!colorShown){
        colorShown = true;
        colorButton.style.opacity = "60%";

        purp.style.right = `79px`;
        red.style.right = `105px`;
        orange.style.right = `131px`;
        green.style.right = `157px`;
        blue.style.right = `183px`;
    }

    else{
        colorShown = false;
        colorButton.style.opacity = "";

        purp.style.right = `53px`;
        red.style.right = `53px`;
        orange.style.right = `53px`;
        green.style.right = `53px`;
        blue.style.right = `53px`;
    }
}


function changePurp(){
    [...document.styleSheets[0].cssRules].find(x => x.selectorText == "td.live").style['background']='#4139b3';
    [...document.styleSheets[0].cssRules].find(x => x.selectorText == "td.mid").style['background']='#655ec7';
    [...document.styleSheets[0].cssRules].find(x => x.selectorText == "td.small").style['background']='#9893d8';
}

function changeRed(){
    [...document.styleSheets[0].cssRules].find(x => x.selectorText == "td.live").style['background']='#e03a53';
    [...document.styleSheets[0].cssRules].find(x => x.selectorText == "td.mid").style['background']='#f17f90';
    [...document.styleSheets[0].cssRules].find(x => x.selectorText == "td.small").style['background']='#f8adb7';
}

function changeOrange(){
    [...document.styleSheets[0].cssRules].find(x => x.selectorText == "td.live").style['background']='#c0681f';
    [...document.styleSheets[0].cssRules].find(x => x.selectorText == "td.mid").style['background']='#e29352';
    [...document.styleSheets[0].cssRules].find(x => x.selectorText == "td.small").style['background']='#f5c9a5';
}

function changeGreen(){
    [...document.styleSheets[0].cssRules].find(x => x.selectorText == "td.live").style['background']='#389750';
    [...document.styleSheets[0].cssRules].find(x => x.selectorText == "td.mid").style['background']='#5bc275';
    [...document.styleSheets[0].cssRules].find(x => x.selectorText == "td.small").style['background']='#9ae7ad';
}

function changeBlue(){
    [...document.styleSheets[0].cssRules].find(x => x.selectorText == "td.live").style['background']='#3b63d3';
    [...document.styleSheets[0].cssRules].find(x => x.selectorText == "td.mid").style['background']='#7592e2';
    [...document.styleSheets[0].cssRules].find(x => x.selectorText == "td.small").style['background']='#92a2cf';
}

function insertPreset(n){
    gameClear();

    buildPreset(n, nextArray);

    updateBoard();
}