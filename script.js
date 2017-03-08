let SimonGame = (function(){

  // DOM elements
  let $start = document.getElementById("start");
  let $strict = document.getElementById("strict");
  let $display = document.getElementById("display");
  let $tiles = document.querySelectorAll(".tiles-container .tile");
  let $tilesContainer = document.querySelector(".tiles-container");
  let $audioElems = document.querySelectorAll("audio");

  // Other variables
  let gameStarted = false;
  let level = 0;
  let userInputLevel = 0;
  let winningLevel = 19;
  let outputArray = [];
  let allowInput = false;
  let strictMode = false;

  function init(){
    events();
  }

  function events(){
    // #start eventhandler
    $start.addEventListener("click", function(e){
      startGame();
    });

    // .tile eventhandler
    $tilesContainer.addEventListener("click", function(e){
      if(e.target.classList.contains("tile") && allowInput){
        userInput(e.target.id);
      }
    });

    // #strict eventhandler
    $strict.addEventListener("click", function(){
      strictMode = !strictMode;
      if(strictMode){
        $strict.style.boxShadow = "0 0 5px 7px rgba(249,58,30,.5)";
      }else{
        $strict.style.boxShadow = "";
      }
      
    });
  }
  
  function userInput(color){
    let colorNumber;
    switch(color){
      case "green":
        colorNumber = 0;
        break;
      case "red":
        colorNumber = 1;
        break;
      case "yellow":
        colorNumber = 2;
        break;
      case "blue":
        colorNumber = 3;
        break;
    } 

    if(outputArray[userInputLevel] == colorNumber){
      console.log("CORRECT");
      
      $audioElems[colorNumber].play();

      if(userInputLevel === level){
        if(level == winningLevel){
          $display.innerHTML = "You won!";
          allowInput = false;
          return true;
        }
        level++;
        userInputLevel = 0;
        nextSequence();
      }else{
        userInputLevel++;
      }

    }else{
      $display.innerHTML = "Wrong";
      if(strictMode){
        $display.innerHTML = "You lost!";
        allowInput = false;
        return false;
      }
      setTimeout(function(){
        userInputLevel = 0;
        nextSequence();
      },1000);
    }
  }

  function nextSequence(){
    allowInput = false;
    $display.innerHTML = "Running...";
    highlightTile(0);
  }

  function highlightTile(i){
    let count = i;

    setTimeout(function(){
      $tiles[outputArray[count]].classList = "tile";
      console.log("X:",$tiles[outputArray[count]]);

      setTimeout(function(){
        $tiles[outputArray[count]].classList = "tile highlighted";
        $audioElems[outputArray[count]].play();
      }.bind(count),100);
      

      if(i < level){
        highlightTile(++i);
      }else{
        setTimeout(function(){
          $display.innerHTML = "Level " + (level+1);
          allowInput = true;
        }, 700);
        
        return true;
      }
    },900);
  }

  function startGame(){
    level = 0;
    userInputLevel = 0;
    outputArray = [];
    allowInput = false;

    $display.innerHTML = "Starting...";

    gameStarted = true;
    for(let i = 0; i <= winningLevel; i++){
      outputArray[i] = Math.floor(Math.random()*4);
    }
    console.log(outputArray);

    setTimeout(function(){
      $display.innerHTML = "Level: " + (level+1);
      nextSequence();
    }, 1500);
    
  }

  function reset(){
    // Handle reset
  }
  

  return {
    init: init
  };

})();

SimonGame.init();
