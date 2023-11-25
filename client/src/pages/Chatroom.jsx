import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const Chatroom = () => {
  const [pairedWith, setPairedWith] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:3001"); // Adjust the server URL

    // Emit a message to join the room
    socket.emit("joinRoom", "yourRoomName");

    // Handle pairing users
    socket.on("pairUsers", ({ pairedWith }) => {
      setPairedWith(pairedWith);
    });

    // Clean up on component unmount
    return () => {
      // Emit a message to leave the room
      socket.emit("leaveRoom", "yourRoomName");
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      {pairedWith ? (
        <p>You are paired with: {pairedWith}</p>
      ) : (
        <p>Waiting for a partner...</p>
      )}
      {/* Your React component content */}
    </div>
  );
};

export default Chatroom;
