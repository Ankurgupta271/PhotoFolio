import React from "react";
import logo from "./logo.png";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <img src={logo} alt="PhotoFolio Logo" className="logo" />
    <h1>PhotoFolio</h1>
  </nav>
);

export default Navbar;