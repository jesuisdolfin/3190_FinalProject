import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Shop = ({ cart, cartTotal, removeFromCart, showCart, resetCart, toggleCart }) => {
  const handleCheckout = () => {
    alert(`Your total is $${cartTotal}. Thank you for shopping!`);
    resetCart(); // Resets the cart
    toggleCart(); // Closes the cart view
  };

  const cartItems = cart.map((el, index) => (
    <div
      className="d-flex align-items-center justify-content-between py-2"
      key={index}
    >
      <div className="d-flex align-items-center">
        <img
          className="img-fluid"
          src={el.image}
          alt={el.article}
          width={50}
          height={50}
        />
        <div className="ms-2">
          <div className="text-muted">{el.article}</div>
          <div>
            ${el.price} x {el.quantity}
          </div>
        </div>
      </div>
      <button
        className="btn btn-outline-danger btn-sm"
        onClick={() => removeFromCart(el)}
      >
        Remove
      </button>
    </div>
  ));

  return (
    <div>
      {showCart && (
        <div
          className="card shadow-lg"
          style={{
            position: "fixed",
            top: "70px",
            right: "20px",
            zIndex: 1000,
            width: "400px",
            maxHeight: "80vh",
            overflowY: "auto",
            borderRadius: "10px",
          }}
        >
          <div className="card-body">
            <h4 className="text-center mb-3">Your Cart</h4>
            <div className="d-flex justify-content-between mb-3">
              <div className="text-muted">Products selected: {cart.length}</div>
              <div className="text-muted">Total: ${cartTotal}</div>
            </div>

            {cartItems}
            <button
              className="btn btn-dark w-100 mt-3"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
