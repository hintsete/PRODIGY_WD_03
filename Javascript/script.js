window.addEventListener("DOMContentLoaded",()=>{
    const squares=Array.from(document.querySelectorAll(".square"));
    const playerDisplay=document.querySelector(".display-player");
    const resetBtn=document.querySelector(".reset");
    const announcer=document.querySelector(".announcer");

    let board=["","","","","","","","",""];
    let currentPlayer="X";
    let isGameActive=true;

    // to announce our end game state
    const PLAYERX_WON="PLAYERX_WON";
    const PLAYERO_WON="PLAYERO_WON";
    const TIE="TIE";

    // indexes within the board
    // [0] [1] [2]
    // [3] [4] [5]
    // [6] [7] [8]

    // our winning condtions will be array of arrays which is the indices within the board 
    // possible winning combination of indices on the board

    const winningCondtions=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
        

    ];
    function handleResultValidation(){
        let roundWon=false;
        for(let i=0;i<=7;i++){
            const winCondition=winningCondtions[i];
            const a =board[winCondition[0]];
            const b =board[winCondition[1]];
            const c =board[winCondition[2]];
            if(a===""||b===""||c===""){
                continue;
            }
            if(a===b&&b===c){
                roundWon=true;
                break;
            }
        }

        if(roundWon){
            announce(currentPlayer==="x"?PLAYERO_WON:PLAYERX_WON);
            isGameActive=false;
            return;
        }
        if(!board.includes("")){
            announce(TIE);
        }
    }

    const announce=(type)=>{
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML="player <span class='playerO'>O</span> won";
                break;
            case PLAYERX_WON:
                announcer.innerHTML="player <span class='playerX'>X</span> won";
                break;

            case TIE:
                announcer.innerText="Tie"
        }
        announcer.classList.remove("hide");
    };
    const isValidAction=(square)=>{
        if(square.innerText==="X"||square.innerText==="O"){
            return false;
        }
        return true;
    }
    const updateBoard=(index)=>{
        board[index]=currentPlayer;
    }

    const changePlayer=()=>{
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer=currentPlayer==="X"?"O":"X";
        playerDisplay.innerText=currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction=(square,index)=>{
        if(isValidAction(square)&& isGameActive){
            square.innerText=currentPlayer;
            square.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    };

    const resetBoard=()=>{
        board=["","","","","","","","",""];
        isGameActive=true;
        announcer.classList.add("hide");

        if(currentPlayer==="O"){
            changePlayer();
        }
        squares.forEach(square=>{
            square.innerText="";
            square.classList.remove("PlayerX");
            square.classList.remove("PlayerO");
        });
    }

    squares.forEach((square,index)=>{
        square.addEventListener("click",()=> userAction( square, index));
    })
    
    resetBtn.addEventListener("click",resetBoard)


   
})