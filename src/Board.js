import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard(nrows, ncols,chanceLightStartsOn));

  function createBoard(nrows, ncols,chanceLightStartsOn=50) {
    let initialBoard = [];
    for (let i=0; i < ncols;i++) {
      initialBoard[i] = []
      for (let j=0;j < nrows;j++) {
        let rand = Math.floor(Math.random()*2)
        if (chanceLightStartsOn===0) {
          rand = false
        }
        if (chanceLightStartsOn===100) {
          rand = true
        }
        if (rand===0) {
          rand = false
        }
        if (rand===1){
          rand = true
        }         
          initialBoard[i][j] = rand 
      }
    }
    
    if (hasWon(initialBoard,ncols,nrows) === true) {
      return (
        <div className="Board">Game WON!</div>
      )
    }

      return (

        <div className="Board">
        {initialBoard.map((v,i)=><div key={i}>

        {v.map((x,idx)=><Cell isLit={x} key={`${i}-${idx}`} flipCellsAroundMe={() => flipCellsAround(`${i}-${idx}`,initialBoard)}/>)}
        
          </div>)}
          </div>
      )
  }
  

  function hasWon(board,ncols,nrows) {
    for (let i=0;i < nrows;i++) {
      for (let j=0;j < ncols;j++) {
        if (board[i][j] === true) {
          return false
        }
      }
    }
    return true
  }

  function flipCellsAround(coord, initialBoard) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      const flipCell = (y, x, boardCopy) => {

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
          if (y !== 0) {
            boardCopy[y-1][x] = !boardCopy[y-1][x];
          }
          if (y !== nrows-1) {
            boardCopy[y+1][x] = !boardCopy[y+1][x];
          }
          if (x !== 0) {
            boardCopy[y][x-1] = !boardCopy[y][x-1];
          }
          if (x !== ncols-1) {
            boardCopy[y][x+1] = !boardCopy[y][x+1];
          }  
        }
      };

      const boardCopy = [...initialBoard]
      flipCell(y,x,boardCopy)

      if (hasWon(boardCopy,ncols,nrows) === true) {
        return (
          <div className="Board">Game WON!</div>
        )
      }

      return (
        <div className="Board">
        {boardCopy.map((v,i)=><div key={i}>

        {v.map((x,idx)=><Cell isLit={x} key={`${i}-${idx}`} flipCellsAroundMe={() => flipCellsAround(`${i}-${idx}`,boardCopy)}/>)}
        
          </div>)}
          </div>
      )
    });
  }

  return (
    board
  )
}

export default Board;
