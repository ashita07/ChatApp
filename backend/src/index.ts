import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
  name: string;
}

let CountUser = 0;
let allSockets: User[] = [];

wss.on("connection", (socket) => {
  CountUser += 1;
  console.log("User connected: " + CountUser);

  socket.on("message", (event) => {
    try {
      const parsedMessage = JSON.parse(event as any as string);

      if (parsedMessage.type === "join") {
        allSockets.push({
          socket,
          room: parsedMessage.payload.room,
          name: parsedMessage.payload.name,
        });
      }

      console.log(allSockets.length);

      if (parsedMessage.type === "chat") {
        const currentUser = allSockets.find((s) => s.socket === socket); // ✅ Fixed

        const userRoom = currentUser ? currentUser.room : null;
        console.log(`User found in room: ${userRoom}`);

        if (!userRoom) return; // Exit if userRoom is null

        const roomSame = allSockets.filter((e) => e.room === userRoom); // ✅ Fixed

        console.log(`users in room ${userRoom}:`, roomSame.length);

        roomSame.forEach((element) => {
          if (element.socket.readyState === WebSocket.OPEN) {
            console.log(`sending message to user in room : ${userRoom}`);

            const messageToSend = JSON.stringify({
              name: currentUser?.name,
              message: parsedMessage.payload.message,
            });
            element.socket.send(messageToSend);
          } else {
            console.log("skipping closed socket");
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("close", () => {
    console.log("user disconnected");
    allSockets = allSockets.filter((user) => user.socket != socket);
  });

  socket.on("error", (error) => {
    console.log(error);
  });
});
