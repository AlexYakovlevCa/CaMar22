'use strict';

/*
DONE!! : smile is sad when GameOver(), smile is Superhappy when win ,smile 
DONE!! : FLAG COUNTER
DONE!! : hints = onclick if hints is on interval (class visable,1500) than back ~~~3 HINTS~~~~
DONE!! : heart = if clickd on bomb -1 heart than back  gameOver when heart = 0 ~~~3 Hearts~~~~
DONE!! : HTML WIN\Loss screen
day 2
DONE!!: local storage.
TODO: Eye that sees.. 
TODO: safeClick .. 
DONE!!: Mines Effect 
*/

const FLAG = '🚩';
const EMPTY = ' ';
const MINE = '💣';
const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8']; // not needed for now
const COLORS = [
  ' ',
  'pink',
  'faebd7',
  'red',
  'purle',
  'black',
  'Gray',
  'Maroon',
  'Turquoise',
  '',
];
var Undo;
var gBoard;
var gStartTime;
var gameStartinter;
var gIsHint = false;
var elH1timer = document.querySelector('.timer');
var elSmiley = document.querySelector('.smiley');
var elFlagCounter = document.querySelector('.flag-count');
var elHp = document.querySelector('.hp');
var elhints = document.querySelector('.hints');
var elBestTime = document.querySelector('.best-time');
var elSafeclickCount = document.querySelector('.safe-count');
var elSpanFlag = document.querySelector('.im-a-flag')
elSpanFlag.innerText='FLAG';
window.addEventListener('contextmenu', (e) => e.preventDefault());
var gLevel = {
  boardSize: 4,
  minesCount: 2,
};
var gGame = {
  isOn: false,
  shownCount: 0,
  safeClicks: 3,
  flagsCount: gLevel.minesCount,
  gameDone: false,
  life: 3,
  hints: 3,
};
function initGame() {
  Undo =[]
  elSafeclickCount.innerText = gGame.safeClicks
  elFlagCounter.innerText = pad(gGame.flagsCount)+FLAG;
  gBoard = buildBoard();
  setMinesNegsCount(gBoard);
  printMat(gBoard, '.container');
}
function hintSos() {
  if (gGame.hints === 0) return;
  gIsHint = true;
  gGame.hints--;
  checkHints();
}

function buildBoard(clickIdxI, clickIdxJ) {
  var board = [];
  for (var i = 0; i < gLevel.boardSize; i++) {
    board.push([]);
    for (var j = 0; j < gLevel.boardSize; j++) {
      var cell = {
        i,
        j,
        isMine: false,
        isSeen: false,
        minesAround: 0,
        isFlaggd: false,
        isRec: false,
      };
      board[i][j] = cell;
    }
  }
  ////mine 1
  ///mine 2
  setMines(board, clickIdxI, clickIdxJ);
  return board;
}

function gameOver() {
  gGame.gameDone = true;
  console.log('game Over');
  elSmiley.innerText = '😖';
  clearInterval(gameStartinter);
  revelMines();
}

function checkWin() {
  // debugger
  for (var i = 0; i < gLevel.boardSize; i++) {
    for (var j = 0; j < gLevel.boardSize; j++) {
      if (gBoard[i][j].isMine && gBoard[i][j].isSeen) continue;
      if (gBoard[i][j].isSeen && !gBoard[i][j].isMine) {
        gGame.shownCount++;
        if (gBoard[i][j].isSeen && gBoard[i][j].isFlaggd) gGame.flagsCount++;
      }
    }
  }
  if (
    gGame.shownCount === gLevel.boardSize ** 2 - gLevel.minesCount &&
    gGame.flagsCount === 0 //||
    //    gGame.shownCount ===gLevel.boardSize ** 2 - (gLevel.minesCount - gGame.flagsCount &&gGame.flagsCount === 0) ||
    // gGame.shownCount === gLevel.boardSize ** 2 - gGame.flagsCount  &&gGame.flagsCount === 0 ||
    // gGame.shownCount === gLevel.boardSize ** 2 - gLevel.minesCount &&gGame.flagsCount === 0
  ) {
    elSmiley.innerText = '🥳';
    bestTime();
    clearInterval(gameStartinter);
    gGame.gameDone = true;
  } else gGame.shownCount = 0;
  elFlagCounter.innerText = pad(gGame.flagsCount)+FLAG
}

function revelMines() {
  var count = gLevel.minesCount;
  for (var i = 0; i < gLevel.boardSize; i++) {
    for (var j = 0; j < gLevel.boardSize; j++) {
      if (gBoard[i][j].isMine) {
        // setTimeout(() => {
         var mineCell= document.querySelector(`.cell-${i}-${j}`);
        mineCell.classList.add('visable-cell','game-over-mines')
        // mineCell.style.backgroundColor = 'pink'
         count--;
        // }, 1000);
      }
      if (count === 0) break;
    }
  }
}
// bestTime()
function bestTime() {
  var currTime = elH1timer.innerText;
  var bestTime = '0';
  bestTime < currTime ? (bestTime = currTime) : (bestTime = bestTime);
  localStorage.setItem('bestTime', bestTime);
  // (localStorage.getItem('bestTime'));
  elBestTime.innerText = `Best Time \n ${localStorage.getItem('bestTime')}`;
  //  if(bestTime>currTime){
  return;
  //  }
}
