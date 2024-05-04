// Set this constant to true to debug the placement of bombs without
// having to click on all cells to reveal them.
const CHEAT_REVEAL_ALL = false;

const ROWS_COUNT = 10;
const COLS_COUNT = 10;
const BOMBS_COUNT = 15;

var defeat = false;
var victory = false;

let header = document.querySelector("#mainheader");
let flagInfo = document.createElement("p");
let flagText = document.createTextNode(
  "you can create 🚩 by holding a Shift key"
);
flagInfo.appendChild(flagText);
header.insertAdjacentElement("beforeEnd", flagInfo);

// Cell constructor
function Cell() {
  this.discovered = false;
  this.isBomb = false;
  this.hasBeenFlagged = false;
}

// Initialize cells
var cells = Array(ROWS_COUNT);
for (var row = 0; row < ROWS_COUNT; row++) {
  cells[row] = Array(COLS_COUNT);
  for (var col = 0; col < COLS_COUNT; col++) {
    cells[row][col] = new Cell();
  }
}

//
// TODO: Task 1 - add some bombs at fixed positions.
/**cells[0][1].isBomb = true;
cells[1][7].isBomb = true;
cells[4][9].isBomb = true;
cells[8][2].isBomb = true;
cells[9][2].isBomb = true;
cells[9][9].isBomb = true;*/

//
// TODO: Task 2 - Comment out the code of task 1. Instead of adding bombs in fixed places, add 10 of them in random places.
//                Add a BOMBS_COUNT constant so that you can easily change the amount of bombs placed. Put it next to the
//                other constants.
//

let q = 0;
for (q = 0; q < BOMBS_COUNT; q++) {
  let randomIndex1 = Math.floor(Math.random() * ROWS_COUNT);
  let randomIndex2 = Math.floor(Math.random() * COLS_COUNT);
  cells[randomIndex1][randomIndex2].isBomb = true;
  //console.log(randomIndex1, randomIndex2);
}

// Once the game has been initialized, we "render" it.
render();

function countAdjacentBombs(row, col) {
  // the function countAdjacentBombs() is called once for each cell
  //number is displayed in the cell if the return value is greater than 1.
  let bombCount = 0;

  // console.log("checking cell", row, col);
  for (let i = -1; i <= 1; i++) {
    for (let c = -1; c <= 1; c++) {
      // console.log("checking coords", i, c)
      let newRow = row + i;
      let newCol = col + c;
      if (
        newRow >= 0 &&
        newRow < ROWS_COUNT &&
        newCol >= 0 &&
        newCol < COLS_COUNT
      ) {
        if (cells[newRow][newCol].isBomb) {
          bombCount++;
        }
      }
    }
  }
  //console.log(bombCount);
  return bombCount;
}

/**const checkingArea = [
  cells[row][col + 1],
  cells[row][col - 1],
  cells[row + 1][col],
  cells[row + 1][col + 1],
  cells[row + 1][col - 1],
  cells[row - 1][col],
  cells[row - 1][col + 1],
  cells[row - 1][col - 1]
]; */

//
// Game functions definitions
//
// TODO: Task 6 - Discover neighbor cells recursively, as long as there are no adjacent bombs to the current cell.
//
function discoverCell(row, col) {
  if (row < 0 || row >= ROWS_COUNT || col < 0 || col >= COLS_COUNT) {
    return;
  }
  if (cells[row][col].discovered) {
    return;
  }

  console.log("discovering cell", row, col);
  cells[row][col].discovered = true;
  if (cells[row][col].isBomb) {
    defeat = true;
  }

  let bombCount = countAdjacentBombs(row, col);
  console.log("bomb count nearby", bombCount);
  if (bombCount == 0) {
    console.log("no bombs nearby");

    for (let i = -1; i <= 1; i++) {
      for (let c = -1; c <= 1; c++) {
        let newRow = row + i;
        let newCol = col + c;
        if (
          newRow >= 0 &&
          newRow < ROWS_COUNT &&
          newCol >= 0 &&
          newCol < COLS_COUNT
        ) {
          discoverCell(newRow, newCol);
        }
      }
    }
  }
}

function flagCell(row, col) {
  //
  // TODO: Task 7 - Implement flags. Flags allow the player to mark cells that they think contain a bomb.
  //                When clicking a cell and holding shift, function flagCell() will be called for you.
  //
  var cell = cells[row][col];
  if (cell.hasBeenFlagged) {
    cell.hasBeenFlagged = false;
  } else {
    cell.hasBeenFlagged = true;
  }
}
// This function is called once for each cell when rendering the game. The row and col of the current cell is
// passed to the functionn
// function countAdjacentBombs(row, col) {
//   //
//   // TODO: Task 4 - Adjacent bombs are bombs in cells touching our cell (also diagonally). Implement this function
//   //                so that it returns the count of adjacent cells with bombs in them.
//   //
//   return 1;
// }

//
  // TODO: Task 8 - Implement defeat. If the player "discovers" a bomb (clicks on it without holding shift), set the variable defeat to true.
  //

  
function getBombsCount() {
  //
  // TODO: Task 9 - Implement stats: the counters currently always display 0, calculate and return the relevant values.
  //
  let bombsCount = BOMBS_COUNT;
  for (let i = 0; i < ROWS_COUNT; i++) {
    for (let j = 0; j < COLS_COUNT; j++) {
      
      if (cells[i][j].hasBeenFlagged) {
        bombsCount--;
         console.log("bomb count:" + bombsCount);
      }
    }
  }
  return bombsCount;
}

function getClearedCells() {
  //
  // TODO: Task 9 - Implement stats: the counters currently always display 0, calculate and return the relevant values.
  //
  let clearedCells = 0;
  console.log("cleared_cells:" + clearedCells);
  for (let i = 0; i < ROWS_COUNT; i++) {
    for (let j = 0; j < COLS_COUNT; j++) {
      let cell = cells[i][j];
      if (cell.hasBeenFlagged || cell.discovered) {
        clearedCells++;
        console.log(clearedCells);
      }
    }
  }
  return clearedCells;
}

// TODO: Task 9 - Implement stats: the counters currently always display 0, calculate and return the relevant values.
function getTotalCellsToClear() {
  let totalClearedCells = ROWS_COUNT * COLS_COUNT;
  console.log("totalClearedCells:" + totalClearedCells);
  for (let i = 0; i < ROWS_COUNT; i++) {
    for (let j = 0; j < COLS_COUNT; j++) {
      let cell = cells[i][j];
      if (cell.hasBeenFlagged || cell.discovered) {
        totalClearedCells--;
        console.log(totalClearedCells);
      }
    }
  }
  return totalClearedCells;
}

function checkForVictory() {
  //
  // TODO: Task 10 - Implement victory. If the player has revealed as many cells as they must (every cell that isn't a
  //                 bomb), set variable victory to true.
  let clearedCells = getClearedCells();
  let totalClearedCells = getTotalCellsToClear();
  let bombCount = getBombsCount();
  if (bombCount === 0 && totalClearedCells === 0 || clearedCells == ROWS_COUNT * COLS_COUNT)  {
      return victory = true;
   } 
  else if (clearedCells === 0) {
    return victory = false;
  }
  return victory;
}

//
// Rendering functions
//
function getMessage() {
  if (victory == true) {
    return "Well done! 👏🏼<br><br>Refresh the page to start again.";
  } else if (defeat) {
    return "Boom! 💥<br><br>Refresh the page to try again.";
  }
  return "";
}

// "Render" the game. Update the content of the page to reflect any changes to the game state.
function render() {
  var playfield = document.getElementById("playfield");

  var html = "";

  for (var row = 0; row < ROWS_COUNT; row++) {
    html += '<div class="row">';
    for (var col = 0; col < COLS_COUNT; col++) {
      var cell = cells[row][col];
      var cellText = "";
      var cssClass = "";
      var textColor = "";
      if (cell.discovered || CHEAT_REVEAL_ALL || defeat) {
        cssClass = "discovered";
        if (cell.isBomb) {
          cellText = "💣";
        } else {
          var adjBombs = countAdjacentBombs(row, col);
          if (adjBombs > 0) {
            cellText = adjBombs.toString();
            if (adjBombs == 1) {
              textColor = "blue";
            } else if (adjBombs == 2) {
              textColor = "green";
            } else if (adjBombs == 3) {
              textColor = "red";
            } else if (adjBombs == 4) {
              textColor = "black";
            }
          }
        }
      } else {
        if (cell.hasBeenFlagged) {
          cellText = "🚩";
        }
      }
      html += `<div class="cell ${cssClass}" style="color:${textColor}" onclick="onCellClicked(${row}, ${col}, event)">${cellText}</div>`;
    }

    html += "</div>";
  }
  playfield.innerHTML = html;

  // Defeat screen
  var body = document.getElementsByTagName("body")[0];
  if (defeat) {
    body.classList.add("defeat");
  }

  // Victory screen
  if (victory) {
    body.classList.add("victory");
  }

  // Update stats
  document.getElementById("bombs-count").innerText = getBombsCount().toString();
  document.getElementById("cleared-cells-count").innerText = getClearedCells().toString();
  document.getElementById("total-cells-to-clear").innerText = getTotalCellsToClear().toString();

  // Update message
  document.getElementById("message").innerHTML = getMessage();
}

// This function gets called each time a cell is clicked. Arguments "row" and "col" will be set to the relevant
// values. Argument "event" is used to check if the shift key was held during the click.
function onCellClicked(row, col, event) {
  if (event.shiftKey) {
    flagCell(row, col);
  } else {
    discoverCell(row, col);
  }
  checkForVictory();
  render();
}
