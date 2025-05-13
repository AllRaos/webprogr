const boardSize = 5;
let board = [];
let moves = 0;
let startTime = 0;
let timerInterval;
let currentConfigIndex = 0;
let configurations = [];
let lastClickedCell = null;

function initGame() {
    fetch('../jsLab6/data/info.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Не вдалося завантажити info.json');
        }
        return response.json();
    })
        .then(data => {
            configurations = data;
            const randomIndex = Math.floor(Math.random() * configurations.length);
            currentConfigIndex = randomIndex;
            loadBoard(configurations[randomIndex]);
            moves = 0;
            startTime = Date.now();
            clearInterval(timerInterval);
            timerInterval = setInterval(updateTimer, 1000);
            hideWinModal();
            updateStatus();
        });
}

function loadBoard(config) {
    board = JSON.parse(JSON.stringify(config.board));
    renderBoard();
}

function renderBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell' + (board[i][j] ? ' on' : '');
            cell.addEventListener('click', () => toggleCell(i, j));
            gameBoard.appendChild(cell);
        }
    }
    checkWin();
}

function toggleCell(i, j) {
    const currentCell = `${i},${j}`;
    if (lastClickedCell === currentCell) {
        moves--;
    }
    lastClickedCell = currentCell;
    moves++;
    toggleSingleCell(i, j);
    if (i > 0) toggleSingleCell(i - 1, j);
    if (i < boardSize - 1) toggleSingleCell(i + 1, j);
    if (j > 0) toggleSingleCell(i, j - 1);
    if (j < boardSize - 1) toggleSingleCell(i, j + 1);
    renderBoard();
    updateStatus();
}

function toggleSingleCell(i, j) {
    board[i][j] = 1 - board[i][j];
}

function checkWin() {
    const allOff = board.every(row => row.every(cell => cell === 0));
    if (allOff) {
        clearInterval(timerInterval);
        const timeTaken = Math.floor((Date.now() - startTime) / 1000);
        showWinModal(moves, timeTaken);
    }
}

function showWinModal(moves, timeTaken) {
    const winModal = document.getElementById('winModal');
    const winMessage = document.getElementById('winMessage');
    winMessage.innerText = `Ви виграли за ${moves} ходів і ${timeTaken} секунд!`;
    winModal.style.display = 'flex';
}

function hideWinModal() {
    const winModal = document.getElementById('winModal');
    winModal.style.display = 'none';
}
function updateTimer() {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    updateStatus();
}

function updateStatus() {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const minMoves = configurations[currentConfigIndex].minMoves;
    document.getElementById('status').innerText = 
        `Ходи: ${moves} | Час: ${timeTaken}с | Мін. ходи: ${minMoves}`;
}

function newGame() {
    let newIndex = currentConfigIndex;
    while (newIndex === currentConfigIndex) {
        newIndex = Math.floor(Math.random() * configurations.length);
    }
    currentConfigIndex = newIndex;
    loadBoard(configurations[newIndex]);
    moves = 0;
    startTime = Date.now();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    lastClickedCell = null;
    hideWinModal();
    updateStatus();
}

function restartGame() {
    loadBoard(configurations[currentConfigIndex]);
    moves = 0;
    startTime = Date.now();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    lastClickedCell = null;
    hideWinModal();
    updateStatus();
}

window.onload = initGame;