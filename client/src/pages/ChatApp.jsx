// //Chatroom Page

//socket.io
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../components/styles/ChatApp.css";


// Component definition
const chatApp = () => {
  // State for storing messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      client_offset: "string",
      content: "String",
    }
  ]);
  // State for handling input value
  const [inputValue, setInputValue] = useState('');

  // Initialize socket connection
  const socket = io({
    ackTimeout: 10000,
    retries: 3,
    auth: {
      serverOffset: 0,
    },
  });

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) {
      console.log(inputValue);
      const clientOffset = `${socket.id}-${messages.length}`;
      console.log(messages);
      socket.emit('chat message', inputValue, clientOffset);
      setInputValue('');

    }
  };


  // Effect to handle incoming messages
  useEffect(() => {
    socket.on('chat message', (msg, serverOffset) => {
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


  // JSX structure for the component
  return (

    <div>
      <ul>
        {messages.map((message, index) => (
          <li
            key={index}
            style={{ padding: '0.5rem 1rem', background: index % 2 === 0 ? '#fff' : '#efefef' }}
          >
            {message.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} style={{ background: 'rgba(0, 0, 0, 0.15)', padding: '0.25rem', position: 'fixed', bottom: '0', left: '0', right: '0', display: 'flex', height: '3rem', boxSizing: 'border-box', backdropFilter: 'blur(10px)' }}>
        <input
          id="input"
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ border: 'none', padding: '0 1rem', flexGrow: '1', borderRadius: '2rem', margin: '0.25rem' }}
        />
        <button
          type="submit"
          style={{ background: '#333', border: 'none', padding: '0 1rem', margin: '0.25rem', borderRadius: '3px', outline: 'none', color: '#fff' }}
        >
          Send
        </button>
      </form>
    </div>

  );
};

export default chatApp;
