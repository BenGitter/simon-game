let SimonGame = (function(){

  // DOM elements
  let $start = document.getElementById("start");
  let $strict = document.getElementById("strict");
  let $display = document.getElementById("display");
  let $tiles = document.querySelectorAll(".tiles-container .tile");
  let $tilesContainer = document.querySelector(".tiles-container");

  // Other variables
  let gameStarted = false;
  let level = 0;
  let userInputLevel = 0;
  let winningLevel = 19;
  let outputArray = [];
  let allowInput = false;


  function init(){
    events();
  }

  function events(){
    // #start eventhandler
    $start.addEventListener("click", function(e){
      if(gameStarted){
        reset();
      }else{
        startGame();
      }
    });

    // .tile eventhandler
    $tilesContainer.addEventListener("click", function(e){
      if(e.target.classList.contains("tile") && allowInput){
        userInput(e.target.id);
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
 
      if(userInputLevel === level){
        level++;
        userInputLevel = 0;
        nextSequence();
      }else{
        userInputLevel++;
      }

    }else{
      $display.innerHTML = "ERROR";
      setTimeout(function(){
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
    $display.innerHTML = "Level: " + (level+1);
    gameStarted = true;
    for(let i = 0; i <= winningLevel; i++){
      outputArray[i] = Math.floor(Math.random()*4);
    }
    console.log(outputArray);
    nextSequence();
  }

  function reset(){
    // Handle reset
  }
  

  return {
    init: init
  };

})();

SimonGame.init();
