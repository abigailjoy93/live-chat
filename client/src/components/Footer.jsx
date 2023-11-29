import React from "react";
import logoTransparent from "../assets/astronaut-logo.png";
import("../App.css");

function Footer() {
  return (
    <footer className="footer">
      <img className="logo" src={logoTransparent} alt="live chat logo"></img>
    </footer>
  );
}

export default Footer;
