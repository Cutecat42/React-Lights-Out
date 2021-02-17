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

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
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

      return (
        <div className="Board">
        {initialBoard.map((v,i)=><div key={i}>
        {console.log("row")}
        {console.log(v)}

        {v.map((x,i)=><Cell isLit={x} key={i+3}/>)}
        
          </div>)}
          </div>
      )
  }
  

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  // TODO

  return (
    board
  )
}

export default Board;
