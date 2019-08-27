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
    let rounds = 0;

    let freeCells = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    let gameMatrix = ['', '', '', '', '', '', '', '', ''];
    let lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let randomNumber = function(min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min));
    };

    let startGame = function () {
        fieldReset();
        gameField.classList.add('pointer');
        startButton.disabled = true;
        resetButton.disabled = false;
        resetButton.addEventListener('click', resetGame);
        if (mode === 0){
            title.textContent = `Ваш ход`;

            if (rounds % 2 === 0){
                gameField.addEventListener('click', ternPlayer);
            } else {
                title.textContent = `Ход Skynet`; 
                setTimeout (ternAi, 1000);
            };
        } else {
            gameField.addEventListener('click', ternPlayer);
            title.textContent = `Ход игрока ${curentPlayer}`;
        };
    };

    let drawCell = function(cell){
        cell.textContent = curentPlayer;
        (curentPlayer === 'X') ? cell.classList.add('cross'): cell.classList.add('nought');
        let value = cell.dataset.value;
        gameMatrix[value] = curentPlayer;
        freeCells.splice(freeCells.indexOf(value), 1);
    };

    let checkDraw = function(){
        tern++;
        if (tern === 9) {
            draw();
            return true;
        };
    };

    let ternAi = function(){
        let situation = checkField();
        console.log(situation);
        let cell = cells[freeCells[randomNumber(0, freeCells.length - 1)]];
        if (freeCells.indexOf('4') !== -1){
            cell = cells[4];
        } else if (situation !== '--'){
            cell = situation;
        };
        drawCell(cell);
        situation = checkField();
        if (situation === 'win') {
            gameWin('Skynet');
        } else {
            if (checkDraw()){
                return;
            };
            curentPlayer = (curentPlayer === 'X') ? '0' : 'X';
            gameField.addEventListener('click', ternPlayer);
            title.textContent = `Ваш ход`;
        };
    };

    let ternPlayer = function (evt) {
        let cell = evt.target;
        if (cell.textContent === '') {
            drawCell(cell);

            if (checkField() === 'win') {
                gameWin(mode === 0 ? '' : curentPlayer);
            } else {
                if (checkDraw()){
                    return;
                };
                curentPlayer = (curentPlayer === 'X') ? '0' : 'X';
                title.textContent = `Ход игрока ${curentPlayer}`;
                if (mode === 0){
                    title.textContent = `Ход Skynet`;
                    gameField.removeEventListener('click', ternPlayer);
                    setTimeout (ternAi, 1000);
                };
            };
        };
    };
    
    let checkField = function () {
        let isWin = false; 
        let isDanger = false;
        let freeCell;
        let freeCellIndex;
        lines.forEach(function (line) {
            let crosses = 0;
            let noughts = 0;
            let freeCellCount = 0;
            line.forEach(function(i){
                if (gameMatrix[i] === 'X'){
                    crosses++;
                } else if (gameMatrix[i] === '0'){
                    noughts++;
                } else {
                    freeCellCount++;
                    freeCellIndex = i;
                };
            });
            if (crosses === 3 || noughts === 3){
                isWin = true;
            }
            if ((crosses === 2 || noughts === 2) && freeCellCount === 1){
                isDanger = true;
                freeCell = cells[freeCellIndex];
            }
        });
        if (isWin){
            return 'win';
        } else if (isDanger){
            return freeCell;
        } else return '--';
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
        rounds++;
        gameField.classList.remove('pointer');
        startButton.disabled = false;
        gameField.removeEventListener('click', ternPlayer);
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
        rounds = 0;
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
