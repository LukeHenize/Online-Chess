class Queen extends Piece {
    constructor(x, y, team, myGame) {
        super(x, y, team, myGame);
        this.name = "queen";
    }
    spacesCovered() {
        //ROOK CODE (FOR STRAIGHT DIRECTIONS)
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

        //BISHOP CODE (FOR DIAGONAL DIRECTIONS)
        x = this.x;
        y = this.y;
        let i = 0; //i keeps track of how many bishop diagonals we have looped through
        while(i<4) { //looping through bishop diagonals
            while(x > -1 && x < 8 && y > -1 && y < 8) { //while bishop is on board
            currentSpace.push(x);
            currentSpace.push(y);
            if(this.isOccupied(currentSpace, this) == 2) {
                //if space is occupied by current piece, don't include
                if(i==0) {
                    x++;
                    y++;
                }else if(i==1) {
                    x++;
                    y--;
                }else if(i==2) {
                    x--;
                    y--;
                }else if(i==3) {
                    x--;
                    y++;
                }
            }else if(this.isOccupied(currentSpace, this) == 1) {
                //if space is occupied by team, don't include and stop searching
                x = 8;
            }else if(this.isOccupied(currentSpace, this) == 0) {
                //if space is occupied by enemy, include and stop searching
                availableSpaces.push(currentSpace);
                y = 8;
            }else {
                //if space isn't occupied, include space
                availableSpaces.push(currentSpace);
                if(i==0) {
                    x++;
                    y++;
                }else if(i==1) {
                    x++;
                    y--;
                }else if(i==2) {
                    x--;
                    y--;
                }else if(i==3) {
                    x--;
                    y++;
                }
            }
            currentSpace = [];
            }
            x = this.x;
            y = this.y;
            i++;
            currentSpace = [];
        }
        return availableSpaces;
    }
}