(function(){
    let title = document.querySelector('.title');
    let startButton = document.querySelector('.startGame');
    let gameField = document.querySelector('.gameField');
    let cells = gameField.querySelectorAll('.cell');
    let crossesScoreSpan = document.querySelector('.crossesScore');
    let noughtsScoreSpan = document.querySelector('.noughtsScore');
    let crossesScore = 0;
    let noughtsScore = 0;
    let resetButton = document.querySelector('.resetButton');
    let curentPlayer = 'X';


    let startGame = function(){
        gameField.classList.add('pointer');
        startButton.disabled = true;
        resetButton.disabled = false;
        title.textContent = `Ход игрока ${curentPlayer}`;
        gameField.addEventListener('click', gameTern);
        resetButton.addEventListener('click', gameReset);
    };

    let gameTern = function(evt){
        let cell = evt.target;
        if (!cell.textContent){
            cell.textContent = curentPlayer;
            if (curentPlayer === 'X'){
                cell.classList.add('cross');
            } else {
                cell.classList.add('nought');
            }
        };
        winCheck(curentPlayer);
        curentPlayer = (curentPlayer === 'X') ? '0' : 'X';
    };

    let winCheck = function(){

    };

    let gameReset = function(){
        gameField.classList.remove('pointer');
        startButton.disabled = false;
        resetButton.disabled = true;
        title.textContent = `Игра "Крестики-нолики"`;
        gameField.removeEventListener('click', gameTern);
        resetButton.removeEventListener('click', gameReset);
        cells.forEach(function(cell){
            cell.textContent = '';
            cell.classList.remove('cross');
            cell.classList.remove('nought');
        });
        crossesScore = 0;
        noughtsScore = 0;
    };

    startButton.addEventListener('click', startGame);
})()