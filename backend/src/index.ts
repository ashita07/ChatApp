import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let CountUser = 0;
let allSockets: User[] = [];

wss.on("connection", (socket) => {
  CountUser += 1;
  console.log("User connected: " + CountUser);

  socket.on("message", (event) => {
    console.log(event);

    const parsedMessage = JSON.parse(event as any as string);

    if (parsedMessage.type === "join") {
      allSockets.push({
        socket,
        room: parsedMessage.payload.room,
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
        element.socket.send(parsedMessage.payload.message);
      });
    }
  });
});
