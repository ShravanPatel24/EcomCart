import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ProductList.css";

function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "15%",
          fontWeight: "bolder",
          fontSize: "40px",
        }}
      >
        Please wait while products are fetched...
      </div>
    );
  }

  return (
    <div>
      <h1>Products</h1>
      <ul className="ul">
        {products.map((product) => (
          <li key={product.id} className="li">
            <Link to={`/products/${product.id}`}>{product.title}</Link>
            <img src={product.image} alt={product.title} className="img" />
            <button onClick={() => addToCart(product)} className="button">
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
