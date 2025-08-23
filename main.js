// Set Timer
// Various types of tiles

let currentMoleTile;
let currPlantTile;
let currBonusTile;
let score = 0;
let timeLeft = 60;
let timeInterval ;
let level = 1;
let moleSpeed = 2000;
let minMoleSpeed = 500;
let moleTimeout;
let gameOver = false;


window.onload = function() {
  setGame();
}

function startMole() {
  setMole();
  moleTimeout = setTimeout(startMole, moleSpeed)
}

//speed
function updateSpeed() {
  moleSpeed = Math.max(2000 - (level-1)*200,minMoleSpeed);
  console.log(`Level ${level}:moleSpeed is now ${moleSpeed}ms`)
  clearTimeout(moleTimeout);
  startMole();
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
  startMole();
  // setInterval(setMole, 2000); //2000 milliseconds = 2 seconds
  setInterval(setPlant, 3000);

  //BonusTile
  setInterval(setBonus, 7000);

  startTimer();
}

// timer
function startTimer() {
  document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
  timeInterval = setInterval(()=>{
    if (gameOver) {
      clearInterval(timeInterval);
      return;
    }
    timeLeft--;
    document.getElementById("timer").innerText = `Time left: ${timeLeft}s`
 
    if (timeLeft <= 0) {
      gameOver = true;
      document.getElementById("score").innerText = `GAME OVER: ${score}`;
      clearInterval(timeInterval);
    }
  },1000);
}

// level
function updateLevel() {
  let newLevel = Math.floor(score/100) +1;
  console.log(`score:${score},calculated level: ${newLevel}`)
  if (newLevel > level) {
    level = newLevel;
    showLevelUpMessage();
    updateSpeed();
    updateLevelDisplay();
  }
}
function showLevelUpMessage(){
  alert(`Level up! You are now at Level ${level}`)
}
function updateLevelDisplay() {
  document.getElementById("level").innerText = `Your Level: ${level}`;

}


function getRandomTile() {
  //math.random > (0-1)*9 = 0 -9 > round down to (0-8) integers
  let num = Math.floor(Math.random()*9);
  return num.toString();
}


function setMole() {
  //GameOver
  if(gameOver) {
    return;
  }
  //reset mole  
  if(currentMoleTile) {
    currentMoleTile.innerHTML = "";
  }

  let mole = document.createElement("img");
  mole.src = "./img/Mole.png";


  //Set the plant,mole and star to avoid the same tile 
  let num;
  do {
    num = getRandomTile();
  }while (
    (currPlantTile && currPlantTile.id === num) ||
    (currBonusTile && currBonusTile.id === num)
  );
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

  let num;
  do {
    num = getRandomTile();
  }while (
    (currentMoleTile && currentMoleTile.id === num) ||
    (currBonusTile && currBonusTile.id === num)
  );
  currPlantTile = document.getElementById(num);
  currPlantTile.appendChild(plant);
}
//BonusTile
function setBonus() {
  if(gameOver) return;
  if (currBonusTile) {
    currBonusTile.innerHTML = "";
  }

  let bonus = document.createElement("img");
  bonus.src = "./img/Star.png"
 
  let num;
  do {
    num = getRandomTile();
  }while (
    (currentMoleTile && currentMoleTile.id === num) ||
    (currPlantTile && currPlantTile.id === num)
  )
  currBonusTile = document.getElementById(num);
  currBonusTile.appendChild(bonus)
}

// Tile clickable
function selectTile () {
  if (gameOver) {
    return;
  }

  if(this == currentMoleTile) {
    score += 10;
    document.getElementById("score").innerText = "Your Score: " + score.toString();
    updateLevel();

  } else if (this == currPlantTile) {
    score -= 20;
    if (score <0) {
      score = 0;
      gameOver = true;
      document.getElementById("score").innerText = "GAME OVER";
    }else {
      document.getElementById("score").innerText = "Your Score: " +  score.toString();
    }
    updateLevel();

  }else if(this == currBonusTile) {
    let bonusType = Math.random() < 0.5 ? 'score' : 'time';
    if (bonusType === 'score') {
    score += 50;
    document.getElementById("score").innerText = "Your Score: " + score.toString();
  }else {
    timeLeft += 5;
    document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
  }
  currBonusTile.innerHTML = "";
  currBonusTile = null;
  updateLevel();
  }
}

// modal
document.addEventListener("DOMContentLoaded",() => {
  const modal = document.getElementById("howToPlayModal");
  const btn = document.getElementById("howToPlayBtn");
  const span = document.querySelector(".close");

  btn.addEventListener("click",()=>{
    modal.style.display = "block";
  })

  span.addEventListener("click",()=>{
    modal.style.display = "none"
  })

  window.addEventListener("click",(event)=> {
    if(event.target === modal) {
      modal.style.display = "none"
    }
  })
})


