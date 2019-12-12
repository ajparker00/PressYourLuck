/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gamePlaying) {
        // 1. We need a random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display Dice Result in the middle of the user inner face
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";


        // 3. Update the Round score but only if the roll number is Not 1
        //dice can be > 1 or !== 1.  Same exact thing
        if (dice !== 1) {
            //Add score
            roundScore += dice;

            //setter bc we set a new value to the text which is the number the dice rolls
            document.querySelector("#current-" + activePlayer).textContent = roundScore;

        } else {
            //Next player
            nextPlayer();
        }

    }

});


document.querySelector(".btn-hold").addEventListener("click", function () {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 20) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }

    }
});

function nextPlayer() {
    //Next player
    //another if statement but using Ternary 
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    //When a player hits one there score resets
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;

    //Moves the red marker (dot) to whichever player turn it is but not toggle
    // document.querySelector(".player-0-panel").classList.remove("active");
    // document.querySelector(".player-1-panel").classList.add("active");

    //Toggles
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    //Use querySelector to change some CSS of some elements.
    //Below hides the dice that was showing in the middle of the page
    document.querySelector(".dice").style.display = "none";

    //set the values of the players score to 0
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1!";
    document.getElementById("name-1").textContent = "Plater 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");

}

//document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";

//Getter bc we are getting the value of the text which is 43 and storing in var x
//var x = document.querySelector("#score-0").textContent;
//console.log(x);











