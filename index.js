const Player = (name, mark) => {
    if (name === '') {
        return {name: 'player' + mark, mark}
    }
    return {name, mark};
}

const game = (function() {
    // Variables
    'use strict';
    let _gameBoard = Array(9);
    let remainingTurns = 9;
    let playerX = '';
    let playerO = '';
    let mode = undefined;

    // HTML nodes/nodelists
    const gameBoardMark = document.querySelectorAll('.gameboard > div > span');
    const gameBoardDivs = document.querySelectorAll('.gameboard > div');
    const nameInput = document.querySelectorAll('.playerNameInput');
    const name = document.querySelectorAll('.playerNameInput > input');
    const resultDisplay = document.querySelector('.result');
    const form = document.querySelector('form');

    // Buttons
    const pvpButton = document.querySelector('.PvP');
    const pveButton = document.querySelector('.PvE');
    const startButton = document.querySelector('button.start');
    const resetButton = document.querySelector('button.reset');

    // Button event listers
    pvpButton.addEventListener('click', () => {
        nameInput[0].classList.remove('hidden')
        nameInput[1].classList.remove('hidden');
        form.style.setProperty('justify-content', 'space-around');
        mode = 'Player';
    });

    pveButton.addEventListener('click', () => {
        nameInput[0].classList.remove('hidden');
        nameInput[1].classList.add('hidden');
        form.style.setProperty('justify-content', 'center');
        mode = 'Ai';
    });

    startButton.addEventListener('click', () => {
        
        nameInput[0].classList.add('hidden');
        nameInput[1].classList.add('hidden');
        startButton.classList.add('hidden');
        form.style.setProperty('margin-top', '0');
        pvpButton.disabled = true;
        pveButton.disabled = true;
        playerX = Player(name[0].value, 'X');
        playerO = Player(name[1].value, 'O');
        console.log(playerO);
        console.log(playerX);
        game.startGame(mode);
    });

    resetButton.addEventListener('click', () => {
        stopGame()
        _gameBoard = Array(9);
        remainingTurns = 9;
        nameInput[0].classList.remove('hidden');
        nameInput[1].classList.remove('hidden');
        startButton.classList.remove('hidden');
        pvpButton.disabled = false;
        pveButton.disabled = false;
        form.style.setProperty('justify-content', 'space-around');
        form.style.setProperty('margin-top', '25px');
        gameBoardMark.forEach((span) => {
            span.textContent = '';
        });
        resultDisplay.textContent = '';
        name[0].value = '';
        name[1].value = '';
        playerX = '';
        playerO = '';
    });

    // Functions
    function startGame() {
        gameBoardDivs.forEach((boardSpace) => {
            boardSpace.addEventListener('click', playTurns);
        });
    }

    function playTurns() {
        let value = this.getAttribute('data-board-number');
        if (!(_gameBoard[value] === undefined)) return;
        remainingTurns--;
        let playerMark = playerTurn(value);
        displayController.addMark(playerMark, value);

        if (remainingTurns <= 5) { 
            let win = checkWin();
            if (win) stopGame();
        }
        if (mode === 'Ai' && remainingTurns > 0) {
            remainingTurns--;
            aiTurn();
            let win = checkWin();
            if (win) stopGame();
        }
    }

    function stopGame() {
        gameBoardDivs.forEach((boardSpace) => {
            boardSpace.removeEventListener('click', playTurns);
        });
    }

    function aiTurn(){
        if (remainingTurns % 1 === 0) {
            let aiPick = Math.floor(Math.random() * 9);
            while (!(_gameBoard[aiPick] === undefined)) {
                aiPick = Math.floor(Math.random() * 9);
            } 
            _gameBoard.splice(gameBoardDivs[aiPick].getAttribute('data-board-number'), 1, playerO.mark);
            displayController.addMark(playerO.mark, aiPick);
        }
    }

    function playerTurn(value) {
        if (remainingTurns <= 0) displayController.pronounceTie();
        if (remainingTurns % 2 === 0) {
            _gameBoard.splice(gameBoardDivs[value].getAttribute('data-board-number'), 1, playerX.mark);
            return playerX.mark;
        } else if (remainingTurns % 1 === 0) {
            _gameBoard.splice(gameBoardDivs[value].getAttribute('data-board-number'), 1, playerO.mark);
            return playerO.mark;
        }
    }

    function checkWin() {
        for (let i = 0; i < 7; i = i + 3){
            if (_gameBoard[i] === undefined) continue;
            if ((_gameBoard[i] === _gameBoard[i + 1] && _gameBoard[i + 1] === _gameBoard[i + 2])) {
                if (playerX.mark === _gameBoard[i]) 
                    displayController.pronounceWinner(playerX.name);
                else 
                    displayController.pronounceWinner(playerO.name);
                return true;
            }
        }
        for (let j = 0; j < 4; j++){
            if (_gameBoard[j] === undefined) continue;
            if ((_gameBoard[j] === _gameBoard[j + 3] && _gameBoard[j + 3] === _gameBoard[j + 6])) {
                if (playerX.mark === _gameBoard[j]) 
                    displayController.pronounceWinner(playerX.name);
                else 
                    displayController.pronounceWinner(playerO.name);
                return true;
            }
        }
        if (_gameBoard[4] === undefined){
            return;
        } else if ((_gameBoard[0] === _gameBoard[4] && _gameBoard[4] === _gameBoard[8]) 
                || (_gameBoard[2] === _gameBoard[4] && _gameBoard[4] === _gameBoard[6])){
                if (playerX.mark === _gameBoard[4]) 
                    displayController.pronounceWinner(playerX.name);
                else 
                    displayController.pronounceWinner(playerO.name);
                return true;
        }
    }

    // Public variables/functions
    return {startGame};
})();



const displayController = (function(){
    //Private variables/functions
    'use strict';
    const gameBoardMark = document.querySelectorAll('.gameboard > div > span');
    const resultDisplay = document.querySelector('.result');

    // Public variables/functions
    return {
        addMark: (mark, value) => {
            gameBoardMark[value].textContent = mark;
        },
        pronounceWinner: (winner) => {
            resultDisplay.textContent = `${winner}  is the winner!`;
        },
        pronounceTie: () => {
            resultDisplay.textContent = 'Its a Tie!';
        },
    };
})();


