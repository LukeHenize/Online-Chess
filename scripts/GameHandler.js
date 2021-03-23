class GameHandler {
    constructor(game, ui){
        this.game = game;
        this.ui = ui;
        this.isMultiplayer = false;
    }
    
    move(x1, y1, x2, y2) {
        
        if(this.isMultiplayer) {
            console.log("gameHandler move with multiplayer");
            let moveInfo = [x1, y1, x2, y2];
            if(game.playerToMove == mySide) {
                send("gameUpdate", moveInfo); 
            }
            
        }else {
            this.game.move(x1, y1, x2, y2); 
        }
        
    }
}