import React, { useState } from "react";

const Authentication = ({ showLogin, toggleLogin, setUserRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login details to backend
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        return;
      }

      const { message } = await response.json();
      console.log(message);
      alert(`Welcome, ${username}! You have logged in successfully.`);

      setUserRole("user");
      toggleLogin();
    } catch (err) {
      console.log("Failed to log in. Please try again." + err);
      setError("Failed to log in. Please try again. " + err);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    try {
      // Ensure both username and password are included in the request body
      const response = await fetch(`http://localhost:8081/login/${username}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password, // Include the new password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update"); // Check for a message or use a default error
        return;
      }

      const updatedUser = await response.json();
      console.log("Updated User:", updatedUser);
      alert(`User ${username} has been updated successfully.`);

      setUserRole("user");
      toggleLogin();
    } catch (err) {
      console.log("Failed to update user. Please try again." + err);
      setError("Failed to update user. Please try again. " + err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault(); // Move this to the beginning
    let username = document.getElementById("username").value;
    console.log(username);

    try {
      const response = await fetch(`http://localhost:8081/login/${username}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const responseData = await response.json(); // Call json() only once

      if (!response.ok) {
        setError(responseData.error); // Use the parsed response data
        return;
      }

      console.log("Message: " + responseData.message);
      alert(`You have deleted ${username} successfully.`);

      setUserRole("user");
      toggleLogin();
    } catch (err) {
      console.log("Failed to delete. Please try again." + err);
      setError("Failed to delete. Please try again. " + err);
    }
  };

  return (
    <div
      className={`modal fade show ${showLogin ? "d-block" : ""}`}
      style={{ display: showLogin ? "block" : "none", zIndex: 1050 }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Shopper Information</h5>
            <button
              type="button"
              className="btn-close"
              onClick={toggleLogin} // Close the modal
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <button type="submit" className="modal-login-btn">
                Register
              </button>
              <button onClick={handleChange} className="modal-login-btn">
                Edit User
              </button>
              <button onClick={handleDelete} className="modal-login-btn">
                Delete User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
