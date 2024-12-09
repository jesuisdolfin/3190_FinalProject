import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./About";
import Men from "./Men";
import Women from "./Women";
import Navbar from "./Navbar.js";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column vh-100">
        <Navbar />
        <div className="flex-grow-1 bg-light p-4" style={{ marginTop: "70px", marginBottom: "70px" }}>
          <div className="container">
            <div className="position-relative overflow-hidden p-md-3 m-md-3 text-center bg-body-tertiary border border-dark rounded">
              <div className="row justify-content-center">
                <div className="col-md-auto">
                  <img
                    src="/images/logo.png"
                    alt="logo"
                    width="250px"
                    style={{ opacity: 0.5, filter: "alpha(opacity=50)", margin: "auto" }}
                  />
                </div>
                <div className="col-md-auto">
                  <h1
                    className="fw-normal text-muted mx-0 custom_color"
                    style={{ margin: 0, fontFamily: "Verdana", fontSize: "76px" }}
                  >
                    American Cardinal
                  </h1>
                  <h3
                    className="fw-normal text-muted mx-0"
                    style={{ margin: 0, fontFamily: "Verdana", fontSize: "30px" }}
                  >
                    Top-Notch design, comfort, and style
                  </h3>
                </div>
              </div>
            </div>
            <Routes>
              <Route
                path="/"
                element={<div className="text-center text-secondary">Welcome to the Contacts App!</div>}
              />
              <Route path="/about" element={<About />} />
              <Route path="/men" element={<Men />} />
              <Route path="/women" element={<Women />} />
            </Routes>
          </div>
        </div>
        <footer className="bg-dark text-light text-center py-3">
          <p className="mb-0">
            Follow us on Instagram to see the latest products & styling tips:{" "}
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-light">
              <i className="fab fa-instagram"></i>
            </a>
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
