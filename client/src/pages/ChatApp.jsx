// //Chatroom Page

//socket.io
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../components/styles/ChatApp.css";
import catAvatar from "../assets/cat.png";
import hedgeHog from "../assets/hedgehog.png";

// const io = require("socket.io-client");
const socket = io("http://localhost:3001");

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Listen for incoming chat messages
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      // Disconnect the socket when the component is unmounted
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      // Emit the message to the server
      socket.emit("chat message", message);
      setMessage("");
    }
  };



  return (
    <body>
      <div>
        <div className="chatbox-header">
          <div className="card-header">
            <h2>Live chat connection established!</h2>
            <p className="header-text">Please remember that the person on the other side of the screen is a real person. Be kind, be respectful, be interesting.</p>
            <p className="header-date">November 18, 2023, 11:19 AM, CST</p>
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
          <input className="textbox" id="input" autocomplete="off" /><button onClick={sendMessage}>Send</button>
        </div>
      </div>

      {/* Separating changes for future triage */}
      <div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>


    </body >

  );
}

export default ChatApp;
