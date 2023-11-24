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
      <header>
        <img class="logo" src="assets/live-chat-high-resolution-logo-transparent.png" alt="live chat logo"></img>
      </header>
      <div>
        <div class="chatbox-header">
          <div class="card-header">
            <h2>Live chat connection established!</h2>
            <p class="header-text">Please remember that the person on the other side of the screen is a real person. Be kind, be respectful, be interesting.</p>
            <p class="header-date">November 18, 2023, 11:19 AM, CST</p>
          </div>
        </div>
        <div class="chatbox-card">
          <div class="card-body">
            <div class="received-messages">
              <img class="avatar1" src={catAvatar} alt="avatar for user 1"></img>
              <div class="received-messages-inner">
                <div class="received-messages-body">
                  <div class="received-messages-content">
                    <div class="received-messages-text">
                      <p>Hi! This is our first sample message.</p>
                    </div>
                    <div class="received-messages-footer text-muted">November 18, 2023 at 11:50 am</div>
                    <div class="received-messages-text">
                      <p>ladedadeda</p>
                    </div>
                    <div class="received-messages-footer text-muted">November 18, 2023 at 11:55 am</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="sent-messages">
              <img class="avatar2" src={hedgeHog} alt="avatar for user 2"></img>
              <div class="sent-messages-inner">
                <div class="sent-messages-body">
                  <div class="sent-messages-content">
                    <div class="sent-messages-text">
                      <p>WOW! Look at us go.</p>
                    </div>
                    <div class="sent-messages-footer text-muted">November 18, 2023 at 11:59 am</div>
                    <div class="sent-messages-text">
                      <p>What a time to be alive</p>
                    </div>
                    <div class="sent-messages-footer text-muted">November 18, 2023 at 12:00 pm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="textbox-card">
          <input class="textbox" id="input" autocomplete="off" /><button onClick={sendMessage}>Send</button>
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
