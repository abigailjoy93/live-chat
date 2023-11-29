import React from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Search from "../components/Search";
import Footer from "../components/Footer";
import "../App.css";

// home page function
const Home = () => {
  return (
    <div className="homeContainer">
      <Login />
      <Signup />
      <Footer />
    </div>
  );
};

export default Home;
