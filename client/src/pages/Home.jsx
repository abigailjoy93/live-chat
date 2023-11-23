import React from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Search from "../components/Search";

// home page function
const Home = () => {
  return (
    <div className="container">
      <Login />
      <Signup />
      <Search />

    </div>
  );
};

export default Home;
