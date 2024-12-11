import React, { useState, useEffect } from "react";
import "./index.css"

const Women = ({ addToCart }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchWomensCategories = async () => {
      try {
        const response = await fetch("http://localhost:8081/listCategories");
        if (!response.ok) {
          throw new Error("Failed to fetch women's categories");
        }
        const data = await response.json();
        const womensCategories = data.filter((category) =>
          category.gender.includes("w")
        );
        setCategories(womensCategories);
      } catch (error) {
        alert("Error fetching women's categories: " + error);
      }
    };

    fetchWomensCategories();
  }, []);

  return (
    <div className="container">
      <div id="header" className="row">
        <div className="col text-center mx-3">
          <h1 className="display-7 mt-md-7" style={{ fontFamily: "Verdana" }}>
            <strong>Women's Clothing</strong>
          </h1>
        </div>
      </div>

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
          <CategoryCard
            key={index}
            category={category}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

const CategoryCard = ({ category, addToCart }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [category.image1, category.image2, category.image3];
  const captions = [category.img1cap, category.img2cap, category.img3cap];
  const prices = [category.img1price, category.img2price, category.img3price];

  const handlePrev = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleAddToCart = () => {
    const cartItem = {
      article: category.article,
      description: category.description,
      image: images[currentImageIndex],
      price: prices[currentImageIndex],
      quantity: 1, // Default quantity is 1
    };

    addToCart(cartItem);
    alert(`${category.article} added to cart!`);
  };

  return (
    <div style={{ flex: "1 1 20%", margin: "10px" }}>
      <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
        <div className="text-bg-dark me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
          <div
            className="my-3 py-3 d-flex align-items-center justify-content-center"
            style={{ color: "white" }}
          >
            <h2 className="display-5">{category.article}</h2>
          </div>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ marginTop: "15px" }}
          >
            <button
              className="btn-dark-grey"
              onClick={handlePrev}
              style={{
                minWidth: "40px",
                fontSize: "18px",
              }}
            >
              ←
            </button>
            <img
              src={images[currentImageIndex]}
              className="border border-warning rounded mx-2"
              alt={category.article}
              height="300px"
              width="200px"
              style={{ objectFit: "cover" }}
            />
            <button
              className="btn-dark-grey"
              onClick={handleNext}
              style={{
                minWidth: "40px",
                fontSize: "18px",
              }}
            >
              →
            </button>
          </div>
          <div className="text-center mt-2">
            
            <p className="caption">{captions[currentImageIndex]} - ${prices[currentImageIndex]}</p>
            <p className="lead">{category.description}</p>

            {/* Add to Cart Button */}
            <button
              className="btn-dark-grey"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Women;
