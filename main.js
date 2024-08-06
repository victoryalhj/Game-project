// Set Timer
// Various types of tiles

let currentMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

window.onload = function() {
  setGame();
}

function setGame() {
  //set up the grid for the game board in html
  for (let i = 0; i<9; i++) { //i goes from 0 to 8, stops at 9
    // <div id="0-8"></div>  
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile)
  }
  setInterval(setMole, 2000); //2000 milliseconds = 2 seconds
  setInterval(setPlant, 3000);
}

function getRandomTile() {
  //math.random > (0-1)*9 = 0 -9 > round down to (0-8) integers
  let num = Math.floor(Math.random()*9);
  return num.toString();
}


function setMole() {
  //Gameover
  if(gameOver) {
    return;
  }
  //reset mole  
  if(currentMoleTile) {
    currentMoleTile.innerHTML = "";
  }

  let mole = document.createElement("img");
  mole.src = "./img/Mole.png";

  let num = getRandomTile();
  //Set the plant and mole to avoid the same tile 
  if (currPlantTile && currPlantTile.id == num) {
    return;
  }
  currentMoleTile = document.getElementById(num);
  currentMoleTile.appendChild(mole);
}

function setPlant() {
  if (gameOver) {
    return;
  }
  if (currPlantTile) {
    currPlantTile.innerHTML = "";
  }

  let plant = document.createElement("img");
  plant.src = "./img/Plant.png";

  let num = getRandomTile();
  if (currentMoleTile && currentMoleTile.id == num) {
    return;
  }
  currPlantTile = document.getElementById(num);
  currPlantTile.appendChild(plant);
}

// Tile clickable
function selectTile () {
  if (gameOver) {
    return;
  }
  if(this == currentMoleTile) {
    score += 10;
    document.getElementById("score").innerText = "Your Score: " + score.toString();
  } else if (this == currPlantTile) {
    document.getElementById("score").innerText = "GAME OVER: " +  score.toString();
    gameOver = true;
  }
}