//imports
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import catAvatar from "../../assets/cat.png";
import hedgeHog from "../../assets/hedgehog.png";
import { format } from "date-fns";

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
        <ul>
          {messages.map((message, index) => (
            <li
              key={index}
              style={{
                padding: "0.5rem 1rem",
                background: index % 2 === 0 ? "#fff" : "#efefef",
              }}
            >
              {message.text}
            </li>
          ))}
        </ul>
        <form
          onSubmit={handleSubmit}
          style={{
            background: "rgba(0, 0, 0, 0.15)",
            padding: "0.25rem",
            position: "fixed",
            bottom: "0",
            left: "0",
            right: "0",
            display: "flex",
            height: "3rem",
            boxSizing: "border-box",
            backdropFilter: "blur(10px)",
          }}
        >
          <input
            id="input"
            autoComplete="off"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              border: "none",
              padding: "0 1rem",
              flexGrow: "1",
              borderRadius: "2rem",
              margin: "0.25rem",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#333",
              border: "none",
              padding: "0 1rem",
              margin: "0.25rem",
              borderRadius: "3px",
              outline: "none",
              color: "#fff",
            }}
          >
            Send
          </button>
        </form>
      </div>

      {/* <div>
        <div className="chatbox-header">
          <div className="card-header">
            <h2>Live chat connection established!</h2>
            <p className="header-text">Please remember that the person on the other side of the screen is a real person. Be kind, be respectful, be interesting.</p>
            <p className="header-date">{currentDate}</p>
          </div>
        </div>
        <div className="chatbox-card">
          <div className="card-body">
            <div className="received-messages">
              <img className="avatar1" src={catAvatar} alt="avatar for user 1"></img>
              <div className="received-messages-inner">
                <div className="received-messages-body">
                  <div className="received-messages-content">
                    <div className="received-messages-text">
                      <p>Hi! This is our first sample message.</p>
                    </div>
                    <div className="received-messages-footer text-muted">November 18, 2023 at 11:50 am</div>
                    <div className="received-messages-text">
                      <p>ladedadeda</p>
                    </div>
                    <div className="received-messages-footer text-muted">November 18, 2023 at 11:55 am</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sent-messages">
              <img className="avatar2" src={hedgeHog} alt="avatar for user 2"></img>
              <div className="sent-messages-inner">
                <div className="sent-messages-body">
                  <div className="sent-messages-content">
                    <div className="sent-messages-text">
                      <p>WOW! Look at us go.</p>
                    </div>
                    <div className="sent-messages-footer text-muted">November 18, 2023 at 11:59 am</div>
                    <div className="sent-messages-text">
                      <p>What a time to be alive</p>
                    </div>
                    <div className="sent-messages-footer text-muted">November 18, 2023 at 12:00 pm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="textbox-card">
          <input className="textbox" id="input" autoComplete="off" /><button>Send</button>
        </div>
      </div> */}
    </section>
  );
};

export default chatApp;
