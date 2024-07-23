let currentMoleTile;


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
}

function setMole() {

  let mole = document.createElement("img");
  mole.src = ""
}