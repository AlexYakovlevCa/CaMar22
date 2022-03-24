
function setMines(board,clickIdxI,clickIdxJ){
//gets a board and places random bombs on the amount of Glevel 
// for(var i = 0;i<gLevel.minesCount;i++){
var minePlacement= 0
// }
while(minePlacement<gLevel.minesCount){
    var idxI =getRandomIntInclusive(0, gLevel.boardSize-1)
    var idxj =getRandomIntInclusive(0, gLevel.boardSize-1)
    if(idxI===clickIdxI&&idxj===clickIdxJ)continue
    if(board[idxI][idxj].isMine)continue
    else{
        board[idxI][idxj].isMine =true
        minePlacement++
    } 
}
}


function setMinesNegsCount(board) {
  var mines = [];
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      var cell = board[i][j];
      if (cell.isMine === true) {
        mines.push(cell);
        getNeighbors(board, cell.i, cell.j);
      }
    }
  }
}

function getNeighbors(mat, idxI, idxJ) {
  for (var i = idxI - 1; i <= idxI + 1; i++) {
    if (i < 0 || i > mat.length - 1) continue;

    for (var j = idxJ - 1; j <= idxJ + 1; j++) {
      if (i === idxI && j === idxJ) continue;
      if (j < 0 || j > mat[i].length - 1) continue;
      var cell = mat[i][j]; // 8 
      cell.isMine ? (cell.minesAround = null) : cell.minesAround++; // counting all the bomb negs and if they are not bomb themselfs
      // its add to mines around
    }
  }

  return 
}
