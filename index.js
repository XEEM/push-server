var app = require('http').createServer()

app.listen(3000)

function User(socket) {
    var self = this
    this.socket = socket
    this.name = ""
    this.game = {}

    // this.socket.on("playerMove", function(x, y) {
    //     self.game.playerMove(self, x, y)
    // })
}

// Player.prototype.joinGame = function(game) {
//     this.game = game
// }

function Game() {
    this.io = require('socket.io')(app)
    this.started = false
    this.addHandlers()
}

Game.prototype.addHandlers = function() {
    var game = this

    this.io.sockets.on("connection", function(socket) {
        console.log("user connected")

        socket.emit("hello", {message: "Hello world!"})
        // game.addPlayer(new Player(socket))
        // 
        
        socket.on("requestSent", function(data) {
          console.log(data)
        })
    })


}

Game.prototype.addUser = function(player) {
    console.log("adding player")
    // if (this.player1 === null) {
    //     this.player1 = player
    //     this.player1["game"] = this
    //     this.player1["name"] = "X"
    //     this.player1.socket.emit("name", "X")
    // } else if (this.player2 === null) {
    //     this.player2 = player
    //     this.player2["game"] = this
    //     this.player2["name"] = "O"
    //     this.player2.socket.emit("name", "O")
    //     this.startGame()
    // }
}



// Start the game server
var game = new Game()
console.log("server is listening on port 3000")