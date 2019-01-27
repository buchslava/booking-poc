const socket = io.connect("http://localhost:9090");
const tickets = document.querySelector("#tickets");
const handle = document.querySelector("#handle");
const reserve = document.querySelector("#reserve");

reserve.addEventListener("click", () => {
    socket.emit("reserve-action", { handle: handle.value });
    handle.value = "";
});

socket.emit("get-free-tickets-quantity");

socket.on("put-free-tickets-quantity", quantity => {
    tickets.innerHTML = quantity;
});
