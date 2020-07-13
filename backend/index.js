const { strict } = require("assert");

var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});

app.get("/room/:id", (req, res) => {
    
});

io.on("connection", socket => {
    const roomId = socket.request._query["room"];
    const username = socket.request._query["username"];
    socket.join(roomId);
    console.log(username.toString() + " connected to room " + roomId.toString());

    socket.on("disconnecting", () => {
        const rooms = Object.keys(socket.rooms);
        console.log(rooms);
    });
});

http.listen(3000, () => {
    console.log("listening on *:3000");
});