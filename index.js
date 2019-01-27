const socket = require("socket.io");
const express = require("express");
const app = express();
const server = app.listen(9090, () => {
    console.log("Listening on port 9090");
});
app.use(express.static("public"));

const io = socket(server);

const whoBoughtAticket = new Set();
let quantity = 3;

io.on("connection", socket => {
    socket.on("get-free-tickets-quantity", () => {
        io.sockets.emit("put-free-tickets-quantity", quantity);
    });
    socket.on("reserve-action", data => {
        if (data.handle) {
            if (whoBoughtAticket.has(data.handle)) {
                io.sockets.emit("alert", { message: "You already bougth a ticket!" });
                return;
            }

            if (quantity > 0) {
                quantity--;
                whoBoughtAticket.add(data.handle);
                io.sockets.emit("put-free-tickets-quantity", quantity);
            } else {
                io.sockets.emit("alert", { message: "Free tickers are missing!" });
                return;
            }
        }
    });
});
