const io = require("socket.io-client");
const stdin = process.openStdin();
const socket = io.connect("http://localhost:9090", { reconnect: true });

socket.on("connect", socket => {
    console.log("Admin just connected!");
});

stdin.addListener("data", newData => {
    socket.emit("add-quantity", newData.toString().trim());
});
