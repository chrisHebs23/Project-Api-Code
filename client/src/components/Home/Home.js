import React, { useState, useEffect } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products");
      const jsonData = await response.json();

      setProducts(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div>Slider</div>
      <div>
        {products.map((product, index) => {
          return (
            <div>
              <p key={index}>{product.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
