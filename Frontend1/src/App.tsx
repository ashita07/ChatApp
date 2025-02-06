import { useEffect, useRef, useState } from "react";
import "./App.css";

const ChatRoom: React.FC = () => {
  type Message = {
    name: string;
    message: string;
  };
  const [currentUser, setCurrentUser] = useState<string>("");
  const [joined, setJoined] = useState<boolean>(false);
  const [room, setRoom] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messageRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const joinRoom = () => {
    if (!room.trim()) return;
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      const recievedData = JSON.parse(event.data);
      setMessages((prev) => [
        ...prev,
        { name: recievedData.name, message: recievedData.message },
      ]);
    };

    ws.onopen = () => {
      console.log("connected to server");
      ws.send(JSON.stringify({ type: "join", payload: { room, name } }));
      setJoined(true);
      setCurrentUser(name);
    };

    ws.onclose = () => {
      console.log("Disconnected from server");
      setJoined(false);
    };
    setSocket(ws);
  };

  const sendMessages = () => {
    if (socket && message.trim()) {
      socket.send(
        JSON.stringify({
          type: "chat",
          payload: { message, name },
        })
      );
      setMessage("");
    }
  };

  return (
    <>
      {!joined ? (
        <div className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
          <h2 className=" mb-4 font-bold flex items-center justify-center text-2xl">
            Join a Chat Room
          </h2>
          <input
            placeholder="Enter Your Name"
            value={name}
            className="w-[90vh] border-2 rounded p-2 mt-4"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Enter Room Name"
            value={room}
            className="w-[90vh] border-2 rounded p-2 mt-4"
            type="text"
            onChange={(e) => setRoom(e.target.value)}
          />{" "}
          <button
            className="bg-gray-700 rounded p-2 w-[90vh] m-4 hover:bg-gray-500 rounded text-white"
            onClick={joinRoom}
          >
            Join Room
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center bg-gray-900 h-screen">
          <div className="w-full max-w-xl p-4 bg-gray-800 rounded-lg shadow-lg h-130">
            <h2 className="text-xl font-semibold">Room : {room}</h2>
            <div className="flex flex-col h-95 overflow-y-auto bg-gray-700 rounded-lg my-4 p-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`py-2 px-3 bg-gray-600 m-2 rounded-2xl text-white max-w-max text-lg ${
                    msg.name === currentUser ? "self-end" : null
                  }`}
                >
                  <div className="text-xs text-green-400">{msg.name}</div>
                  {msg.message}
                </div>
              ))}

              <div ref={messageRef}></div>
            </div>
            <div className="flex gap-2">
              <input
                className="p-2 flex-1 bg-gray-700 text-white focus:outline-none border-3 rounded w-full"
                type="text"
                placeholder="Type a message...."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white"
                onClick={sendMessages}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatRoom;
// import { useRef, useEffect, useState } from "react";

// export default function PreviousValue() {
//   const [count, setCount] = useState(0);
//   const prevCount = useRef<number>();

//   useEffect(() => {
//     prevCount.current = count; // Update ref AFTER render
//   }, [count]);

//   return (
//     <div>
//       <p>Current: {count}</p>
//       <p>Previous: {prevCount.current}</p>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//     </div>
//   );
// }
//count ref in the above example is being used for storing previous state of a variable using the useeffect hook sa use effect hook only acts after a render due to change in the variables in the dependency array ,thus we see the prechanged value which was endered
