var howManyBox = 6;
var colors =[]; 
var pickedColor;
var boxes = document.querySelectorAll(".box");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

Prompt();
function Prompt(){
  player = prompt("What's your name?", "Mystery Guest");
  if(player === null || player === "" || player === undefined || player === " ")
      return Prompt();
  else
     return player;
}

alert(`Good luck, ${player}!`);

initialise();

function initialise(){
    setUpMode();
    setUpBoxes();
    reset();
}

function setUpMode(){
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            messageDisplay.textContent= "";
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? howManyBox = 3 : howManyBox = 6;
            reset();
        });
    }
}

function setUpBoxes(){
    for(var j = 0; j < boxes.length; j++){
        //Add click listeners to each box
        boxes[j].addEventListener("click",function(){
            //grab color of the clicked box
            var clickedColor = this.style.backgroundColor; //referring to boxes[i].style.backgroundColor
            //Then compare the clickedColor to pickedColor
            //IF CORRECT
            if(clickedColor === pickedColor){
                messageDisplay.textContent = `Correct, ${player}! 👏`;
                resetButton.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            }else{ //IF WRONG
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again!";
            }
        });
    }
}

function reset(){
    //Reset the messageDisplay to empty string
    messageDisplay.textContent= "";
    //Reset the h1 background color back to the original color
    h1.style.backgroundColor = "steelblue";
    //Reset the text on the button back to the original text
    resetButton.textContent = "New Colors";
    //generate new RGB colors 
    colors = generateRandomColors(howManyBox);
    //pick a new random color from array as a new goal
    pickedColor = pickColor();
    //Change colorDisplay to match pickedColor
    colorDisplay.textContent = pickedColor;
    //Change colors of boxes
    for(var i = 0; i < boxes.length; i++){
        if(colors[i]){
            boxes[i].style.display= "block";
            boxes[i].style.backgroundColor = colors[i];
        }else{
            boxes[i].style.display= "none";
        }
    }
}

resetButton.addEventListener("click", function(){
    reset();
});

function generateRandomColors(num){
    var arr = [];
    for(var i=0;i<num;i++){
        arr.push(randomColor());
    }
    return arr;
}

function randomColor(){
    var r = Math.floor(Math.random() * 256)
    var g = Math.floor(Math.random() * 256)
    var b = Math.floor(Math.random() * 256)
    return `rgb(${r}, ${g}, ${b})`;
}

function pickColor(){
    var randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function changeColors(color){
    for(var j = 0; j < boxes.length ; j++){
        boxes[j].style.backgroundColor = color;
    }
}
