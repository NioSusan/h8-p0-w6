var player;
var howManyBox = 6;
var colors = generateRandomColors(howManyBox); // It will be an array of colors
var boxes = document.querySelectorAll(".box");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

Prompt();
function Prompt(){
  player = prompt("What's your name?", "Mystery Guest");
  if(player === null || player === "" || player === undefined || player === " ")
      return Prompt();
  else
     return player;
}

alert(`Good luck, ${player}!`);

function generateRandomColors(num){
    //Make an empty array
    var arr = [];
    //FOR "i" to num
    for(var i=0;i<num;i++){
        //Get random color and push into arr
        arr.push(randomColor());
    }
    //return that array
    return arr;
}

function randomColor(){
    //Pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256)
    //Pick a "green from 0 - 255
    var g = Math.floor(Math.random() * 256)
    //Pick a "blue" from 0 - 255
    var b = Math.floor(Math.random() * 256)
    return `rgb(${r}, ${g}, ${b})`;
}

function pickColor(){
    var randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

//Display the picked Color that the player should guess
colorDisplay.textContent = pickedColor;
//Randomize different colors to each div(box)
for(var i = 0; i < boxes.length; i++){
    //Add initial colors to boxes
    boxes[i].style.backgroundColor = colors[i];

    //Add click listeners to each box
    boxes[i].addEventListener("click",function(){
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

function changeColors(color){
    //loop through all boxes
    for(var j = 0; j < boxes.length ; j++){
        //change each color to match given color
        boxes[j].style.backgroundColor = color;
    }
}

resetButton.addEventListener("click", function(){
    //Reset the messageDisplay to empty string
    messageDisplay.textContent="";
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
        boxes[i].style.backgroundColor = colors[i];
    }
});

easyBtn.addEventListener("click", function(){
    messageDisplay.textContent="";
    hardBtn.classList.remove("selected");
    easyBtn.classList.add("selected");
    howManyBox = 3;
    colors = generateRandomColors(howManyBox);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(var i = 0; i < boxes.length; i++){
        if(colors[i]){
            boxes[i].style.backgroundColor = colors[i];
        }else{
            boxes[i].style.display = "none";
        }
    }
});

hardBtn.addEventListener("click", function(){
    messageDisplay.textContent="";
    easyBtn.classList.remove("selected");
    hardBtn.classList.add("selected");
    howManyBox = 6;
    colors = generateRandomColors(howManyBox);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(var i = 0; i < boxes.length; i++){
        boxes[i].style.backgroundColor = colors[i];
        boxes[i].style.display = "block";
    }
});

/* Logic overview
1. Everytime the page loads (every new game), it picks num random colors and assign each color to one of the div. For this, we need to make a function:
    a. for easy mode, create 3 random colors
    b. for hard mode, create 6 random colors (by default, the hard mode is selected)
2. Every new game, one of the colors is picked randomly to be the color that we're looking for. For this, we need a function to:
    a. pick a random number (index 0 - index 5 of colors array), then
    b. use that random number to access the color out of the array and return that color
3. Everytime we click on one of the boxes, we want to figure out which color the boxes that we clicked on
4. And once we have that color we're going to compare it to the picked color (step 2).
5. If they're the same, then that means the player has won and we need to do some things
    a. Display a message "Correct!" on the page
    b. Change the color of all boxes to the correct color (picked color) + change the background of h1, to the same color
    c. Display "Play Again?" menu to get new colors
6. If they're different, we're going to:
    a. change the background color of that box so that it goes to the same color as the body's background(#232323)
    b. Display a message "Try Again!" on the page
7. Reset the game
8. Everytime the easy or hard mode is selected:
    a. change its background color
    b. if it's easy mode, hide the other 3 boxes
    c. if it's hard mode, show the other 3 boxes
    d. the reset button must be updated as well
*/
