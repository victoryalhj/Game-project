let currentMoleTile;
let currPlantTile;


window.onload = function() {
  setGame();
}

function setGame() {
  //set up the grid for the game board in html
  for (let i = 0; i<9; i++) { //i goes from 0 to 8, stops at 9
    // <div id="0-8"></div>  
    let tile = document.createElement("div");
    tile.id = i.toString();
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