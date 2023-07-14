const Player = (name, mark) => {
    return {name, mark};
}

const game = (function() {
    //Private variables/functions
    'use strict';
    let _gameBoard = Array(9);
    let remainingTurns = 9;
    const gameBoardDivs = document.querySelectorAll('.gameboard > div');
    const playerX = Player('Jones', 'X');
    const playerO = Player('Era', 'O');

    function start() {
        gameBoardDivs.forEach((boardSpace, value) => {
            boardSpace.addEventListener('click', () => {
                if (remainingTurns <= 0) return;
                if (!(_gameBoard[value] === undefined)) return;
                let playerMark = playTurn(value);
                displayController.addMark(playerMark, value);
                if (remainingTurns <= 5) checkWinOrTie();
            });
        });
    }
    function playTurn(value) {
        if (remainingTurns % 2 === 0) {
            _gameBoard.splice(gameBoardDivs[value].getAttribute('data-board-number'), 1, playerO.mark);
            remainingTurns--;
            return playerO.mark;
        } else if (remainingTurns % 1 === 0) {
            _gameBoard.splice(gameBoardDivs[value].getAttribute('data-board-number'), 1, playerX.mark);
            remainingTurns--;
            return playerX.mark;
        }
    }
    function checkWinOrTie() {
        for (let i = 0; i < 7; i = i + 3){
            if (_gameBoard[i] === undefined) continue;
            if ((_gameBoard[i] === _gameBoard[i + 1] && _gameBoard[i + 1] === _gameBoard[i + 2])) {
                if (playerX.mark === _gameBoard[i]) console.log(`${playerX.name}  is the winner! 1`);
                else console.log(`${playerO.name}  is the winner! 1`)
                return;
            }
        }
        for (let j = 0; j < 4; j++){
            if (_gameBoard[j] === undefined) continue;
            if ((_gameBoard[j] === _gameBoard[j + 3] && _gameBoard[j + 3] === _gameBoard[j + 6])) {
                if (playerX.mark === _gameBoard[j]) console.log(`${playerX.name}  is the winner! 2`);
                else console.log( `${playerO.name}  is the winner! 2`);
                return;
            }
        }
        if (_gameBoard[4] === undefined){
            return;
        } else if ((_gameBoard[0] === _gameBoard[4] && _gameBoard[4] === _gameBoard[8]) 
                || (_gameBoard[2] === _gameBoard[4] && _gameBoard[4] === _gameBoard[6])){
                if (playerX.mark === _gameBoard[0] || playerX.mark === _gameBoard[4]) 
                    console.log(`${playerX.name}  is the winner! 3`);
                else console.log(`${playerO.name}  is the winner! 3`);
        }
    }
    // Public variables/functions
    return {start};
})();

const displayController = (function(){
    //Private variables/functions
    'use strict';
    const gameBoardMark = document.querySelectorAll('.gameboard > div > span');
    // Public variables/functions
    return {
        addMark: (mark, value) => {
            gameBoardMark[value].textContent = mark;
        },
    };
})();

game.start();
