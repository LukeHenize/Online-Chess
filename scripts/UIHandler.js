class UIHandler {
    constructor(game, gameHandler){
        this.game = game;
        this.gameHandler = gameHandler;
        this.rotated = false;
        this.selectedPiece = false;
        this.mouse = {
            down: false,
            x: 0,
            y: 0,
            startX: 0,
            startY: 0,
            boardX: 0,
            boardY: 0,
            piece: false,
            dragStarted: false
        };
    }
    
    drawBoard(){
        //Delete all pieces
        for (let r = 0; r < 8; r++){
            for (let f = 0; f < 8; f++){
                if (elem("p" + r + "-" + f)) {
                    removeElement("p" + r + "-" + f);
                }
            }
        }
        //Place new pieces on board where they belong
        for (let i = 0; i < this.game.pieces.length; i++){
            let piece = this.game.pieces[i];
            let position =  this.modifier(piece.x) + "-" + this.modifier(piece.y);
            let color = ([" ", "w", "b"])[piece.team];
            elem("b" + position).innerHTML += "<img class='piece no_select' draggable='false' id='p" + position + "' src = './images/pieces/" + piece.name + "_" + color + ".png'></img>";
        }
        
        //playerToMove hasn't been changed due to game.move() so we temporarily change
        this.game.playerToMove = (this.game.playerToMove == 2) ? 1 : 2;

        //draw red square if there is check or remove pre-existing checks
        this.drawCheck(this.game.playerToMove);
        this.game.playerToMove = (this.game.playerToMove == 2) ? 1 : 2; //change back
    }
    
    drawSelectionUI(){
        for (let i = 0; i < this.game.pieces.length; i++){
            let piece = this.game.pieces[i];
            let position =  this.modifier(piece.x) + "-" + this.modifier(piece.y);
            if (elem("p"+position)) {
                elem("p"+position).classList.remove("selected");
            }
        }
        if (this.selectedPiece) {
            if (elem("draggable").style.visibility != "visible") {
                let position = this.modifier(this.selectedPiece.x) + "-" + this.modifier(this.selectedPiece.y);
                elem("p"+position).classList.add("selected");    
            }
        }
    }
    
    drawProposedMoveUI(){
        for (let r = 0; r < 8; r++){
            for (let f = 0; f < 8; f++){
                elem("b" + r + "-" + f).classList.remove("proposed");
                if (this.selectedPiece && this.mouse.boardX == r && this.mouse.boardY == f && !(this.modifier(this.mouse.boardX) == this.selectedPiece.x && this.modifier(this.mouse.boardY) == this.selectedPiece.y)) {
                    elem("b" + r + "-" + f).classList.add("proposed");
                }
            }
        }
    }
    
    rotateBoard(){
        if (this.rotated) {
            this.rotated = false;
        }
        else {
            this.rotated = true;
        }
        this.updateGrid();
        this.drawBoard();
        this.updateNames();
    }
    
    updateGrid() {
        let that = this;
        for (var i = 0; i < 8; i++) {
            elem("f" + i).innerHTML = alphabet[this.modifier(i)];
        }
        for (var i = 0; i < 8; i++) {
            elem("r" + i).innerHTML = this.modifier(i)+1;
        }
    }
    
    handleMouseMove(e){
        e.preventDefault();
        let x = e.clientX;
        let y = e.clientY;
        if ( typeof x !== 'undefined' ){
            if (this.mouse.down == true) {
                if (Math.abs(x - this.mouse.startX) > 15 || Math.abs(y - this.mouse.startY) > 15 ) {
                    this.mouse.dragStarted = true;
                }
            }
            if (this.mouse.dragStarted == true && this.mouse.down == true) {
                elem("draggable").style.visibility = "visible";
                elem("draggable").style.left = (x-47) + "px";
                elem("draggable").style.top = (y-47) + "px";
                let position = this.modifier(this.selectedPiece.x) + "-" + this.modifier(this.selectedPiece.y);
                setOpacity("p"+position, 50);
                this.drawSelectionUI()
            }
        }
        if (this.selectedPiece) {
            this.drawProposedMoveUI();
        }
    }
    
    modifier(num){
        if (!this.rotated) {
            return num;
        }
        else {
            return 7-num;
        }
    }
    
    handleMouseDown(e,x,y){
        let px = e.clientX;
        let py = e.clientY;
        this.mouse.startX = px;
        this.mouse.startY = py;
        var pieceClicked = this.game.pieceAt(this.modifier(x),this.modifier(y));
        if (pieceClicked && !this.selectedPiece) {
            if (pieceClicked != this.selectedPiece) {
                this.mouse.down = true;
                let color = ([" ", "w", "b"])[pieceClicked.team];
                this.mouse.piece = pieceClicked.name + "_" + color;
                elem("draggable").src = "./images/pieces/" + this.mouse.piece + ".png";
                
                this.selectedPiece = pieceClicked;
                this.drawSelectionUI()
                this.drawProposedMoveUI()
            }
            else {
                this.selectedPiece = false;
                this.drawBoard()
                this.drawSelectionUI()
                this.drawProposedMoveUI()
            }
        }
        else if (this.selectedPiece != pieceClicked) {
            console.log(this.selectedPiece.name + " at (" + this.selectedPiece.x + ", " + this.selectedPiece.y + ") to (" + this.modifier(this.mouse.boardX) + ", " +this.modifier(this.mouse.boardY) + ")");    
            gameHandler.move(this.selectedPiece.x, this.selectedPiece.y, this.modifier(this.mouse.boardX), this.modifier(this.mouse.boardY));
            this.selectedPiece = false;
            this.drawBoard()
            this.drawSelectionUI()
            this.drawProposedMoveUI()
        }
        else {
            this.selectedPiece = false;
            this.drawBoard()
            this.drawSelectionUI()
            this.drawProposedMoveUI()
        }
    }
    
    handleMouseUp(e){
        this.mouse.down = false;
        if (this.mouse.piece && ui.mouse.boardX != -1) {
            elem("draggable").style.visibility = "hidden";
            if (this.selectedPiece && (this.selectedPiece.x != this.modifier(ui.mouse.boardX) || this.selectedPiece.y != this.modifier(ui.mouse.boardY))) {
                console.log(this.selectedPiece.name + " at (" + this.selectedPiece.x + ", " + this.selectedPiece.y + ") to (" + this.modifier(this.mouse.boardX) + ", " +this.modifier(this.mouse.boardY) + ")");    
                gameHandler.move(this.selectedPiece.x, this.selectedPiece.y, this.modifier(this.mouse.boardX), this.modifier(this.mouse.boardY));
            }
            else if (this.selectedPiece) {
                let position = this.modifier(this.selectedPiece.x) + "-" + this.modifier(this.selectedPiece.y);
                setOpacity("p"+position, 100);
                if (this.mouse.dragStarted) {
                    this.mouse.dragStarted = false;
                    this.selectedPiece = false;
                }
                return;
            }
        }
        else {
            elem("draggable").style.visibility = "hidden";
        }
        if (this.selectedPiece) {
            let position = this.modifier(this.selectedPiece.x) + "-" + this.modifier(this.selectedPiece.y);
            this.drawBoard();
            setOpacity("p"+position, 100);
            this.selectedPiece = false;
            this.drawSelectionUI();
            this.drawProposedMoveUI();
        }
        this.mouse.dragStarted = false;
        this.mouse.piece = false;
    }
    
    sendMessage(){
        let m = elem("input").value;
        if (m != "") {
            send("chat", m);
        }
        elem("input").value = "";
    }
    
    handleChat(message, name){
        elem("chatbox").innerHTML += name + ": " + message + "<br>";
    }
    
    promptCreate(){
        elem("startBlack").style.visibility = "visible";
        elem("startWhite").style.visibility = "visible";
        elem("lobbyInput").style.visibility = "hidden";
        elem("lobbyName").style.visibility = "hidden";
        elem("lobbyMessage").style.visibility = "visible";
        elem("lobbyMessage").innerHTML = "Choose your side";
    }
    
    promptJoin(){
        let lobbyInput = elem("lobbyInput").value;
        if (lobbyInput == "") {
            elem("startBlack").style.visibility = "hidden";
            elem("startWhite").style.visibility = "hidden";
            elem("lobbyInput").style.visibility = "visible";
            elem("lobbyName").style.visibility = "hidden";
            elem("lobbyMessage").style.visibility = "visible";
            elem("lobbyMessage").innerHTML = "Enter game code";
            pubnub.unsubscribeAll();
        }
        else {
            self = this;
            pubnub.hereNow({
                channels: [lobbyInput],
                includeUUIDs: true,
                includeState: true,
            }, (status, response) => {
              // handle status, response
                console.log(response);
                if (response.totalOccupancy == 1) {
                    joinChannel(lobbyInput);
                    myName = elem("nameInput").value;
                    send("start", myName);
                    //self.startGame();
                }
                else {
                    elem("lobbyMessage").innerHTML = "No lobby found!";
                }
            });
        }
    }
    
    createGame(side){
        elem("startBlack").style.visibility = "hidden";
        elem("startWhite").style.visibility = "hidden";
        elem("lobbyInput").style.visibility = "hidden";
        elem("lobbyName").style.visibility = "visible";
        elem("lobbyMessage").style.visibility = "visible";
        elem("lobbyMessage").innerHTML = "Click to copy";
        pubnub.unsubscribeAll();
        
        joinChannel(makeid(6));
        elem("lobbyName").innerHTML = myChannel;
        mySide = side;
    }
    
    startGame(){
        myName = elem("nameInput").value||getRandomName();
        elem("startScreen").style.display = "none";
        if(mySide == 2) {
            this.rotateBoard();
        }
        this.updateNames();
    }

    updateNames() {
        if((mySide == 1 && this.rotated) || (mySide == 2 && !this.rotated)) {
            elem("nameTop").innerHTML = myName;
            elem("nameBottom").innerHTML = myOpponent;
        }else {
            elem("nameTop").innerHTML = myOpponent;
            elem("nameBottom").innerHTML = myName;

        }
         
    }

    drawCheck(attackingTeam) {
        //remove all red from the board
        let tdList = document.getElementsByTagName("td");
        for(let i=0; i<tdList.length; i++) {
            tdList[i].classList.remove('check-light-square');
            tdList[i].classList.remove('check-dark-square');
        }
        
        for(let i=0; i<this.game.pieces.length; i++) { //loop through pieces 
            if(this.game.pieces[i].name == "king" && this.game.pieces[i].team != attackingTeam) { //to find enemy king
                let x = this.game.pieces[i].x;
                let y = this.game.pieces[i].y;
                //find which <td> king is on
                let htmlCol;
                if(this.rotated) { //if black on bottom / board flipped
                    x = 7 - x
                    y = 7 - y;
                } 
                    let htmlRow = document.getElementById("row" + (7-y));
                    let htmlCols = htmlRow.children;
                    htmlCol = htmlCols[x];  
                if(this.game.findCheck(this.game.pieces[i])) {
                    //add red ui
                    if((x % 2 == 0) && (y % 2 != 0)) {
                        htmlCol.classList.add('check-light-square');    
                    }else if((x % 2 != 0) && (y % 2 == 0)) {
                        htmlCol.classList.add('check-light-square');
                    }else {
                        htmlCol.classList.add('check-dark-square');
                    }
                    
                }
            }
        } 
    }
}