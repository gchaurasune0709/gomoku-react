import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

let navigate;
let params;
let history; 
function getData () {
    history = localStorage.getItem("history");
    if (history !== null) {
        history = JSON.parse(history);
        console.log(history[params.id])
        console.log(params)
        return history[params.id]
    }
}

function createBoard(size) {
    let boardContainer = document.querySelector('.board');
    boardContainer.style.gridTemplateColumns = `repeat(${size}, 25px)`;
    boardContainer.style.width = `${size * 25 + 2}px`;
    boardContainer.innerHTML = '';
    boardContainer.style.setProperty('--size', size);
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            boardContainer.appendChild(cell);
        }
    }
}


function renderBoard() {
    const data = getData()
    const keys = Object.keys(data.play)
    document.querySelector('.info').textContent = data.status
    console.log(keys)
        for (let cc = 0; cc < keys.length; cc++) {
            const pos = data.play[keys[cc]].pos
            const Rindex = pos.indexOf('R')
            const Cindex = pos.indexOf('C')
            console.log(Rindex)
            console.log(Cindex)
            const row = pos.substring(Rindex + 1, Cindex);
            const col = pos.substring(Cindex + 1)
            console.log(row)
            console.log(col)
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            console.log(cell)
            const blackchild = document.createElement('div');
            const whitechild = document.createElement('div');
            const ball_number = document.createElement('p');
            ball_number.textContent = cc + 1;
            whitechild.className = 'white-ball';
            blackchild.className = 'black-ball';
            cell.className = 'cell';
            cell.dataset.row = row.toString();
            cell.dataset.col = col.toString();
            if (data.play[keys[cc]].pl === 'X') {
                    cell.innerHTML = ''
                    ball_number.className = 'whiteballp';
                    blackchild.appendChild(ball_number);
                    cell.appendChild(blackchild);
                }
                else if (data.play[keys[cc]].pl === 'O') {
                    cell.innerHTML = ''
                    ball_number.className = 'blackballp';
                    whitechild.appendChild(ball_number);
                    cell.appendChild(whitechild);
                }
            }
}

function goBack(e) {
    navigate('/games');
    navigate(0)
}

const History = () => {
    navigate = useNavigate();
    params = useParams();
    useEffect(() => {
        const data = getData()
        createBoard(data.size)
        renderBoard();
    }, [])
    return (
        <>
            <p className="info"></p>
            <div className="board">
            </div>
            <div className="historyControl">
                <button className="Back" onClick={goBack}>Back</button>
            </div>
        </>
    )
}

export default History;