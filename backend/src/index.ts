import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let CountUser = 0;

wss.on("connection", (socket) => {
  CountUser = CountUser + 1;
  console.log("user connected" + CountUser);

  socket.on("message", (event) => {
    console.log("message recieved" + event.toString());
  });
});
