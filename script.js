// GLOBALS
const players = [];
let dice = ''
let points = 0
let doublePoints = 0
let prevPoints = ''
let playerTurn = 1
let countPlayers = 0
// Dices
let throwDiceOne = ''
let throwDiceTwo = ''
let dice1Numb = 0
let doubleCount = 0
let dice1Throw = 0
let dice2Throw = null
// Timer & Animatio
let timer = 0
let dicePictures = ['images/dice1.png', 'images/dice2.png', 'images/dice3.png', 'images/dice4.png', 'images/dice5.png', 'images/dice6.png']
let diceIndex = 0

// ENTER CLICK
document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addPlayerList()
    }
})

// ADD PLAYERS ON TABLE
function addHtml() {
    let x = 0;
    document.querySelector("#players").innerHTML = ""
    document.querySelector("#points").innerHTML = ""
    players.forEach(players => {
        x ++;
        const playerTd = document.createElement("td")
        const pointsTd = document.createElement("td")
        playerTd.textContent = players
        document.querySelector("#players").appendChild(playerTd)
        document.querySelector("#points").appendChild(pointsTd) 
        playerTd.id = "player"+x
        pointsTd.id = "points"+x
    }); 
    document.getElementById("name").onfocus("")
}
// ADD PLAYERS
function addPlayerList(){
    let input = document.querySelector("#name").value;
    if (input.length < 1){
        document.getElementById("alert").innerHTML = "Anna nimeä!";
        return; }
        //tässä menee 0 - 3, eli 1 - 4
    if (players.length == 3){
        document.getElementById("name").style.display ="none"
        document.getElementById("addPlayer").style.display ="none"
    }
    players.push(input)
    addHtml();
}
// CHOOSE THE GAME: ONE OR TWO
function oneDiceGame() {
    if (players.length < 1){
        document.getElementById("alert").innerHTML = "Syötä esim. 1-pelaajan nimeä!";
        return;
    }
    document.getElementById("currentPoint").innerHTML = "Aloita peli, klikkaa noppaa. Tsemppiä!";
    document.getElementById("menu").style = "display: none;"
    // End turn button
    let makeEndButton = document.getElementById("gameButtons");
    let endButton = document.createElement("button")
    makeEndButton.appendChild(endButton);
    endButton.id = "endTurn";
    document.getElementById("endTurn").innerHTML = " Saada pisteitä, antaa vuoroa."
    endButton.setAttribute("onclick", "changePlayer()")
    // Make Dice
    let makeDice = document.getElementById("dices");
    let button = document.createElement("button");
    makeDice.appendChild(button);
    button.id = "oneDice";
    let makeImage = document.getElementById("oneDice");
    let image = document.createElement("img");
    makeImage.appendChild(image);
    image.id ="whichDiceOne"
    image.src ='images/pig.png'
    image.setAttribute("onclick", "diceThrowOne()")
    // Whose turn
    document.getElementById("player"+playerTurn).style = "font-weight: 800; font-size: 20px;"
}
function twoDiceGame() {
        if (players.length < 1){
        document.getElementById("alert").innerHTML = "Syötä 1-pelaajan nimeä!";
        return;
    }
    document.getElementById("currentPoint").innerHTML = "Aloita, klikkaa noppaa. Tsemppiä!";
    document.getElementById("menu").style = "display: none;"
    // End turn button
    let makeEndButton = document.getElementById("gameButtons");
    let endButton = document.createElement("button")
    makeEndButton.appendChild(endButton);
    endButton.id = "endTurn";
    document.getElementById("endTurn").innerHTML = " Saada pisteitä, antaa vuoroa. "
    endButton.setAttribute("onclick", "changePlayer()")
    // Make Dices
    let makeDice = document.getElementById("dices");
    // Dice Button 1
    let button = document.createElement("button");
    makeDice.appendChild(button);
    button.id = "oneDice";
    let makeImage = document.getElementById("oneDice");
    let image = document.createElement("img");
    makeImage.appendChild(image);
    image.id ="whichDiceOne"
    image.src ='images/pig.png'
    image.setAttribute("onclick", "diceThrowOne()")
    // Dice Button 2
    let button2 = document.createElement("button");
    makeDice.appendChild(button2);
    button2.id = "twoDice";
    let makeImage2 = document.getElementById("twoDice");
    let image2 = document.createElement("img");
    makeImage2.appendChild(image2);
    image2.id ="whichDiceTwo"
    image2.src ='images/pig.png'
    image2.setAttribute("onclick", "diceThrowTwo()")
    // Defining dice2 
    dice2Throw = 0
    // Whose turn
    document.getElementById("player"+playerTurn).style = "font-weight: 800; font-size: 20px;"
}
// MAIN 
function main() {
    countPlayers = players.length
    // ONE DICE GAME
    if (dice2Throw === null){
        // If dice number 1
        if (points === 0) {
            document.getElementById("player"+playerTurn).style = "font-weight: none; font-size: 18px;"
            playerTurn ++;
            document.getElementById("currentPoint").innerHTML = points
            document.getElementById("alertPig").src = 'images/sadpig.png'
            if (playerTurn > countPlayers) {
                playerTurn = 1
                }
            // Whose turn
            document.getElementById("player"+playerTurn).style = "font-weight: 800; font-size: 20px;"
            return;
        }
        else {
            document.getElementById("currentPoint").innerHTML = points
            document.getElementById("alertPig").src = ''
        }
    }
    // TWO DICE GAME 
    else {
        if (dice1Numb === 1 && dice2Throw === 0){
            document.getElementById("currentPoint").innerHTML = points
            document.getElementById("alertPig").src = 'images/disappoint_pig.png'
            return;
        }
        if (points === 0) {
            document.getElementById("player"+playerTurn).style = "font-weight: none; font-size: 18px;"
            playerTurn ++;
            points = 0
            dice1Throw = 0
            dice2Throw = 0
            doubleCount = 0
            document.getElementById("currentPoint").innerHTML = points
            document.getElementById("alertPig").src = 'images/sadpig.png'
            if (playerTurn > countPlayers) {
                playerTurn = 1
            }
            // Whose turn
            document.getElementById("player"+playerTurn).style = "font-weight: 800; font-size: 20px;"
            return;
        }
        // If too many doubles, END
        if (doubleCount === 3){
            playerTurn ++;
            points = 0
            dice1Throw = 0
            dice2Throw = 0
            doubleCount = 0
            document.getElementById("alertPig").src = 'images/sadpig.png'
            if (playerTurn > countPlayers) {
                playerTurn = 1
            }
            // Whose turn
            document.getElementById("player"+playerTurn).style = "font-weight: 800; font-size: 20px;"
            return;
        }
        else {
            document.getElementById("currentPoint").innerHTML = points
            document.getElementById("alertPig").src = ''
        }
        if (dice1Throw === 1 && dice2Throw === 1){
            dice1Throw = 0
            dice2Throw = 0
        }
    }
}

// DICE THROWS 
function diceThrowOne(){
    if (timer > 0){
        document.getElementById("alert2").innerHTML = "";
        return;
    }
    if (dice2Throw === 0) {
        document.getElementById("whichDiceTwo").src = 'images/pig.png'
        if (dice2Throw == 0 && dice1Throw === 1){
            document.getElementById("alert2").innerHTML = "Heitä toista noppa ensiksi";
            return;
        }
    }
    document.getElementById("alert2").innerHTML = "";
    dice1Throw = 1
    timer += 15; //set timer to dice
    photoBomb();
}
function diceThrowTwo (){
    if (timer > 1){
        document.getElementById("alert2").innerHTML = "";
        return;
    }
    if (dice1Throw === 0){
        document.getElementById("alert2").innerHTML = "Heitä yhden noppa ensiksi";
        return;
    }
    document.getElementById("alert2").innerHTML = "";
    dice2Throw = 1
    timer += 15; //set timer to dice, same thing
    photoBomb();
}

// TIMER
function photoBomb() {
    let interval = setInterval(function(){
    if (dice2Throw === 1) {
            if (diceIndex >= dicePictures.length) {
                diceIndex = 0
            }
            let rollDice = document.getElementById("whichDiceTwo");
            diceIndex = (diceIndex % 6) + 1;
            let photoBomb = "images/dice" + diceIndex + ".png"
            rollDice.src = photoBomb;
        }
        else {
            if (diceIndex >= dicePictures.length) {
                diceIndex = 0
            }
            let rollDice = document.getElementById("whichDiceOne");
            diceIndex = (diceIndex % 6) + 1;
            let photoBomb = "images/dice" + diceIndex + ".png"
            rollDice.src = photoBomb;
        }
        timer--;
        if (timer === 0) {
            clearInterval(interval);
            timer = 0
            ShowDice();
        }
    },200);
}

// WHICH DICE
function ShowDice() {
    let diceRoll = Math.floor((Math.random()*6)+1)
    if (dice2Throw === 1) {
        switch (diceRoll){
            case 1:
                dice = 'images/dice1.png'
                document.getElementById("whichDiceTwo").src = dice;
                if (dice1Numb === 1) {
                    doublePoints = 25
                    points = points + doublePoints
                    doubleCount++;
                    return main();
                }
                else {
                    points = 0
                    return main();
                }
            case 2:
                dice = 'images/dice2.png'
                document.getElementById("whichDiceTwo").src = dice;
                if (dice1Numb === 1) {
                    points = 0
                    return main();
                }
                if (dice1Numb === 2) {
                    doublePoints = ((2+2)*2)
                    points = points + doublePoints - 2 
                    doubleCount++;
                    return main();
                }
                else {
                    points = diceRoll + points
                    return main();
                }
            case 3:
                dice = 'images/dice3.png'
                document.getElementById("whichDiceTwo").src = dice;
                if (dice1Numb === 1) {
                    points = 0
                    return main();
                }
                if (dice1Numb === 3) {
                    doublePoints = ((3+3)*2)
                    points = points + doublePoints - 3
                    doubleCount++;
                    return main();
                }
                else {
                    points = diceRoll + points
                    return main();
                }
            case 4:
                dice = 'images/dice4.png' 
                document.getElementById("whichDiceTwo").src = dice;
                if (dice1Numb === 1) {
                    points = 0
                    return main();
                }
                if (dice1Numb === 4) {
                    doublePoints = ((4+4)*2)
                    points = points + doublePoints - 4
                    doubleCount++;
                    return main();
                }
                else {
                    points = diceRoll + points
                    return main();
                }
            case 5:
                dice = 'images/dice5.png'
                document.getElementById("whichDiceTwo").src = dice;
                if (dice1Numb === 1) {
                    points = 0
                    return main();
                }
                if (dice1Numb === 5) {
                    doublePoints = ((5+5)*2)
                    points = points + doublePoints - 5
                    doubleCount++;
                    return main();
                }
                else {
                    points = diceRoll + points
                    return main();
                }
            case 6:
                dice = 'images/dice6.png'
                document.getElementById("whichDiceTwo").src = dice
                if (dice1Numb === 1) {
                    points = 0
                    return main();
                }
                if (dice1Numb === 6) {
                    doublePoints = ((6+6)*2)
                    points = points + doublePoints - 6
                    doubleCount++;
                    return main();
                }
                else {
                    points = diceRoll + points
                    return main();
                }
        }
    }
    else {
        switch (diceRoll){
            case 1:
                dice = 'images/dice1.png'
                document.getElementById("whichDiceOne").src = dice;
                if (dice2Throw === null) {
                    points = 0
                }
                dice1Numb = 1
                return main();
            case 2:
                dice = 'images/dice2.png'
                document.getElementById("whichDiceOne").src = dice;
                points = diceRoll + points
                dice1Numb = 2
                return main();
            case 3:
                dice = 'images/dice3.png'
                document.getElementById("whichDiceOne").src = dice;
                points = diceRoll + points
                dice1Numb = 3
                return main();
            case 4:
                dice = 'images/dice4.png' 
                document.getElementById("whichDiceOne").src = dice;
                points = diceRoll + points
                dice1Numb = 4
                return main();
            case 5:
                dice = 'images/dice5.png'
                document.getElementById("whichDiceOne").src = dice;
                points = diceRoll + points
                dice1Numb = 5
                return main();
            case 6:
                dice = 'images/dice6.png'
                document.getElementById("whichDiceOne").src = dice
                points = diceRoll + points
                dice1Numb = 6
                return main();
        }
        return main();
    }
}

// END TURN AND 100 POINTS CHECK
function changePlayer() {
    if (timer > 1){
        document.getElementById("alert2").innerHTML = "";
        return;
    }
    if (dice2Throw == 0 && dice1Throw === 1){
        document.getElementById("alert2").innerHTML = "Heitä toista noppa ensiksi";
        return;
    }
    prevPoints = parseInt(document.getElementById("points"+playerTurn).innerText)
    if (isNaN(prevPoints)) {
        // IF WIN
        if (points >= 100 ) {
            document.getElementById("whichDiceOne").src = 'images/voittaja.png'
            document.write('Onneksi olkoon!');
            document.getElementById("whichDiceOne").removeAttribute("onclick");
            document.getElementById("whichDiceOne").style = "cursor: default"
            if (dice2Throw == null) {
                document.getElementById("alert2").innerHTML = "";
            }
            else {
                document.getElementById("whichDiceTwo").src = 'images/voittaja.png'
                document.write('Onneksi olkoon!');
                document.getElementById("whichDiceTwo").removeAttribute("onclick");
                document.getElementById("whichDiceTwo").style = "cursor: default"
            }
            let elem = document.getElementById("winwin");
            let interval2 = setInterval(frame, 20)
            function frame(){
                if (pos === 0) {
                    clearInterval(interval2);
                }
            }
            document.getElementById("currentPoint").innerHTML = points
            return;
        }
        document.getElementById("points"+playerTurn).innerText = points
        points = 0
        document.getElementById("player"+playerTurn).style = "font-weight: none; font-size: 18px;"
        playerTurn ++;
        if (playerTurn > countPlayers) {
            playerTurn = 1;
        }
        document.getElementById("player"+playerTurn).style = "font-weight: 750; font-size: 25px;"
    }
    else {
        document.getElementById("points"+playerTurn).innerText = points + prevPoints
    // IF WIN
        if (points+prevPoints >= 100 ) {
            document.getElementById("whichDiceOne").src = 'images/voittaja.png'
            document.getElementById("whichDiceOne").removeAttribute("onclick");
            document.getElementById("whichDiceOne").style = "cursor: default"
            if (dice2Throw == null) {
                document.getElementById("alert2").innerHTML = "";
            }
            else{
                document.getElementById("whichDiceTwo").src = 'images/voittaja.png'
                document.getElementById("whichDiceTwo").removeAttribute("onclick");
                document.getElementById("whichDiceTwo").style = "cursor: default"
            }
            let elem = document.getElementById("winwin");
            document.getElementById("currentPoint").innerHTML = points
            return;
        }
        prevPoints = ''
        points = 0
        document.getElementById("player"+playerTurn).style = "font-weight: none; font-size: 18px;"
        playerTurn ++;
        }
    if (playerTurn > countPlayers) {
        playerTurn = 1;
        }
    // Whose turn
    document.getElementById("player"+playerTurn).style = "font-weight: 700; font-size: 25px;"
    document.getElementById("whichDiceOne").src = 'images/pig.png'
    if (dice2Throw === null) {
        return;
    }
    document.getElementById("whichDiceTwo").src = 'images/pig.png'
    dice2Throw = 0
    dice1Throw = 0
}