
// this function gets aclicked cell
 // than takes all the neg and makes them seen if they are not a bomb
 // than takes all the cells with EMPTY value inside them and recursses
 // and for each cell that recurses she marks him so she wont recurss the cell again 



function getNeighborsPickedCell(mat, idxI, idxJ) {
  if (mat[idxI][idxJ].minesAround > 0) return;
  if (mat[idxI][idxJ].isMine) return;
  //   console.log(mat, idxI, idxJ);
  var neightbors = [];   
  // var undoTurns = []                              
  mat[idxI][idxJ].isSeen = true;                   
  mat[idxI][idxJ].isRec = true                      
                                                                                                            

  for (var i = idxI - 1; i <= idxI + 1; i++) {
    if (i < 0 || i > mat.length - 1) continue;

    for (var j = idxJ - 1; j <= idxJ + 1; j++) {
      if (i === idxI && j === idxJ) continue;
      if (j < 0 || j > mat[i].length - 1) continue;
      var cell = mat[i][j];
      var location = { i, j };
      if (cell.isMine) continue;  
      if(cell.isSeen) continue
      cell.isSeen = true;
      
      var elCell = renderCell(location, cell.minesAround);
      elCell.classList.add('visable-cell');
      // undoTurns.push(cell)
      Undo[Undo.length-1].push(cell)
      if (cell.minesAround===EMPTY&&cell.isRec===false) {
        neightbors.push(cell)

      }
       
    
    }
  }

  // undoTurns = [] 
//   console.log(neightbors);
  for(var k = 0;k<neightbors.length;k++){
      neightbors[k].isRec = true
      getNeighborsPickedCell(mat, neightbors[k].i, neightbors[k].j)
      neightbors.shift()
  }
  
  return neightbors;
}
