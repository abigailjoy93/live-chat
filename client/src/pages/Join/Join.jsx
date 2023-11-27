import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Join.css"

// join page function
const Join = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/chatapp`;
    navigate(path);
  };

  return (
    <div className="d-grid gap-2">
      <Button className="join-btn form-btn" type="button" onClick={routeChange}>
        <p className="join-btn-text">Connect me to a chat!</p>
      </Button>
    </div>
  );
};

export default Join;
