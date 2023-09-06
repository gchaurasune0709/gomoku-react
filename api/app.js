// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// Add cookie-parser for handling cookies

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'gomoku-react-api'; // Replace with a secure secret key

// MongoDB connection
mongoose.connect('mongodb://localhost/gomoku', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// Define the User model
const User = mongoose.model('User', {
    username: String,
    password: String,
});

// Define the Game model
const Game = mongoose.model('Game', {
    board: [[String]],
    players: [String],
    status: String,
    winner: String,
});

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser()); // Use cookie-parser for handling cookies

// Middleware function to authenticate requests
function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
	return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
	if (err) {
	    return res.status(403).json({ message: 'Forbidden' });
	}

	req.user = user;
	next();
    });
}

// Function to check for a win condition
function checkForWin(board, player, x, y) {
    // Implementation of win condition check (adjust based on your rules)
    const directions = [
	{ dx: 1, dy: 0 },
	{ dx: 0, dy: 1 },
	{ dx: 1, dy: 1 },
	{ dx: 1, dy: -1 },
    ];

    for (const direction of directions) {
	let count = 1;
	for (let i = 1; i < 5; i++) {
	    const nextX = x + i * direction.dx;
	    const nextY = y + i * direction.dy;
	    if (
		nextX >= 0 &&
		    nextX < board.length &&
		    nextY >= 0 &&
		    nextY < board[nextX].length &&
		    board[nextX][nextY] === player
	    ) {
		count++;
	    } else {
		break;
	    }
	}

	for (let i = 1; i < 5; i++) {
	    const nextX = x - i * direction.dx;
	    const nextY = y - i * direction.dy;
	    if (
		nextX >= 0 &&
		    nextX < board.length &&
		    nextY >= 0 &&
		    nextY < board[nextX].length &&
		    board[nextX][nextY] === player
	    ) {
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

// Protected route - Create a new game
app.post('/api/games', authenticateToken, async (req, res) => {
    try {
	const game = new Game({
	    board: [[' ']],
	    players: [req.user.username],
	    status: 'active',
	});

	await game.save();
	res.status(201).json({ message: 'Game created!', gameId: game._id });
    } catch (error) {
	console.error(error);
	res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Protected route - Make a move in the game
// Protected route - Make a move in the game
app.put('/api/games/:id/move', authenticateToken, async (req, res) => {
    try {
	const gameId = req.params.id;
	const { x, y } = req.body;
	const player = req.user.username;

	// Fetch the game by ID
	const game = await Game.findById(gameId);

	if (!game) {
	    return res.status(404).json({ message: 'Game not found' });
	}

	// Check if the game is active
	if (game.status !== 'active') {
	    return res.status(400).json({ message: 'Game is not active' });
	}

	// Check if it's the player's turn (alternate between 'X' and 'O')
	const currentPlayer = game.board.flat().filter(cell => cell === 'X').length === game.board.flat().filter(cell => cell === 'O').length ? 'X' : 'O';
	if (currentPlayer !== player) {
	    return res.status(400).json({ message: "It's not your turn" });
	}

	// Check if the selected cell is empty
	if (game.board[x][y] !== '') {
	    return res.status(400).json({ message: 'Invalid move. Cell is not empty.' });
	}

	// Make the move by updating the board
	game.board[x][y] = currentPlayer;

	// Check for a win condition
	if (checkForWin(game.board, currentPlayer, x, y)) {
	    game.status = 'finished';
	    game.winner = currentPlayer;
	} else {
	    // Check for a draw (board is full)
	    const isBoardFull = game.board.every(row => row.every(cell => cell !== ''));
	    if (isBoardFull) {
		game.status = 'finished';
		game.winner = 'draw';
	    }
	}

	// Save the updated game state
	await game.save();

	res.json({ message: 'Move made successfully!', updatedGameState: game });
    } catch (error) {
	console.error(error);
	res.status(500).json({ message: 'Internal Server Error' });
    }
});



// Additional routes for user registration and login

// User registration endpoint
app.post('/api/users', async (req, res) => {
    try {
	const { username, password } = req.body;

	const existingUser = await User.findOne({ username });

	if (existingUser) {
	    return res.status(400).json({ message: 'Username already exists' });
	}

	const user = new User({ username, password });
	await user.save();

	res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
	console.error(error);
	res.status(500).json({ message: 'Internal Server Error' });
    }
});

// User login endpoint
app.post('/api/login', async (req, res) => {
    try {
	const { username, password } = req.body;

	const user = await User.findOne({ username });

	if (!user || user.password !== password) {
	    return res.status(401).json({ message: 'Authentication failed' });
	}

	const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '24h' });

	// Set the token as an HTTP cookie
	res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

	res.json({ token });
    } catch (error) {
	console.error(error);
	res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
