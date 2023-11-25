import React from "react";
import strictlyLogo from "../assets/strictly_logo.png";
import liveChatWords from "../assets/live_chat_words.png";

function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    {/* They do not like the images in the header */}
                    {/* width="90" height="50" alt="" */}
                    {/* <img src={strictlyLogo} ></img> */}
                    {/* width="110" height="50" alt="" */}
                    {/* <img src={liveChatWords} > </img> */}
                </a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">My Profile </a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Logout</a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </header>
    );
}
export default Header;