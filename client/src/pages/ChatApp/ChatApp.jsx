//imports
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import catAvatar from "../../assets/cat.png";
import hedgeHog from "../../assets/hedgehog.png";
import { format } from "date-fns";
import "../ChatApp/ChatApp.css";

// Component definition
const chatApp = ({ socket }) => {
  // State for storing messages
  const [messagesReceived, setMessagesReceived] = useState([
    // {
    //   id: 1,
    //   client_offset: "string",
    //   content: "String",
    // },
  ]);
  // State for handling input value
  const [inputValue, setInputValue] = useState("");

  // Initialize socket connection
  // const socket = io("ws://localhost:3001", {
  //   reconnectionDelay: 1000,
  //   reconnection: true,
  //   reconnectionAttemps: 10,
  //   transports: ["websocket"],
  //   agent: false,
  //   upgrade: false,
  //   rejectUnauthorized: false,
  // });

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) {
      console.log(inputValue);
      // const clientOffset = `${socket.id}-${messages.length}`;
      // console.log(messages);
      socket.emit("chat message", inputValue);
      setInputValue("");
    }
  };

  // Effect to handle incoming messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
      // window.scrollTo(0, document.body.scrollHeight);
      // socket.auth.serverOffset = serverOffset;
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  const now = Date()

  // JSX structure for the component
  return (
    <section>
      <div className="chatbox-card">
        <div className="card-header">
          <h2>Live chat connection established!</h2>
          <p className="header-text">
            Please remember that the person on the other side of the screen is a
            real person. Be kind, be respectful, be interesting.
          </p>
          <p className="header-date">{formatDateFromTimestamp(now)}</p>
        </div>
        <div className="chatbox-card-body">
          <ul className="chatbox-body">
            {messagesReceived.map((msg, i) => (
              <div className="message-item" key={i}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span
                    className="message-item"
                    style={{
                      background: index % 2 === 0 ? "#fff" : "#efefef",
                    }}
                  >
                    {msg.username}
                  </span>
                  <span
                    className="message-item"
                    style={{
                      background: index % 2 === 0 ? "#fff" : "#efefef",
                    }}
                  >
                    {msg.__createdtime__}
                  </span>
                </div>
                <p
                  className="message-item"
                  style={{
                    background: index % 2 === 0 ? "#fff" : "#efefef",
                  }}
                >
                  {msg.message}
                </p>
                <br />
              </div>
            ))}
          </ul>
        </div>
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
    </section>
  );
};

export default chatApp;
