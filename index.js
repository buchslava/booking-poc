const socket = require("socket.io");
const express = require("express");
const app = express();
const server = app.listen(9090, () => {
    console.log("Listening on port 9090");
});
app.use(express.static("public"));

const io = socket(server);

let quantity = 10;

io.on("connection", socket => {
    socket.on("get-free-tickets-quantity", () => {
        io.sockets.emit("put-free-tickets-quantity", quantity);
    });
    socket.on("reserve-action", data => {
        if (data.handle) {
            quantity--;
            io.sockets.emit("put-free-tickets-quantity", quantity);
        }
    });
});
