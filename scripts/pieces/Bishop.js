class Bishop extends Piece {
    constructor(x, y, team, myGame) {
        super(x, y, team, myGame);
        this.name = "bishop";
    }
    spacesCovered() {
        //RETURNS ARRAY OF SPACES COVERED
        let availableSpaces = []; //array that will be returned
        let currentSpace = []; //array to temporarily hold spaces

        let x = this.x;
        let y = this.y;
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