var gamePattern = [];

var buttonColor = ["red", "blue", "green", "yellow"];

var userInput = [];

var level = 0;

var start = true;
var game_on=false;
$(document).keydown(function(event) {
  if (start === true) {
    nextSequence();
    start = false;
  }
});
var highScore=43;
var userName="Gurjot Singh";

var newHigh=new user(userName, highScore);

$("#userName").text("level("+newHigh.level+") by: "+ newHigh.name);

console.log(newHigh.name,newHigh.level);

$(".btn").on("click", function() {
  var m = $(this).attr("id");
  if(game_on===true){
  userInput.push(m);
  sound(m);
  animation(m);
  check();
}
});

function user(name, level){
    this.name=name;
    this.level=level;
}

function begin(){
  var start = true;
  $(document).keydown(function(event) {
    if (start === true) {
      nextSequence();
      start = false;
    }
  });
}
function check() {
  var x = userInput.length;
  var c = false;
  console.log("x is " + x);
  if (gamePattern[x - 1] != userInput[x - 1]) {
    gameover();
    c = true;
  }
  if (x === level) {
    for (var i = 0; i < x; i++) {
      if (gamePattern[i] != userInput[i]) {
        gameover();
        c = true;
        break;
      }
    }
    if (c === false) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
}

function gameover() {
  game_on=false;
  if(level>highScore){
    $("h1").text("You made new high score");
    var userName=prompt("Enter your name");
    var newHigh=new user(userName, level);
    $("#userName").text("level("+newHigh.level+") by: "+ newHigh.name);

  }
  else{
    $("h1").text("Game Over, Press Any Key to Restart");
  }
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  startOver();
}

function startOver() {
  userInput.splice(0, userInput.length);
  gamePattern.splice(0, gamePattern.length);
  level = 0;
  begin();
}

function nextSequence() {
  game_on=true;
  userInput.splice(0, userInput.length);
  level++;

  $("h1").text("level " + level);
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animation(m) {
  $("#" + m).addClass("pressed");
  setTimeout(function() {
    $("#" + m).removeClass("pressed");
  }, 100);
}

function sound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}
