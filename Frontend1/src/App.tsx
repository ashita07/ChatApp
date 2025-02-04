import { useState } from "react";
import "./App.css";

const ChatRoom: React.FC = () => {
  const [joined, setJoined] = useState<boolean>(true);

  return (
    <>
      {!joined ? (
        <div className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
          <div className="">
            <h2 className=" mb-4 font-bold flex items-center justify-center text-2xl">
              Join a Chat Room
            </h2>
            <input className="w-[90vh] border-2 rounded p-2 mt-4" type="text" />{" "}
          </div>
          <button className="bg-gray-700 rounded p-2 w-[90vh] m-4 hover:bg-gray-500 rounded text-white">
            Join Room
          </button>
        </div>
      ) : (
        <div className="w-full max-w-lg p-4 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Room:{}</h2>
          <div className="h-64 overflow-y-auto bg-gray-700 rounded-lg my-4">
            message
          </div>
          <div className="flex gap-2">
            <input
              className="p-2 flex-1 bg-gray-700 text-white focus:outline-none border-3 rounded w-full"
              type="text"
            />
            <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-white">
              Send
            </button>
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
//count ref in the above example is being used for sloring previous state of a variable using the useeffect hook sa use effect hook only acts after a render due to change in the variables in the deoendency array ,thus we see the prechanged value which was endered
