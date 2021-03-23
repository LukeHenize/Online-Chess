//Starts onload
window.onload = function(){
    createBoard();
    runTest();
    addEventListeners();
    elem("nameInput").value = getRandomName();
};

//Alphabet for reference 
const alphabet = ["a","b","c","d","e","f","g","h"]

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

//Board creation function
function createBoard(){
    let table = elem("board");
    for (let x = 0; x < 8; x++) {
        table.innerHTML += "<tr id='row" + x + "''></tr>"
        for (let y = 0; y < 8; y++) {
            let id = "b" + (y + "-") + (7-x);
            elem("row" + x).innerHTML += "<td onmousemove='ui.mouse.boardX = " + y + "; ui.mouse.boardY = " + (7-x) + "' onmousedown='ui.handleMouseDown(event, " + y + "," + (7-x) + ")' id='" + id + "'></td>"
            if (x == 7) {
                elem(id).innerHTML += "<div class='marker file_marker no_select' id='f" + y + "'>" + alphabet[y] + "</div>";
            }
            if (y == 7) {
                elem(id).innerHTML += "<div class='marker rank_marker no_select' id='r" + (7-x) + "'>" + (8-x) + "</div>";
            }
        }
    }
}

//rotate the board function
function rotateBoard(){
    ui.rotateBoard();
}

//Send message
function sendMessage(){
   ui.sendMessage();
}

//Game starts
function startLocalGame(){
   elem("startScreen").style.display = "none";
}

function promptCreate(){
   //elem("startScreen").style.display = "none";
   ui.promptCreate();
}

function promptJoin(){
   //elem("startScreen").style.display = "none";
   ui.promptJoin();
}

function createGame(side){
   ui.createGame(side)
}

function copy(){
   copyToClipboard(elem("lobbyName").innerHTML);
}

function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text); 

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}


//Add event listeners
function addEventListeners(){
    document.addEventListener("mousemove", function(e){ui.handleMouseMove(e)}, false);
    document.addEventListener("mouseup", function(e){ui.handleMouseUp(e)}, false);
    elem("board").addEventListener("mouseout", function(){ui.mouse.boardX=-1;ui.mouse.boardY=-1}, false);
      //Handle enter on chatbox
     document.getElementById("input").addEventListener("keyup", function(event) {
         event.preventDefault();
         if (event.keyCode === 13) {
             document.getElementById("sendButton").click();
         }
     });
     
     elem("nameInput").addEventListener("mousedown", function(event) {
         elem("nameInput").value = "";
     }, false);
     
     elem("nameInput").addEventListener("focusout", function(event) {
         if (elem("nameInput").value == "") {
            elem("nameInput").value = "Anon";
         }
     }, false);
     
     document.getElementById("nameInput").addEventListener("keyup", function(event) {
         event.preventDefault();
         if (event.keyCode === 13) {
             document.activeElement.blur();
         }
     });
     
     document.getElementById("lobbyInput").addEventListener("keyup", function(event) {
         event.preventDefault();
         if (event.keyCode === 13) {
             promptJoin();
         }
     });
}

//Useful element functions
function elem(e){
    return document.getElementById(e);
}

function removeElement(e) {
    let element = elem(e);
    element.parentNode.removeChild(element);
}

function setOpacity( imageid, opacity ) {
    var s= document.getElementById(imageid).style;
    s.opacity = ( opacity / 100 );
    s.MozOpacity = ( opacity / 100 );
    s.KhtmlOpacity = ( opacity / 100 );
    s.filter = 'alpha(opacity=' + opacity + ')';
}

function getRandomName(){
   let cars = [
      "Octane",
      "Dominus",
      "Takumi",
      "Merc",
      "Fennec",
      "Batmobile",
      "Werewolf",
      "Endo",
      "Nimbus",
      "Aftershock",
      "Esper",
      "Grog",
      "Bone Shaker"
   ];
   
   return cars[getRandomInt(0,13)] + "_" + getRandomInt(0,9) + getRandomInt(0,9) + getRandomInt(0,9);
   
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//TEST FUNCTION
let game;
let ui;
function runTest(){
    game = new Game();
    gameHandler = new GameHandler(game); 
    ui = new UIHandler(game, gameHandler);
    gameHandler = new GameHandler(game, ui);
    ui.drawBoard();
}