import React from "react";
import logoTransparent from "../assets/astronaut-logo.png";
import("../app2.css");

function Footer() {
  return (
    <footer className=" footer text-center text-lg-start">
      <div className="container d-flex justify-content-center">
        <footer>
          <div>
            <div>
              <img className="logo" src={logoTransparent} alt="live chat logo"></img>
            </div>
          </div>
        </footer>
      </div>
    </footer>
  );
}

export default Footer;
