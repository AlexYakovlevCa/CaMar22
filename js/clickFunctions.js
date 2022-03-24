function difficulty(elDiff, size, mines) {
  if (elDiff.innerText === 'Custom') {
    gLevel.boardSize = prompt('size please?');
    gLevel.minesCount = prompt('how many mines??');
  } else {
    gLevel.boardSize = size;
    gLevel.minesCount = mines;
  }
  restart();
}
function checkLife() {
  if (gGame.life === 3) elHp.innerText = '💖 💖 💖';
  if (gGame.life === 2) elHp.innerText = '💖 💖 💔';
  if (gGame.life === 1) elHp.innerText = '💖 💔 💔';
  if (gGame.life === 0) elHp.innerText = '💔 💔 💔';
}
function checkHints() {
  if (gGame.hints === 3) elhints.innerText = '🆘 🆘 🆘';
  if (gGame.hints === 2) elhints.innerText = '🆘 🆘 ❌';
  if (gGame.hints === 1) elhints.innerText = '🆘 ❌ ❌';
  if (gGame.hints === 0) elhints.innerText = '❌ ❌ ❌';
}
function restart() {
  gGame.gameDone = false;
  gGame.isOn = false;
  clearInterval(gameStartinter);
  elSmiley.innerText = '🙂';
  elH1timer.innerText = '00:00';
  gGame.flagsCount = gLevel.minesCount;
  gGame.shownCount = 0;
  gGame.life = 3;
  gGame.safeClicks= 3;
  gGame.hints = 3;
  checkLife();
  checkHints();
  initGame();
}
function hintIsOn(idxI, idxJ) {
  for (var i = idxI - 1; i <= idxI + 1; i++) {
    if (i < 0 || i > gBoard.length - 1) continue;
    for (var j = idxJ - 1; j <= idxJ + 1; j++) {
      // if (i === idxI && j === idxJ) continue;
      if (j < 0 || j > gBoard.length - 1) continue;
      if (gBoard[i][j].isSeen) continue;
      //  if(document.querySelector(`.cell-${i}-${j}`).contains(visable-cell))continue
      document.querySelector(`.cell-${i}-${j}`).classList.add('visable-cell');
      // 8
    }
  }

  gIsHint = false;
}
function hintIsOff(idxI, idxJ) {
  for (var i = idxI - 1; i <= idxI + 1; i++) {
    if (i < 0 || i > gBoard.length - 1) continue;

    for (var j = idxJ - 1; j <= idxJ + 1; j++) {
      // if (i === idxI && j === idxJ) continue;
      if (j < 0 || j > gBoard.length - 1) continue;
      if (gBoard[i][j].isSeen) continue;
      document
        .querySelector(`.cell-${i}-${j}`)
        .classList.remove('visable-cell');
      // 8
    }
  }
}

function leftClick(elCell, i, j) {
  if (gGame.gameDone) return;

  if (!gGame.isOn) {
    gGame.isOn = true;
    gBoard = null;
    gBoard = buildBoard(i, j);
    setMinesNegsCount(gBoard);
    printMat(gBoard, '.container');
    // var clickdPos = {i,j}
    document.querySelector(`.cell-${i}-${j}`).classList.add('visable-cell');
    gStartTime = Date.now();
    gameStartinter = setInterval(gameTime, 1000);
  }

  if (gIsHint) {
    console.log('heyy');
    hintIsOn(i, j);
    setTimeout(hintIsOff, 1000, i, j);

    return;
  }
  var cell = gBoard[i][j];
  var location = { i, j };
  if (cell.isFlaggd) return;
  if (cell.isSeen) return;

  cell.isSeen = true;
Undo.push([cell])
  elCell.classList.add('visable-cell');

  if (cell.isMine === true) renderCell(location, MINE);
  if (cell.isMine === true && gGame.life > 0) {
    gGame.life--;
    if(cell.isMine&&flagsCount>0)    gGame.flagsCount--;

    checkLife();
  }
  if (cell.isMine && gGame.life === 0) {
    checkLife();
    gameOver();
  }

  getNeighborsPickedCell(gBoard, location.i, location.j);
  checkWin();
}
function gameTime() {
  var str = timer();

  elH1timer.innerText = str;
}
function rightClick(elCell, i, j) {
  if (gGame.gameDone) return;
  if (!gGame.isOn) {
    gStartTime = Date.now();
    gameStartinter = setInterval(gameTime, 1000);
    gGame.isOn = true;
  }
  var location = { i, j };
  var cell = gBoard[i][j];

  if (cell.isSeen) return;
  if (gGame.flagsCount === 0 && cell.isFlaggd == false) {
    return;
  }
  var valeRender;

  elCell.classList.toggle('flaggd');
  cell.isFlaggd === false ? (cell.isFlaggd = true) : (cell.isFlaggd = false);
  if (cell.isFlaggd === false) gGame.flagsCount++;
  if (cell.isFlaggd === true) gGame.flagsCount--;
  //   checkWin()
  elFlagCounter.innerText = gGame.flagsCount+FLAG

  if (cell.isFlaggd) valeRender = FLAG;
  if (!cell.isFlaggd && cell.isMine) valeRender = FLAG;
  if (!cell.isFlaggd && !cell.isMine) valeRender = cell.minesAround;
  cell.isFlaggd === false
    ? renderCell(location, valeRender)
    : renderCell(location, valeRender);
  checkWin();
}
function safeClick() {
  if(gGame.safeClicks===0)return
  gGame.safeClicks--;
  var loop = 1

  for (var i = 0; i< gLevel.boardSize&&loop>0; i++) {
    console.log('inside loop',i);
    for(var j = 0;j<gLevel.boardSize&&loop>0;j++){
      var cell = gBoard[i][j]
      if(cell.isFlaggd||cell.isMine||cell.isSeen) continue
      
      document.querySelector(`.cell-${i}-${j}`).classList.add('safefor-click')
      loop--
    }
  }
  setTimeout(() => {
    document.querySelector(`.cell-${i-1}-${j-1}`).classList.remove('safefor-click')
  }, 1000);
    

  elSafeclickCount.innerText = gGame.safeClicks;
}
