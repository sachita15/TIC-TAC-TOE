// selecting all boxes using there class box
let boxes=document.querySelectorAll('.box');
// selecting reset btn using its id
let resetBtn= document.querySelector("#reset-btn");
let turno= true; //intially o will start, true=>o aayega, else x
let count=0; // to check draw, i.e  cnt=9 and still no winner means draw
let newBtn= document.querySelector('#new-btn');
let msg= document.querySelector('#msg');
let msgCnt= document.querySelector('.msg-cnt');

//to store winning patterns we will use a 2d array
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("clicked");
        if (turno) {
            box.innerText = "O";
            turno = false;
        } else {
            box.innerText = "X";
            turno = true;
        }
        box.disabled=true;
        count++;
        let iswinner=checkWinner();

        if(count===9 && !iswinner){
            gameDraw();
        }
    });

});

const enableboxes=()=>{
    for(let it of boxes){
        it.disabled=false;
        it.innerText="";
    }
}

const resetGame=()=>{
    turno=true;
    count=0;
    enableboxes();
    msgCnt.classList.add("hide");
}


const disableboxes=()=>{
    for(let it of boxes){
        it.disabled=true;
    }
}
const showWinner=(winner)=>{
    msg.innerText= `${winner} WINS!`;
    disableboxes();
    msgCnt.classList.remove("hide");
};

const checkWinner=()=>{
    for (let it of winPatterns){
        let val1= boxes[it[0]].innerText;
        let val2= boxes[it[1]].innerText;
        let val3= boxes[it[2]].innerText;

        if(val1!="" && val2!="" && val3!=""){
            if(val1===val2 && val2===val3){
                console.log("winner", val1);
                showWinner(val1);
                return true;
            }
        }
        
    }
};

const gameDraw=()=>{
    msg.innerText=`DRAW :):`;
    msgCnt.classList.remove("hide");
    disableboxes();
}
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
