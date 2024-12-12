import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./About";
import Men from "./Men";
import Women from "./Women";
import Navbar from "./Navbar";
import Shop from "./Shopping";
import Authentication from "./Login";
import ContactUs from "./ContactUs";
import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState("");

  const resetCart = () => setCart([]);
  // Toggle cart visibility
  const toggleCart = () => {
    setShowCart((prevState) => !prevState);
  };

  // Toggle login modal visibility
  const toggleLogin = () => {
    console.log("Toggling login modal...");
    setShowLogin((prevState) => !prevState);
  };

  const handleLogin = (username) => {
    setUsername(username);
  };

  // Add item to the cart
  const addToCart = (item) => {
    const itemExists = cart.find(
      (cartItem) => cartItem.article === item.article
    );
    if (itemExists) {
      setCart(
        cart.map((cartItem) =>
          cartItem.article === item.article
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from the cart
  const removeFromCart = (item) => {
    setCart(cart.filter((cartItem) => cartItem.article !== item.article));
  };

  // Recalculate cart total when cart items change
  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setCartTotal(total);
  }, [cart]);

  return (
    <Router>
      <div className="d-flex flex-column vh-100">
        <Navbar toggleCart={toggleCart} toggleLogin={toggleLogin} />
        <Authentication
          showLogin={showLogin}
          toggleLogin={toggleLogin}
          setUserRole={setUserRole}
        />
        <div>
          <p>User Role: {userRole}</p>
        </div>

        <div
          className="flex-grow-1 bg-light p-4"
          style={{ marginTop: "70px", marginBottom: "70px" }}
        >
          {showCart && (
            <div
              style={{
                position: "fixed",
                top: "70px",
                right: 0,
                left: 0,
                zIndex: 1000,
              }}
            >
              <Shop
                cart={cart}
                cartTotal={cartTotal}
                removeFromCart={removeFromCart}
                showCart={showCart}
                resetCart={resetCart}
                toggleCart={toggleCart}
              />
            </div>
          )}

          <div className="row justify-content-center">
            <div className="position-relative overflow-hidden p-md-3 m-md-3 text-center bg-body-tertiary border border-dark rounded">
              <div className="col-md-auto">
                <img
                  src="./images/logo.png"
                  alt="logo"
                  width="250px"
                  style={{
                    opacity: 0.5,
                    filter: "alpha(opacity=50)",
                    margin: "auto",
                  }}
                />
              </div>
              <div className="col-md-auto">
                <h1
                  className="fw-normal text-muted mx-0 custom_color"
                  style={{
                    margin: "0px",
                    fontFamily: "Verdana",
                    fontSize: "76px",
                  }}
                >
                  American Cardinal
                </h1>
                <h3
                  className="fw-normal text-muted mx-0"
                  style={{
                    margin: "0px",
                    fontFamily: "Verdana",
                    fontSize: "30px",
                  }}
                >
                  Top-Notch design, comfort, and style
                </h3>
              </div>
            </div>
          </div>

          <div className="container">
            <Routes>
              <Route path="/" element={<Navigate to="/about" replace />} />
              <Route path="/about" element={<About />} />
              <Route path="/men" element={<Men addToCart={addToCart} />} />
              <Route path="/women" element={<Women addToCart={addToCart} />} />
              <Route path="/contactus" element={<ContactUs />} />
            </Routes>
          </div>
        </div>

        <footer className="bg-dark text-light text-center py-3">
          <p className="mb-0">
            Follow us on Instagram to see the latest products & styling tips:{" "}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
