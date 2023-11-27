import React from "react";
import { useNavigate } from "react-router-dom";
import strictlyLogo from "../assets/strictly_logo.png";
import liveChatWords from "../assets/live_chat_words.png";
import Auth from "../utils/auth";
import Search from "./Search";

function Header() {
  // profile --> temp link to force nav until auth is fixed
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
        <button className="nav-btn" onClick={routeChange}>
          Profile
        </button>
        <button className="nav-btn" onClick={logout}>
          Logout
        </button>
        {/* <a className="navbar-brand" href="#">
          They do not like the images in the header
          width="90" height="50" alt=""
          <img src={strictlyLogo} ></img>
          width="110" height="50" alt=""
          <img src={liveChatWords} > </img>
        </a> */}
        {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {Auth.loggedIn() ? (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  My Profile{" "}
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Logout
                </a>
              </li>
            </ul>
          ) : (
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              ></input>
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          )}
        </div> */}
      </nav>
      <Search />
    </header>
  );
}
export default Header;
