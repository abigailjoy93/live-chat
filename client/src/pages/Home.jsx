import React from "react";
// import Signup from "../components/Signup";
// import Login from "../components/Login";
// import Search from "../components/Search";

// home page function
const Home = () => {
  alert("home");
  return (
    <div className="container">
      <div className="box">
        <header></header>
        <form>
          <div className="form">
            <br></br>
            <br></br>
            <label className="boxtitle" for="box">Log On:</label>

            <label className="email" for="email">Email address:</label>
            <br />
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="form-group">
            <label className="password" for="pwd">Password:</label>
            <br />
            <input type="password" className="form-control" id="pwd" />
          </div>
          <div className="checkbox">
            <br />
            <label className="remember"><input type="checkbox" /> Remember me</label>
          </div>
          <br />
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
      <div className="box">
        <form>
          <div className="form">
            <label className="boxtitle" for="box">Sign Up:</label>
            <br></br>
            <div className="form-group">
              <label id="first-name-text" for="first-name">First name:</label>
              <label id="last-name-text" for="last-name">Last name:</label>
              <br></br>
              <input type="text" className="form-control" id="first-name" />
              <input type="text" className="form-control" id="last-name" />
            </div>
            <div className="form-group">
              <label className="email" for="email">Email address:</label>
              <br />
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="form-group">
              <label className="username" for="user">Username:</label>
              <br />
              <input type="password" className="form-control" id="pwd" />
            </div>
            <div className="form-group">
              <label className="password" for="pwd">Password:</label>
              <br />
              <input type="password" className="form-control" id="pwd" />
            </div>
            <br />
            <div className="requirements">
              <label className="requirements">Passwords must be at least 8 characters long, and contain at least one uppercase letter, lowercase letter, and number</label>
            </div>
          </div>
          <br />
          <button type="submit" className="btn btn-default">Submit</button>
          <br></br>
          <br></br>
          <br></br>
        </form>
      </div>
    </div>
  );
};

export default Home;
