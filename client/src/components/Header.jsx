import React from "react";
import { useNavigate, Link } from "react-router-dom";
import strictlyLogo from "../assets/strictly_logo.png";
import Auth from "../utils/auth";
import Search from "./Search";

function Header() {
  // profile --> can this be optimized?
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/profile`;
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
            <button className="nav-btn" onClick={routeChange}>
              Profile
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
