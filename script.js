let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn"); 
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turnMsg = document.querySelector("#turn-msg");
let pvpBtn = document.querySelector("#pvp-btn");
let aiBtn = document.querySelector("#ai-btn"); 
let turnO=true;
let count=0;
let vsComputer = false;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];
pvpBtn.addEventListener("pointerdown", () => {
    vsComputer = false;
    turnMsg.classList.remove("hide");
    turnMsg.innerText = "Player O Turn";
    resetGame();
});

aiBtn.addEventListener("pointerdown", () => {
    vsComputer = true;
    turnMsg.classList.remove("hide");
    turnMsg.innerText = "Your Turn";
    resetGame();
});

const resetGame = () => {
    turnO=true;
     count = 0;
    enabledBoxes();
    if(vsComputer){
        turnMsg.innerText = "Your Turn";
    }
    else{
        turnMsg.innerText = "Player O Turn";
    }
    msgContainer.classList.add("hide");
}

boxes.forEach((box,index)=>{
    box.addEventListener("pointerdown",()=>{
        if (box.innerText !== "") return;
        if(turnO){
            box.innerText="0";
            box.classList.add("O");
            turnO=false;
            if(vsComputer){
                turnMsg.innertext="Computer Thinking"
            }
            if(!vsComputer){
                turnMsg.innerText = "Player X Turn";
}
        }
        else{
            box.innerText="X";
            box.classList.add("X");
            turnO=true;
            if(!vsComputer){
    turnMsg.innerText = "Player O Turn";
}

        }
        box.disabled=true;
        count++;
       let isWinner= checkWinner();
        if (count === 9 && !isWinner) {
      gameDraw();
    }

     if (vsComputer && !turnO)
        {
            setTimeout(computerMove, 500);
        }

    });
});

function computerMove() {
    let emptyBoxes = [];

    boxes.forEach((box, index) => {
        if (box.innerText === "") {
            emptyBoxes.push(index);
        }
    });

    if (emptyBoxes.length === 0) return;

    let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    boxes[randomIndex].innerText = "X";
    boxes[randomIndex].classList.add("X");
    boxes[randomIndex].disabled = true;

    turnO = true;
    turnMsg.innerText = "Your Turn";
    count++;

    if (checkWinner()) return;

    if (count === 9) {
        gameDraw();
    }
}


const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disabledBoxes();
};

const disabledBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enabledBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
        box.classList.remove("X");
        box.classList.remove("O");
    }
};

const showWinner=(winner) => {
    msg.innerText=`Congratulations. Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};
 
const checkWinner = () =>{
    for(let pattern of winPatterns)
    {
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val!="" && pos2Val!="" && pos3Val!="")
        {
            if(pos1Val === pos2Val && pos2Val === pos3Val)
            {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};
newGameBtn.addEventListener("pointerdown",resetGame);
resetBtn.addEventListener("pointerdown",resetGame);
