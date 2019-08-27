(function () {
    let title = document.querySelector('.title');
    let titleMode = document.querySelector('.titleMode');
    let startButton = document.querySelector('.startGame');
    let gameField = document.querySelector('.gameField');
    let cells = gameField.querySelectorAll('.cell');
    let crossesScoreSpan = document.querySelector('.crossesScore');
    let noughtsScoreSpan = document.querySelector('.noughtsScore');
    let resetButton = document.querySelector('.resetButton');
    let modeButton = document.querySelector('.changeModeButton');
    let player1Label = document.querySelector('.player1');
    let player2Label = document.querySelector('.player2');

    let curentPlayer = 'X';
    let tern = 0;
    let mode = 0;

    let freeCells = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    let gameMatrix = ['', '', '', '', '', '', '', '', ''];

    let randomNumber = function(min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min));
    };

    let startGame = function () {
        fieldReset();
        gameField.classList.add('pointer');
        startButton.disabled = true;
        resetButton.disabled = false;
        title.textContent = (mode === 0) ? `Ваш ход` : `Ход игрока ${curentPlayer}`;
        gameField.addEventListener('click', gameTern);
        resetButton.addEventListener('click', resetGame);
    };

    let drawCell = function(cell){
        cell.textContent = curentPlayer;
        (curentPlayer === 'X') ? cell.classList.add('cross'): cell.classList.add('nought');
        let value = cell.dataset.value;
        gameMatrix[value] = curentPlayer;
        freeCells.splice(freeCells.indexOf(value), 1);
    }

    let ternAi = function(){
        let cell = cells[freeCells[randomNumber(0, freeCells.length - 1)]]
        console.log(cell);
        drawCell(cell);
        if (winCheck(curentPlayer)) {
            gameWin('Skynet');
        } else {
            curentPlayer = (curentPlayer === 'X') ? '0' : 'X';
            gameField.addEventListener('click', gameTern);
            title.textContent = `Ваш ход`;
        };
    };

    let gameTern = function (evt) {
        let cell = evt.target;
        if (cell.textContent === '') {
            drawCell(cell);

            if (winCheck(curentPlayer)) {
                gameWin(mode === 0 ? '' : curentPlayer);
            } else {
                tern++;

                if (tern === 9) {
                    draw();
                    return;
                };
                curentPlayer = (curentPlayer === 'X') ? '0' : 'X';
                title.textContent = `Ход игрока ${curentPlayer}`;
                if (mode === 0){
                    title.textContent = `Ход Skynet`;
                    gameField.removeEventListener('click', gameTern);
                    setTimeout (ternAi, 1000);
                };
            };
        };
    };
    
    let winCheck = function (player) {
        return (
            gameMatrix[0] === player &&
            gameMatrix[1] === player &&
            gameMatrix[2] === player ||

            gameMatrix[3] === player &&
            gameMatrix[4] === player &&
            gameMatrix[5] === player ||

            gameMatrix[6] === player &&
            gameMatrix[7] === player &&
            gameMatrix[8] === player ||

            gameMatrix[0] === player &&
            gameMatrix[3] === player &&
            gameMatrix[6] === player ||

            gameMatrix[1] === player &&
            gameMatrix[4] === player &&
            gameMatrix[7] === player ||

            gameMatrix[2] === player &&
            gameMatrix[5] === player &&
            gameMatrix[8] === player ||

            gameMatrix[0] === player &&
            gameMatrix[4] === player &&
            gameMatrix[8] === player ||

            gameMatrix[2] === player &&
            gameMatrix[4] === player &&
            gameMatrix[6] === player
        );
    };

    let gameWin = function (player) {
        title.textContent = (mode === 0) ? `Победил игрок ${player}!` : `Победил игрок ${curentPlayer}!`;
        if (player === 'X' || player === '') {
            crossesScoreSpan.textContent = +crossesScoreSpan.textContent + 1;
        } else {
            noughtsScoreSpan.textContent = +noughtsScoreSpan.textContent + 1;
        };
        gameEnd();
    };

    let draw = function () {
        title.textContent = `Ничья!`;
        gameEnd();
    }

    let gameEnd = function () {
        gameField.classList.remove('pointer');
        startButton.disabled = false;
        gameField.removeEventListener('click', gameTern);
        curentPlayer = 'X';
        tern = 0;
        gameMatrix = ['', '', '', '', '', '', '', '', ''];
        freeCells = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
        cells.forEach(function (cell) {
            cell.classList.remove('selectable');
        });
    }

    let fieldReset = function () {
        cells.forEach(function (cell) {
            cell.textContent = '';
            cell.classList.remove('cross');
            cell.classList.remove('nought');
            cell.classList.add('selectable');
        });
    }

    let resetGame = function () {
        fieldReset();
        gameEnd();
        resetButton.removeEventListener('click', resetGame);
        resetButton.disabled = true;
        title.textContent = `Игра "Крестики-нолики"`;
        crossesScoreSpan.textContent = 0;
        noughtsScoreSpan.textContent = 0;
    };

    let changeMode = function(){
        if (mode === 0){
            mode = 1;
            titleMode.textContent = `Режим 2 игрока`;
            player1Label.textContent = `Крестики`;
            player2Label.textContent = `Нолики`;            
        } else {
            mode = 0;
            titleMode.textContent = `Режим "Против ИИ"`;
            player1Label.textContent = `Игрок`;
            player2Label.textContent = `Skynet`;
        }
        resetGame();
    }

    startButton.addEventListener('click', startGame);
    modeButton.addEventListener('click', changeMode);

})();
