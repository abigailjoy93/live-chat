import React from "react";
import logoTransparent from "../assets/new-live-chat-logo.png";
function Footer() {
    return (
        <footer className=" footer text-center text-lg-start">
            <div className="container d-flex justify-content-center">
                <img class="logo" src={logoTransparent} alt="live chat logo"></img>
            </div>
        </footer>
    );
}

export default Footer; 