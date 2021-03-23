class Rook extends Piece {
    constructor(x, y, team, myGame) {
        super(x, y, team, myGame);
        this.name = "rook";
    }
    spacesCovered() {
        //RETURNS ARRAY OF SPACES COVERED
        let availableSpaces = []; //array that will be returned
        let currentSpace = []; //array to temporarily hold spaces

        let y = this.y;
        while(y < 8) { //finding available spaces UPWARD
            currentSpace.push(this.x); //find x coord
            currentSpace.push(y); //then find y coord of space
            if(this.isOccupied(currentSpace, this) == 2) {
                //if space is occupied by current piece, don't include
                y++;
            }else if(this.isOccupied(currentSpace, this) == 1) {
                //if space is occupied by team, don't include and stop searching
                y = 8;
            }else if(this.isOccupied(currentSpace, this) == 0) {
                //if space is occupied by enemy, include and stop searching
                availableSpaces.push(currentSpace);
                y = 8;
            }else {
                //if space isn't occupied, include space
                availableSpaces.push(currentSpace);
                y++;
            }
            currentSpace = [];
        }

        y = this.y;
        while(y > -1) { //finding available spaces DOWNWARD
            currentSpace.push(this.x); //find x coord
            currentSpace.push(y); //then find y coord of space
            if(this.isOccupied(currentSpace, this) == 2) {
                //if space is occupied by current piece, don't include
                y--;
            }else if(this.isOccupied(currentSpace, this) == 1) {
                //if space is occupied by team, don't include and stop searching
                y = -1;
            }else if(this.isOccupied(currentSpace, this) == 0) {
                //if space is occupied by enemy, include and stop searching
                availableSpaces.push(currentSpace);
                y = -1;
            }else {
                //if space isn't occupied, include space
                availableSpaces.push(currentSpace);
                y--;
            }
            currentSpace = [];
        } 

       let x = this.x;
        while(x > -1) { //finding available spaces TO THE LEFT
            currentSpace.push(x); //find x coord
            currentSpace.push(this.y); //then find y coord
            if(this.isOccupied(currentSpace, this) == 2) {
                //if space is occupied by current piece, don't include
                x--;
            }else if(this.isOccupied(currentSpace, this) == 1) {
                //if space is occupied by team, don't include and stop searching
                x = -1;
            }else if(this.isOccupied(currentSpace, this) == 0) {
                //if space is occupied by enemy, include and stop searching
                availableSpaces.push(currentSpace);
                x = -1;
            }else {
                //if space isn't occupied, include space
                availableSpaces.push(currentSpace);
                x--;
            }
            currentSpace = [];
        }

        x = this.x;
        while(x < 8) { //finding available spaces TO THE RIGHT
            currentSpace.push(x); //find x coord
            currentSpace.push(this.y); //then find y coord
            if(this.isOccupied(currentSpace, this) == 2) {
                //if space is occupied by current piece, don't include
                x++;
            }else if(this.isOccupied(currentSpace, this) == 1) {
                //if space is occupied by team, don't include and stop searching
                x = 8;
            }else if(this.isOccupied(currentSpace, this) == 0) {
                //if space is occupied by enemy, include and stop searching
                availableSpaces.push(currentSpace);
                x = 8;
            }else {
                //if space isn't occupied, include space
                availableSpaces.push(currentSpace);
                x++;
            }
            currentSpace = [];
        }
        return availableSpaces;
    }
}