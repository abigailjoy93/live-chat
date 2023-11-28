//imports
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import catAvatar from "../../assets/cat.png";
import hedgeHog from "../../assets/hedgehog.png";
import { format } from "date-fns";
import "../ChatApp/ChatApp.css";

// Component definition
const chatApp = () => {
  // State for storing messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      client_offset: "string",
      content: "String",
    },
  ]);
  // State for handling input value
  const [inputValue, setInputValue] = useState("");

  // Initialize socket connection
  const socket = io("ws://localhost:3001", {
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttemps: 10,
    transports: ["websocket"],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
  });

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) {
      console.log(inputValue);
      const clientOffset = `${socket.id}-${messages.length}`;
      console.log(messages);
      socket.emit("chat message", inputValue, clientOffset);
      setInputValue("");
    }
  };

  // Effect to handle incoming messages
  useEffect(() => {
    socket.on("chat message", (msg, serverOffset) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: msg, serverOffset },
      ]);
      window.scrollTo(0, document.body.scrollHeight);
      socket.auth.serverOffset = serverOffset;
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  let currentDate = format(new Date(), "MMMM do yyyy, h:mm:ss a");

  // JSX structure for the component
  return (
    <section>
      <div>
        <ul className="chatbox-body">
          {messages.map((message, index) => (
            <li
              key={index}
              className="message-item"
              style={{
                background: index % 2 === 0 ? "#fff" : "#efefef",
              }}
            >
              {message.text}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit} className="textbox-card">
          <input
            id="input"
            autoComplete="off"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="textbox"
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>

      <div className="chatbox-card">
        <div className="card-header">
          <h2>Live chat connection established!</h2>
          <p className="header-text">
            Please remember that the person on the other side of the screen is a
            real person. Be kind, be respectful, be interesting.
          </p>
          <p className="header-date">{currentDate}</p>
        </div>
        <div className="chatbox-card-body">{/* chat messages here*/}</div>
        <div className="textbox-card">
          <input className="textbox" id="input" autoComplete="off" />
          <button>Send</button>
        </div>
      </div>
    </section>
  );
};

export default chatApp;
