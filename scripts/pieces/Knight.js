class Knight extends Piece {
    constructor(x, y, team, myGame) {
        super(x, y, team, myGame);
        this.name = "knight";
    }
    spacesCovered() {
        //RETURNS ARRAY OF SPACES COVERED
        function findKnightMoves(x, y) { //fills allKnightMoves array
            if(x > -1 && x < 8 && y > -1 && y < 8) { //if piece is on board
                allKnightMoves.push(Array(x, y)); //add to array
            }
        }
        let availableSpaces = []; //array that will be returned
        let allKnightMoves = []; //holds all 8 possible knight moves
        let x = this.x; //current knight position
        let y = this.y; //current knight position
        findKnightMoves(x+1, y+2);
        findKnightMoves(x+2, y+1);
        findKnightMoves(x+2, y-1);
        findKnightMoves(x+1, y-2);
        findKnightMoves(x-1, y-2);
        findKnightMoves(x-2, y-1);
        findKnightMoves(x-2, y+1);
        findKnightMoves(x-1, y+2);
        //move legal spaces into availableSpaces array
        allKnightMoves.forEach(
            currentValue => { if(this.isOccupied(currentValue, this) == 0 || this.isOccupied(currentValue, this) == -1) {
                availableSpaces.push(currentValue);
                }
            }
        )
        return availableSpaces;
    }
}