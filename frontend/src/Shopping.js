import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Shop = ({ cart, cartTotal, removeFromCart, showCart }) => {
  const cartItems = cart.map((el, index) => (
    <div className="d-flex align-items-center justify-content-between py-2" key={index}>
      <div className="d-flex align-items-center">
        <img className="img-fluid" src={el.image} alt={el.article} width={50} height={50} />
        <div className="ms-2">
          <div className="text-muted">{el.article}</div>
          <div>${el.price} x {el.quantity}</div>
        </div>
      </div>
      <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(el)}>Remove</button>
    </div>
  ));

  return (
    <div>
      {/* Conditionally render the Cart Modal based on showCart */}
      {showCart && (
        <div
          className="card shadow-lg"
          style={{
            position: "fixed",
            top: "70px", // Right underneath the navbar
            right: "20px", // Added 20px margin from the right edge
            zIndex: 1000,
            width: "400px", // Modal width
            maxHeight: "80vh", // Prevents it from getting too tall
            overflowY: "auto", // Enables scroll for long lists
            borderRadius: "10px", // Rounded all corners
          }}
        >
          <div className="card-body">
            <h4 className="text-center mb-3">Your Cart</h4>
            <div className="d-flex justify-content-between mb-3">
              <div className="text-muted">Products selected: {cart.length}</div>
              <div className="text-muted">Total: ${cartTotal}</div>
            </div>

            {/* Cart Items List */}
            {cartItems}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
