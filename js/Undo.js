function undo (){
    if(Undo.length<1)return
 var lastMove=   Undo.pop()
 if(!lastMove)return
 console.log(lastMove);
 for(var i =0;i<lastMove.length;i++){
     var cell = lastMove[i]
     gBoard[cell.i][cell.j].isSeen = false
     gBoard[cell.i][cell.j].isFlaggd = false
    document.querySelector(`.cell-${cell.i}-${cell.j}`).classList.remove('visable-cell')
 }
}