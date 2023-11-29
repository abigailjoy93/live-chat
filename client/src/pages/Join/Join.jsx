import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Join.css";

// join page function
const Join = ({ socket, username }) => {
  const room = 1
  const navigate = useNavigate();
  const joinRoom = () => {
    if (username !== "") {
      socket.emit("join_room", { username, room});
    }
    navigate('/chatapp', { replace: true });
  };


  const routeChange = () => {
    let path = `/chatapp`;
    navigate(path);
  };

  return (
    <div className="d-grid gap-2">
      <Button className="join-btn" type="button" onClick={joinRoom}>
        <p className="join-btn-text">Connect me to a chat!</p>
      </Button>
    </div>
  );
};

export default Join;
