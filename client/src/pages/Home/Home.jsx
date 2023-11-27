import React from "react";
import Signup from "../../components/Signup";
import Login from "../../components/Login";
import "./Home.css";

// home page function
const Home = () => {
  return (
    <div className="home-container">
      <Login />
      <Signup />
    </div>
  );
};

export default Home;
