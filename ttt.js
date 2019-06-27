var turn = true;                //for alternating turns
var playerOneMoves = [];        //player one moves list
var playerTwoMoves = [];        //player two moves list
var playerMoves = [];           //both playes moves list
var ctr;                        //number of succesful moves matches, 3 required for win
var flag;                       //if a match is succesfull
var winningMove = []
var playNow = false;
var p1;
var p2;
var intervalVar;
var p1score = 0;
var p2score = 0;


var solution = [                //winning situations
    ['b1','b2','b3'],
    ['b4','b5','b6'],
    ['b7','b8','b9'],
    ['b1','b4','b7'],
    ['b2','b5','b8'],
    ['b3','b6','b9'],
    ['b1','b5','b9'],
    ['b3','b5','b7']
];

function clearCanvas(){

    var canvas = document.getElementsByClassName('box');
    Array.prototype.forEach.call(canvas, element=>{
        const context = element.getContext('2d');
        context.clearRect(0, 0, element.width, element.height);    
        element.classList.remove("winCanvas");
    }); 

    document.getElementById('winnerText').innerHTML = "";
}

function initialConditions(){
    document.getElementById("playNowButton").style.visibility = "hidden";
    document.getElementById("rematchButton").style.visibility = "hidden";

    winningMove = []
    playerOneMoves = [];
    playerTwoMoves = [];
    playerMoves = [];
    turn = true;

    playNow = true;
    intervalVar = setInterval(checker, 1000);
}

function restart(){
    clearCanvas();
    initialConditions()
    dontDisplayScore()

    p1score = 0;
    p2score = 0;
    
    p1 = prompt("Enter Player 1 Name: ");
    p2 = prompt("Enter Player 2 Name: ");

    document.getElementById("playerOne").innerHTML = p1;
    document.getElementById("playerTwo").innerHTML = p2;

    document.getElementById("pointerOne").classList.add("pointer");
    document.getElementById("pointerTwo").classList.remove("pointer");    
}

function rematch(){
    clearCanvas();
    initialConditions()
    displayScore();
    
}

function displayScore(){
    document.getElementById('playerOneScore').innerHTML = ' -> ( ' + p1score + ' ) ';
    document.getElementById('playerTwoScore').innerHTML = ' -> ( ' + p2score + ' ) ';
}

function dontDisplayScore(){
    document.getElementById('playerOneScore').innerHTML = '';
    document.getElementById('playerTwoScore').innerHTML = '';
}


function checker(){                                         //function run constantly to check winner, improved result display timing
    if(checkWinner(playerOneMoves)){
        // alert("Player One Wins");
        winningMove.forEach(element => {
            document.getElementById(element).classList.add("winCanvas");
        });
        document.getElementById('winnerText').innerHTML = p1;          
        clearInterval(intervalVar);
        p1score++
        gameOver();
        return true;
    }
    if(checkWinner(playerTwoMoves)){
        // alert("Player Two Wins");
        winningMove.forEach(element => {
            document.getElementById(element).classList.add("winCanvas");
        });
        document.getElementById('winnerText').innerHTML = p2;  
        clearInterval(intervalVar);      
        p2score++        
        gameOver();
        return true;
    }
    else if(playerMoves.length == 9){
        // alert("It's a Draw!");
        document.getElementById('winnerText').innerHTML = "It's a Draw";  
        clearInterval(intervalVar);
        gameOver();
        return true;
    }
}


function draw(cnv){
    var id = cnv.id;
    var a = document.getElementById(id);
    var s = a.getContext("2d");

    if(checker()){                                          //stops the game after winning
        return;
    }

    if(!playNow){
        return
    }

    for (let i = 0; i < playerMoves.length; i++) {          //to avoid entry in same box more than once
        const element = playerMoves[i];
        if(element == id){
            return
        }
    }
    

    turn = !turn;

    if(turn){
        // playertwo
        document.getElementById("pointerOne").classList.add("pointer");
        document.getElementById("pointerTwo").classList.remove("pointer");        
        s.beginPath();
        s.moveTo(25,25);
        s.lineWidth = 5;
        s.strokeStyle = "#98fb98";
        s.lineTo(125,125);
        s.stroke();
        s.moveTo(125,25);
        s.lineTo(25,125);
        s.stroke();
        playerTwoMoves.push(id);
        playerMoves.push(id);
    }
    else {
        // playerone
        document.getElementById("pointerTwo").classList.add("pointer");
        document.getElementById("pointerOne").classList.remove("pointer");
        s.beginPath();        
        s.lineWidth = 5;
        s.strokeStyle = "#98fb98";
        s.arc(75,75,50,0,360);
        s.stroke();
        playerOneMoves.push(id);
        playerMoves.push(id);
    }
}

function checkWinner(array){
    for (let j = 0; j < solution.length; j++) {
        flag = false;
        ctr = 0;
        for (let k = 0; k < array.length; k++) {
            const element = array[k];
            flag = solution[j].includes(element);
            if(flag){
                ctr++;
            }         
            if(ctr === 3){
                winningMove = solution[j];
                // alert("Winner Winner Chicken Dinner!");
                return true;
            }
        }        
    }
}

function gameOver(){
    document.getElementById("playNowButton").innerHTML = 'Restart';
    document.getElementById("playNowButton").style.visibility = 'visible';
    document.getElementById("rematchButton").style.visibility = 'visible';
}