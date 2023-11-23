import React from "react";
import logoTransparent from "../assets/astronaut-logo.png";
function Footer() {
  return (
    <footer className=" footer text-center text-lg-start">
      <div className="container d-flex justify-content-center">
        <footer>
          <div>
            <div>
              <img class="logo" src={logoTransparent} alt="live chat logo"></img>
            </div>
          </div>
        </footer>
      </div>
    </footer>
  );
}
export default Footer;
