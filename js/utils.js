'use strict'

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// function getRandomColor() {
//   var letters = '0123456789ABCDEF'
//   var color = '#'
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)]
//   }
//   return color
// }

function copyMat(mat) {
  var newMat = []
  for (var i = 0; i < mat.length; i++) {
    newMat[i] = []
    for (var j = 0; j < mat[0].length; j++) {
      newMat[i][j] = mat[i][j]
    }
  }
  return newMat
}

// let gNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
// function drawNum() {
//   //NOTICE: WE NEED GLOBAL NUMBERS ARRAY - gNumbers
//   const idx = getRanndomIntInclusive(0, numbers.length - 1)
//   return numbers.splice(idx, 1)[0]
// }

// function getNeighbors(mat, idxI, idxJ) {
//   var neightbors = []
//   for (var i = idxI - 1; i <= idxI + 1; i++) {
//     if (i < 0 || i > mat.length -1) continue

//     for (var j = idxJ - 1; j <= idxJ + 1; j++) {
//       if (i === idxI && j === idxJ) continue
//       if (j < 0 || j > mat[i].length - 1) continue

//       neightbors.push(mat[i][j])
//     }
//   }

//   return neightbors
// }

//** TIMER */

function pad(val) {
  let valString = val + ''
  if (valString.length < 2) return '0' + valString
  return valString
}


function timer() {
  //NOTICE: WE NEED GLOBAL START TIME - gStartTime
  var timeDiff = Date.now() - gStartTime
  //   var currTime = new Date(timeDiff)

  //   return currTime //shows in milliseconds

  //OR
  var currTime = new Date(timeDiff)
  var timeStr = pad(currTime.getMinutes()) //pad make it 01, 02 and so on
  timeStr += ':' + pad(currTime.getSeconds())
  
  return timeStr
}

function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  

  elCell.innerHTML = value;
  return elCell;
}
function printMat(mat, selector) {
  var strHTML = '<table><tbody>'; ///   html 
  var tdValue ;
  for (var i = 0; i < mat.length; i++) {
    // console.log(strHTML);
    strHTML += '<tr>';
    for (var j = 0; j < mat.length; j++) {
      var cell = mat[i][j];
      tdValue = cell.minesAround
      if(cell.minesAround === 0) tdValue = EMPTY
      if(cell.minesAround===0) cell.minesAround = EMPTY
      if(cell.isMine) tdValue = MINE

      var className = `cell-${i}-${j}`;
      strHTML += `<td style = "color:${COLORS[cell.minesAround]}" oncontextmenu="rightClick(this,${i},${j})" onclick="leftClick(this,${i},${j})" class="${className}"> ${tdValue}</td>`;
    }
    strHTML += '</tr>';
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}