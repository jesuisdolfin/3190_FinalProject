import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ContactUs = () => {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Send login details to backend
          const response = await fetch("http://localhost:8081/contactus", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, topic, message }),
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);
            return;
          }
          const { msg } = await response.json();
          console.log(msg);
        } catch (err) {
          console.log("Error submitting form");
        }
        alert("Submission received!");
      };
    
  return (
    <div className="container">
      <div id="header" className="row">
        <div className="col text-center mx-3">
          <h1 className="display-7 mt-md-7" style={{ fontFamily: "Verdana" }}>
            <strong>Contact Us</strong>
          </h1>
        </div>
      </div>

      <div
        id="col"
        className="border rounded"
        style={{ backgroundColor: "hwb(223 7% 64%)", marginTop: "20px" }}
      >
        <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
          <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
            <div
              className="my-3 py-3 border border-warning rounded"
              style={{ color: "white" }}
            >
              <h2 className="display-5">Get in Touch</h2>
              <p className="lead m-md-3">
                Have a question for a team member? In need of styling advice? We would love to hear from you! 
                Please fill out the form below to send us a message and we'll get back to you as soon as we can. 
                If there's a specific team member you want to hear back from, please include their name in the topic.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" required onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" required onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="topic" className="form-label">Topic</label>
                  <input type="text" className="form-control" id="topic" required onChange={(e) => setTopic(e.target.value)}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className="form-control" id="message" rows="3" required onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
                <button type="submit" className="btn btn-warning">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;