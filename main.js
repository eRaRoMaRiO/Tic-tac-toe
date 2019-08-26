(function(){
    let title = document.querySelector('.title');
    let startButton = document.querySelector('.startGame');
    let gameField = document.querySelector('.gameField');
    let cells = gameField.querySelectorAll('.cell');
    let crossesScore = document.querySelector('.crossesScore');
    let noughtsScore = document.querySelector('.noughtsScore');
    let resetButton = document.querySelector('.resetButton');
    let curentPlayer = 'X';

    let gameTern = function(evt){
        let cell = evt.target;
        if (!cell.textContent){
            cell.textContent = curentPlayer;
            if (curentPlayer === 'X'){
                console.log(cell.classList);
                cell.classList.add('cross');
                curentPlayer = '0';
            } else {
                cell.classList.add('nought');
                curentPlayer = 'X';
            }
        }
    }

    let startGame = function(){
        gameField.classList.add('pointer');
        startButton.disabled = true;
        resetButton.disabled = false;
        title.textContent = `Ход игрока ${curentPlayer}`
        gameField.addEventListener('click', gameTern);
    };

    startButton.addEventListener('click', startGame);

    
})()