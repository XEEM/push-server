var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});
app.get('/requestSent', function(req, res) {
    var userId = req.param('userId');
    var requestId = req.param('requestId');

    console.log("Request Sent API")
    console.log("User ID:" + userId)
    console.log("Request ID:" + requestId)
    var user = service.findUserWithShop(userId);
    if (user != null) {
        console.log("Found User: " + user.userId);

        user.sendRequestSentNotification(requestId);
    }


});

app.post('/requestSent', function(req, res) {
    var userId = req.param('userId');
    var requestId = req.param('requestId');
    var data = req.body;

    console.log("Request Sent API");
    console.log("Body: " + data);
    console.log("User ID:" + userId);
    console.log("Request ID:" + requestId);

    var user = service.findUserWithShop(userId);
    if (user != null) {
        console.log("Found User: " + user.userId);

        user.sendRequestSentNotification(requestId, data);
    }

    res.json(data);
});

function User(socket) {
    var self = this
    this.socket = socket
    this.userId = ""
    this.addHandlers();
}
User.prototype.addHandlers = function() {
    var self = this;
    this.socket.emit("hello", {
            message: "Hello world!"
        })
        // game.addPlayer(new Player(socket))
        // 
    this.socket.on("requestSent", function(data) {
        console.log(data)
    })

    this.socket.on("hello", function(data) {
        console.log(data)
    })
}
User.prototype.sendRequestSentNotification = function(requestId, request) {
    var self = this;
    this.socket.emit('requestSent', requestId);
    console.log("sent requestSend");
    this.socket.emit('requestSent2', request);
    console.log("sent requestSend2");
}

function XeemService() {
    this.io = require('socket.io')(server);
    this.started = false
    this.users = []
    this.addHandlers()
}
XeemService.prototype.addHandlers = function() {
    var service = this
    console.log("adding handlers")
    this.io.on("connection", function(socket) {
        var newUser = new User(socket);
        service.users.push(newUser);
        console.log("user connected")
        socket.on('sendUserId', function(data) {
            console.log("send user id event");
            console.log(data);
            newUser.userId = data;
        })
    })
}
XeemService.prototype.findUserWithShop = function(userId) {
        var service = this;
        for (var i = 0; i < this.users.length; i++) {
            console.log("user #" + i + "'s id: " + this.users[i].userId)
            if (this.users[i].userId == userId) return this.users[i];
        }
        return null;
    }
    // // Start the game server
var service = new XeemService()
server.listen(process.env.PORT || 3000)
console.log("server is listening on port 3000")