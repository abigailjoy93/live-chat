import React from "react";
import strictlyLogo from "../assets/strictly_logo.png";
import liveChatWords from "../assets/live_chat_words.png";

function Header() {
    return (
        <header>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">
                    {/* They do not like the images in the header */}
                    {/* width="90" height="50" alt="" */}
                    {/* <img src={strictlyLogo} ></img> */}
                    {/* width="110" height="50" alt="" */}
                    {/* <img src={liveChatWords} > </img> */}
                </a>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">My Profile </a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Logout</a>
                        </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </header>
    );
}
export default Header;