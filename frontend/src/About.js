import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  // Using useState to manage contacts state inside the component
  const [about, setAbout] = useState([]);
  const [date, setDate] = useState([]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    setDate(formattedDate);

  //   const fetchAbout = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8081/about");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch about page");
  //       }
  //       const data = await response.json();
  //       setAbout(data);
  //     } catch (error) {
  //       alert("There was an error loading about page: " + error);
  //     }
  //   };
  //   fetchAbout();
   }, []);

 return (
    <div className="container">
      <div id="header" className="row">
        <div className="col text-center mx-3">
          <h1 className="display-7 mt-md-7" style={{ fontFamily: "Verdana" }}>
            <strong>Meet Today's Team - {date}</strong>
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
            <div className="my-3 py-3 border border-warning rounded" style={{ color: "white" }}>
              <h2 className="display-5">Charlie Dolphin</h2>
              <p className="lead m-md-3">
                Charlie is dedicated to bringing comfort to the everyday lives of our customers. For
                concerns regarding comfort and product flexibility, Charlie can be personally
                reached at{" "}
                <strong className="text-warning">cpd@iastate.edu</strong>.
              </p>
            </div>
          </div>

          <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
            <div className="my-3 p-3 border border-warning rounded" style={{ color: "white" }}>
              <h2 className="display-5">Maurissa Higgins</h2>
              <p className="lead">
                Maurissa makes sure our customers are always dressed to impress. Concerns regarding
                product design can be directed to Maurissa at{" "}
                <strong className="text-warning">maukhigs@iastate.edu</strong>.
              </p>
            </div>
          </div>

          <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
            <div className="my-3 py-3 border border-warning rounded" style={{ color: "white" }}>
              <h2 className="display-5">Our Sponsors</h2>
              <p className="lead">
                American Cardinal is thankful to all our sponsors from{" "}
                <strong className="text-warning">
                  SE/ComS3190 Construction of User Interfaces, Fall 2024
                </strong>{" "}
                and extends special acknowledgments to the inspiration of our designs,{" "}
                <strong className="text-warning">Dr. Abraham N. Aldaco-Gastelum</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;