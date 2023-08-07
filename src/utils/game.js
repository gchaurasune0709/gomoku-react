import { v4 } from 'uuid';

class GomokuGame {
    constructor(size) {
      this.size = size;
      this.board = Array.from(Array(size), () => Array(size).fill(''));
      this.currentPlayer = 'X';
      this.gameOver = false;
      this.count = 0
      this.history = {
        id: v4(),
        size: this.size,
        play: {}
      }
    }

    makeMove(row, col) {
        if (this.gameOver || this.board[row][col] !== '') return false;
        this.board[row][col] = this.currentPlayer;
        this.count += 1;
        this.history.play[`${this.count}`] = {
          pos: `R${row}C${col}`,
          pl: `${this.currentPlayer}`
        }
        
        if (this.checkWin(row, col)) {
          this.gameOver = true;
          
        } else if (this.isDraw()) {
          this.gameOver = true;
        } else {
          this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        }
        
        return true;
    }
      
    isDraw() {
        for (let row = 0; row < this.size; row++) {
          for (let col = 0; col < this.size; col++) {
            if (this.board[row][col] === '') {
              return false;
            }
          }
        }
        return true;
    }

    checkWin(row, col) {
      const directions = [
        [0, 1], [1, 0], [1, 1], [-1, 1] // right, down, diagonal, anti-diagonal
      ];
      const player = this.board[row][col];
      for (const [dr, dc] of directions) {
        let count = 1;
        for (let step = 1; step <= 4; step++) {
          const newRow = row + dr * step;
          const newCol = col + dc * step;
          if (this.isValidPosition(newRow, newCol) && this.board[newRow][newCol] === player) {
            count++;
          } else {
            break;
          }
        }
        for (let step = 1; step <= 4; step++) {
          const newRow = row - dr * step;
          const newCol = col - dc * step;
          if (this.isValidPosition(newRow, newCol) && this.board[newRow][newCol] === player) {
            count++;
          } else {
            break;
          }
        }
        if (count >= 5) {
          return true;
        }
      }
      return false;
    }

    isValidPosition(row, col) {
      return row >= 0 && row < this.size && col >= 0 && col < this.size;
    }
  }

 export default GomokuGame;