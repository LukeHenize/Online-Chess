class Piece {
    constructor(x, y, team, myGame){
        this.x = x;
        this.y = y;
        this.team = team;
        this.myGame = myGame;
        this.moveCount = 0;
    }
    
    validMove(newX, newY) {
        //checks to see if move is legal
        let valid = false;
        let oldX = this.x;
        let oldY = this.y; //we will need to revert the changes made when calling findCheck
        let availableSpaces = this.spacesCovered();
        availableSpaces.forEach(
            (currentValue) => {
                if(currentValue[0] == newX && currentValue[1] == newY) { //if desired move is in spacesCovered
                    console.log(newX + "," + newY + " is an available space");
                    valid = true; //let valid be true (for now)
                }
            }
        );
        if(valid) { //must also call findCheck
            let pieceTaken = this.myGame.pieceAt(newX, newY); //store captured piece in case we need to revert
            this.myGame.deletePiece(newX, newY); //capture piece if necessary
            this.x = newX;
            this.y = newY; //if we make move, will king be in check?
            for(let i=0; i<this.myGame.pieces.length; i++) { //loop through pieces 
                if(this.myGame.pieces[i].name == "king" && this.myGame.pieces[i].team == this.team) { //to find team's king
                    valid = !(this.myGame.findCheck(this.myGame.pieces[i]));
                    if(valid) {
                        console.log("The king will not be in check");
                    }else {
                        console.log("This leaves king in check");
                    }
                }
            }
        this.x = oldX;
        this.y = oldY; //reset piece's location (we just needed to change temporarliy)
            if(pieceTaken) {
                this.myGame.pieces.push(pieceTaken); //restore captured piece
            }
        }
        
        return valid;
    }

    isOccupied(space, piece) { //gets access to piece map
        let pieceMap = piece.myGame.getMap();
        if(pieceMap[space[1]][space[0]] == piece.team) {
            //if pieceMap holds the team number at that spot, space is occupied by teammate
            if((space[1] == piece.y) && (space[0] == piece.x)) {
                //check to see if "teammate" is really the current piece
                return 2;
            } else {
                //if not us, then it's a different teammate
                return 1;
            }
        }else if((pieceMap[space[1]][space[0]] != piece.team) && (pieceMap[space[1]][space[0]] != 0)) {
            //if space is occupied by enemy
            return 0;
        }else {
            return -1;
        }
    }
}