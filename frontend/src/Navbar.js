import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ toggleCart, toggleLogin }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <button onClick={toggleLogin}>Who's Shopping?</button>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/men">
                Men
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/women">
                Women
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contactus">
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="ms-auto">
            <button
              className="btn btn-outline-light d-flex align-items-center"
              style={{ padding: "0.15rem" }}
              onClick={toggleCart}
            >
              <img
                src="/images/carticon.png"
                alt="Shopping Cart"
                style={{ width: "36px", height: "36px" }}
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
