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
    let tern = 0;


    let startGame = function(){
        fieldReset();
        gameField.classList.add('pointer');
        startButton.disabled = true;
        resetButton.disabled = false;
        title.textContent = `Ход игрока ${curentPlayer}`;
        gameField.addEventListener('click', gameTern);
        resetButton.addEventListener('click', gameReset);
    };

    let gameTern = function(evt){
        let cell = evt.target;
        if (cell.textContent === ''){
            cell.textContent = curentPlayer;
            if (curentPlayer === 'X'){
                cell.classList.add('cross');
            } else {
                cell.classList.add('nought');
            }
            winCheck(curentPlayer);
        };

    };

    let winCheck = function(player){
        if(
            cells[0].textContent === player &&
            cells[1].textContent === player &&
            cells[2].textContent === player ||

            cells[3].textContent === player &&
            cells[4].textContent === player &&
            cells[5].textContent === player ||
            
            cells[6].textContent === player &&
            cells[7].textContent === player &&
            cells[8].textContent === player ||
            
            cells[0].textContent === player &&
            cells[3].textContent === player &&
            cells[6].textContent === player ||
            
            cells[1].textContent === player &&
            cells[4].textContent === player &&
            cells[7].textContent === player ||

            cells[2].textContent === player &&
            cells[5].textContent === player &&
            cells[8].textContent === player ||
            
            cells[0].textContent === player &&
            cells[4].textContent === player &&
            cells[8].textContent === player ||
            
            cells[2].textContent === player &&
            cells[4].textContent === player &&
            cells[6].textContent === player
        ){
            gameWin(player);
        } else {
            curentPlayer = (curentPlayer === 'X') ? '0' : 'X';
            title.textContent = `Ход игрока ${curentPlayer}`;
            tern++;
            if (tern === 9){
                draw();
            }
        };
    };

    let gameWin = function(player){
        title.textContent = `Победил игрок ${player}!`;
        if (player === 'X'){
            crossesScore++;
            crossesScoreSpan.textContent = crossesScore;
        } else {
            noughtsScore++;
            noughtsScoreSpan.textContent = noughtsScore;
        };
        gameEnd();
    };

    let draw = function(){
        title.textContent = `Ничья!`;
        gameEnd();
    }

    let gameEnd = function(){
        gameField.classList.remove('pointer');
        startButton.disabled = false;
        gameField.removeEventListener('click', gameTern);
        curentPlayer = 'X';
        tern = 0;
    }
    
    let fieldReset = function(){
        cells.forEach(function(cell){
            cell.textContent = '';
            cell.classList.remove('cross');
            cell.classList.remove('nought');
        });
    }

    let gameReset = function(){
        gameEnd();
        resetButton.removeEventListener('click', gameReset);
        resetButton.disabled = true;
        title.textContent = `Игра "Крестики-нолики"`;
        fieldReset();
        crossesScore = 0;
        noughtsScore = 0;
        crossesScoreSpan.textContent = crossesScore;
        noughtsScoreSpan.textContent = noughtsScore;
    };

    startButton.addEventListener('click', startGame);
})()