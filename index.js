const socket = require("socket.io");
const express = require("express");
const app = express();
const server = app.listen(9090, () => {
    console.log("Listening on port 9090");
});
app.use(express.static("public"));

const io = socket(server);

let quantity = 100;

io.on("connection", socket => {
    socket.on("get-free-tickets-quantity", () => {
        io.sockets.emit("put-free-tickets-quantity", quantity);
    });
    socket.on("reserve-action", () =>{
        quantity--;
        io.sockets.emit("put-free-tickets-quantity", quantity);
    });
});
