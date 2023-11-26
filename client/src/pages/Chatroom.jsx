import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { format } from "date-fns";
import { useMutation } from "@apollo/client";
import { ADD_CHAT, DELETE_CHAT, ADD_MESSAGE } from "../utils/mutations";
import catAvatar from "../assets/cat.png";
import hedgeHog from "../assets/hedgehog.png";

const Chatroom = () => {
  const [pairedWith, setPairedWith] = useState(null);
  const [addChat] = useMutation(ADD_CHAT);

  useEffect(() => {
    const socket = io("http://localhost:3001"); // Adjust the server URL

    // Emit a message to join the room
    socket.emit("joinRoom", "Room 1");

    // Handle pairing users
    socket.on("pairUsers", ({ pairedWith }) => {
      setPairedWith(pairedWith);
    });

    addChat({
      variables: {
        users: [
         //user data
        ], 
      },
    })
      .then((response) => {
        // Handle the response if needed
        console.log("Chat added:", response.data.addChat);
      })
      .catch((error) => {
        // Handle the error if needed
        console.error("Error adding chat:", error);
      });

    // Clean up on component unmount
    return () => {
      // Emit a message to leave the room
      socket.emit("leaveRoom", "Room 1");
      socket.disconnect();
    };
  }, []);

  let currentDate = format(new Date(), "MMMM do yyyy, h:mm:ss a");

  return (
    <section>
      <div className="chatbox-header">
        <div className="card-header">
          <h2>Live chat connection established!</h2>
          <p className="header-text">
            Please remember that the person on the other side of the screen is a
            real person. Be kind, be respectful, be interesting.
          </p>
          <p className="header-date">{currentDate}</p>
          {pairedWith ? (
            <p>You are paired with: {pairedWith}</p>
          ) : (
            <p>Waiting for a partner...</p>
          )}
        </div>
      </div>
      <div className="chatbox-card">
        <div className="card-body">
          <div className="received-messages">
            <img
              className="avatar1"
              src={catAvatar}
              alt="avatar for user 2"
            ></img>
            <div className="received-messages-inner">
              <div className="received-messages-body">
                <div className="received-messages-content">
                  {/* <div className="received-messages-text">
                      <p>Hi! This is our first sample message.</p>
                    </div>
                    <div className="received-messages-footer text-muted">November 18, 2023 at 11:50 am</div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="sent-messages">
            <img
              className="avatar2"
              src={hedgeHog}
              alt="avatar for user 1"
            ></img>
            <div className="sent-messages-inner">
              <div className="sent-messages-body">
                <div className="sent-messages-content">
                  {/* <div className="sent-messages-text">
                      <p>WOW! Look at us go.</p>
                    </div>
                    <div className="sent-messages-footer text-muted">November 18, 2023 at 11:59 am</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="textbox-card">
        <input className="textbox" id="input" autoComplete="off" />
        <button>Send</button>
      </div>
    </section>
  );
};

export default Chatroom;
