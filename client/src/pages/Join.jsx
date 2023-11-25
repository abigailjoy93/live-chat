import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../App.css";

// join page function
const Join = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/chatapp`;
    navigate(path);
  };

  return (
    <div className="d-grid gap-2">
      <Button className="btn btn-primary" type="button" onClick={routeChange}>
        Connect me to a chat!
      </Button>
    </div>
  );
};

export default Join;
