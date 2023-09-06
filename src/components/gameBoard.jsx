import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GameBoard() {
  const [gameState, setGameState] = useState({
    _id: '',
    board: [[]],
    status: '',
    winner: '',
  });
  const [currentPlayer, setCurrentPlayer] = useState('X'); // Initialize the current player as 'X'

  useEffect(() => {
    // Fetch game state from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.33.10:3000/api/game', {withCredentials: true, }); // Adjust the API endpoint
        setGameState(response.data);
      } catch (error) {
        console.error('Error fetching game state:', error.response.data.message);
      }
    };

    fetchData();
  }, []); // Run this effect only once when the component mounts

  // Function to handle a player's move
  const handleMove = async (rowIndex, colIndex) => {
    try {
      // Check if the cell is empty before making the move
      if (gameState.board[rowIndex][colIndex] === '') {
        const response = await axios.put(`/api/games/${gameState._id}/move`, {
          x: rowIndex,
          y: colIndex,
        }); // Adjust the API endpoint and request data

        // Update the game state with the response data
        setGameState(response.data);

        // Toggle the current player ('X' to 'O' or 'O' to 'X')
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      } else {
        // Handle invalid move (cell is not empty)
        console.log('Invalid move. Cell is not empty.');
      }
    } catch (error) {
      console.error('Error making a move:', error.response.data.message);
    }
  };

  // Function to render the game board grid
  const renderGameBoard = () => {
    const { board } = gameState;

    return (
      <div className="game-board">
        {board.map((row, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <div
                className="board-cell"
                key={colIndex}
                onClick={() => handleMove(rowIndex, colIndex)} // Set move coordinates based on cell click
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>Gomoku Game</h2>
      <p>Current Player: {currentPlayer}</p>

      {renderGameBoard()}
      <p>Status: {gameState.status}</p>
      <p>Winner: {gameState.winner}</p>
    </div>
  );
}

export default GameBoard;