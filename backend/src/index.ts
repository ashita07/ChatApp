import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let CountUser = 0;
let allSockets = [];
wss.on("connection", (socket) => {
  CountUser = CountUser + 1;
  allSockets.push(socket);
  console.log("user connected" + CountUser);

  socket.on("message", (event) => {
    console.log("message recieved " + event.toString());

    allSockets.forEach((a) => a.send(event.toString() + " sent from server"));
  });
});
