'use strict';

/*
DONE!! : smile is sad when GameOver(), smile is Superhappy when win ,smile 
DONE!! : FLAG COUNTER
DONE!! : hints = onclick if hints is on interval (class visable,1500) than back ~~~3 HINTS~~~~
DONE!! : heart = if clickd on bomb -1 heart than back  gameOver when heart = 0 ~~~3 Hearts~~~~
TODO : HTML WIN\Loss screen 
*/

const FLAG = '🚩';
const EMPTY = ' ';
const MINE = '💣';
const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8']; // not needed for now
const COLORS = [
  ' ',
  'blue',
  'green',
  'red',
  'purle',
  'black',
  'Gray',
  'Maroon',
  'Turquoise',
  '',
];
var gBoard;
var gStartTime;
var gameStartinter;
var gIsHint = false;
var elH1timer = document.querySelector('.timer');
var elSmiley = document.querySelector('.smiley');
var elFlagCounter = document.querySelector('.flag-count');
var elHp = document.querySelector('.hp');
var elhints = document.querySelector('.hints');
window.addEventListener('contextmenu', (e) => e.preventDefault());
var gLevel = {
  boardSize: 4,
  minesCount: 2,
};
var gGame = {
  isOn: false,
  shownCount: 0,
  flagsCount: gLevel.minesCount,
  gameDone: false,
  life: 3,
  hints: 3,
};
function hintSos() {
  if (gGame.hints === 0) return;
  gIsHint = true;
  gGame.hints--;
  checkHints();
}
function init() {
  elFlagCounter.innerText = gGame.flagsCount;
  gBoard = buildBoard();
  setMinesNegsCount(gBoard);
  printMat(gBoard, '.container');
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
  setBombs(board, clickIdxI, clickIdxJ);
  return board;
}

function gameOver() {
  gGame.gameDone = true;
  console.log('game Over');
  elSmiley.innerText = '😖';
  clearInterval(gameStartinter);
  // init()
}

function checkWin() {
  // debugger
  for (var i = 0; i < gLevel.boardSize; i++) {
    for (var j = 0; j < gLevel.boardSize; j++) {
      if (gBoard[i][j].isSeen && !gBoard[i][j].isMine) {
        gGame.shownCount++;
        if (gBoard[i][j].isSeen && gBoard[i][j].isFlaggd) gGame.flagsCount++;
      }
    }
  }
  if (
    gGame.shownCount === gLevel.boardSize ** 2 - gLevel.minesCount &&
    gGame.flagsCount === 0
  ) {
    elSmiley.innerText = '🥳';
    clearInterval(gameStartinter);
    gGame.gameDone = true;
  } else gGame.shownCount = 0;
  elFlagCounter.innerText = gGame.flagsCount;
}
