import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const Mens = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchMensCategories = async () => {
      try {
        const response = await fetch("http://localhost:8081/listCategories");
        if (!response.ok) {
          throw new Error("Failed to fetch men's categories");
        }
        const data = await response.json();
        const mensCategories = data.filter((category) =>
          category.gender.includes("m")
        );
        setCategories(mensCategories);
      } catch (error) {
        alert("Error fetching men's categories: " + error);
      }
    };

    fetchMensCategories();
  }, []);

  return (
    <div className="container">
      {/* Header Section */}
      <div id="header" className="row">
        <div className="col text-center mx-3">
          <h1 className="display-7 mt-md-7" style={{ fontFamily: "Verdana" }}>
            <strong>Men's Clothing</strong>
          </h1>
        </div>
      </div>

      {/* Categories Section */}
      <div
        id="col"
        className="border rounded"
        style={{
          backgroundColor: "hwb(223 7% 64%)",
          display: "flex",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  );
};

// Reusable CategoryCard Component
const CategoryCard = ({ category }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [category.image1, category.image2, category.image3];
  const captions = [category.img1cap, category.img2cap, category.img3cap];

  const handlePrev = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div style={{ flex: "1 1 20%", margin: "10px" }}>
      <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
        <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div className="my-3 py-3" style={{ color: "white" }}>
            <h2 className="display-5">{category.article}</h2>

            {/* Button container with flexbox to align buttons and images */}
  <div className="d-flex align-items-center justify-content-center">
    {/* Prev Button */}
    <button className="btn-dark-grey prev-btn btn" onClick={handlePrev}>
      ←
    </button>

    {/* Image */}
    <img
      src={images[currentImageIndex]}
      className="border border-warning rounded"
      alt={category.article}
      height="300px"
      width="200px"
      style={{ margin: "10px" }}
    />

    {/* Next Button */}
    <button className="btn-dark-grey next-btn btn" onClick={handleNext}>
      →
    </button>
  </div>

            <p className="caption">{captions[currentImageIndex]}</p>
            <p className="lead">{category.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mens;
