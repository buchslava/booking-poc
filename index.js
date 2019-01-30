const socket = require("socket.io");
const express = require("express");
const app = express();
const server = app.listen(9090, () => {
    console.log("Listening on port 9090");
});
app.use(express.static("public"));

const io = socket(server);

const whoBoughtAticket = new Set();
let users = 0;
let quantity = 7;

io.on("connection", socket => {
    io.sockets.emit("put-users-quantity", ++users);

    socket.on("get-free-tickets-quantity", () => {
        io.sockets.emit("put-free-tickets-quantity", quantity);
    });
    socket.on("reserve-action", data => {
        if (data.handle) {
            if (whoBoughtAticket.has(data.handle)) {
                socket.emit("alert", { message: "You already bougth a ticket!" });
                return;
            }

            if (quantity > 0) {
                quantity--;
                whoBoughtAticket.add(data.handle);
                io.sockets.emit("put-free-tickets-quantity", quantity);
            } else {
                socket.emit("alert", { message: "Free tickers are missing!" });
                return;
            }
        }
    });
    socket.on("add-quantity", quantityToAdd => {
        quantity += Number(quantityToAdd);
        io.sockets.emit("put-free-tickets-quantity", quantity);
    });
    socket.on("disconnect", () => {
        io.sockets.emit("put-users-quantity", --users);
    });
});
