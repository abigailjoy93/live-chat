import React from "react";
import { useNavigate, Link } from "react-router-dom";
import strictlyLogo from "../assets/strictly_logo.png";
import Auth from "../utils/auth";
import Search from "./Search";

function Header() {
  // profile --> can this be optimized?
  let navigate = useNavigate();

  const profileRoute = () => {
    let path = `/profile`;
    navigate(path);
  };

  const joinRoute = () => {
    let path = `/join`;
    navigate(path);
  };

  // logout
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <nav className="nav">
        <div>
          <img className="nav-icon" src={strictlyLogo}></img>
        </div>
        {Auth.loggedIn() ? (
          <>
            <button className="nav-btn" onClick={profileRoute}>
              Profile
            </button>
            <button className="nav-btn" onClick={joinRoute}>
              Join chat!
            </button>
            <button className="nav-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <></>
        )}
      </nav>
      <Search />
    </header>
  );
}
export default Header;
