import React from "react";
import GomokuGame from '../utils/game';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


let game;
let boardContainer;
let navigate;

function createBoard(size) {
    boardContainer = document.querySelector('.board');
    boardContainer.style.gridTemplateColumns = `repeat(${game.size}, 25px)`;
    boardContainer.style.width = `${game.size * 25 + 2}px`;
    boardContainer.innerHTML = '';
    boardContainer.style.setProperty('--size', size);
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => makeMove(row, col));
            boardContainer.appendChild(cell);
        }
    }
}

function startGame(boardSize) {
    document.querySelector('.current_player').textContent = 'Current Player: Black';
    game = new GomokuGame(boardSize);
    createBoard(boardSize);
}

function makeMove(row, col) {
    if (game.makeMove(row, col)) {
        if (game.currentPlayer === 'X') document.querySelector('.current_player').textContent = 'Current Player: Black'
        else document.querySelector('.current_player').textContent = 'Current Player: White'
        renderBoard();
        let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(Date.now());
        let month = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(Date.now());
        let day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(Date.now());
        const dd = `${day}/${month}/${year}`
        if (game.isDraw()) {
            document.querySelector('.current_player').textContent = `Game Over: draw`;
            game.history.status = `Game Over: draw`;
            game.history.date = dd;
        }
        else if (game.gameOver){
            console.log(game.history)
            let winn = 'Black'
            if (game.currentPlayer === 'O') winn = 'White' 
            document.querySelector('.current_player').textContent = `Winner: ${winn}`
            game.history.status = `Winner: ${winn}`;
            game.history.date = dd;
        }
        
    }
}

function renderBoard() {
    const theBoard = document.querySelector('.board')
    theBoard.style.gridTemplateColumns = `repeat(${game.size}, 25px)`;
    theBoard.style.width = `${game.size * 25 + 2}px`;
    for (let row = 0; row < game.size; row++) {
        for (let col = 0; col < game.size; col++) {
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            const blackchild = document.createElement('div');
            const whitechild = document.createElement('div');
            whitechild.className = 'white-ball';
            blackchild.className = 'black-ball';
            cell.className = 'cell';
            cell.dataset.row = row.toString();
            cell.dataset.col = col.toString();
            if (game.board[row][col] !== null) {
                if (game.board[row][col] == 'X') {
                    cell.innerHTML = ''
                    cell.appendChild(blackchild);
                }
                else if (game.board[row][col] == 'O') {
                    cell.innerHTML = ''
                    cell.appendChild(whitechild);
                }
            }
        }
    }
}


const GameDesign = () => {
    navigate = useNavigate();
    const size = parseInt(localStorage.getItem('boardSize'))
    useEffect(()=> {
        startGame(size);
        document.querySelector('.restart').addEventListener('click', () => startGame(size));
        document.querySelector('.leave').addEventListener('click', () => {
            if (game.gameOver) {
                let saved = localStorage.getItem('history')
                if (saved === null) {
                    const ob = {
                        [game.history.id]: game.history
                    }
                    localStorage.setItem('history', JSON.stringify(ob))
                }
                else {
                    saved = JSON.parse(saved);
                    saved[game.history.id] = game.history
                    localStorage.removeItem('history')
                    localStorage.setItem('history', JSON.stringify(saved))
                }
            }
            navigate('/games');
            return
        })
    }, [])
    
    return (
        <>
            <p className="current_player">Current Player: Black</p>
            <div className="board">
                
            </div>
            <div className="gameControls">
                <button className="restart">Restart</button>
                <button className="leave">Leave</button>
            </div>
        </>
    )
}

export default GameDesign;