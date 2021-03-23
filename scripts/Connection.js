const uuid = PubNub.generateUUID();
var myChannel = "none";
var amHost = "false";
var myName = "none";
var myOpponent = "none";
var mySide = -1;
const pubnub = new PubNub({
    publishKey: "pub-c-878d20d0-0e8b-49c7-81cf-14bd98d67dae",
    subscribeKey: "sub-c-cc9725ba-e32d-11ea-9395-f2758a71b136",
    uuid: uuid
});

function send(type, content){
    pubnub.publish({
        channel : myChannel,
        message : {"sender": uuid, "type": type, "content": content, name: myName}
    }, function(status, response) {
        //Handle error here
        console.log(status)
    });
}

function joinChannel(channel) {
    myChannel = channel;
    pubnub.subscribe({
        channels: [channel],
        withPresence: true
    });
}

pubnub.addListener({
  message: function(event) {
    if (event.message.type == "chat") {
        ui.handleChat(event.message.content, event.message.name);
    }
    if(event.message.type == "gameUpdate") {
        let moveInfo = event.message.content;
        game.move(moveInfo[0], moveInfo[1], moveInfo[2], moveInfo[3]);
        ui.drawBoard();
    }
    if (event.message.type == "start") {
        
        console.log(event.message);
        myName = elem("nameInput").value||getRandomName();
        send("startingInfo", mySide);
    }
    if (event.message.type == "startingInfo") {
        gameHandler.isMultiplayer = true;
        console.log(event.message);
        if(uuid != event.message.sender) {
            myOpponent = event.message.name;
            if(event.message.content != -1) { //if opponent has side
                if(event.message.content == 1) {
                    mySide = 2;
                }else {
                    mySide = 1;
                }
            }ui.startGame();
        }
    }
  },
  presence: function(event) {
    console.log(event);
  }
});