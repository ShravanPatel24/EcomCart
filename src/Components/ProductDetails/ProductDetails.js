import React from "react";
import "./ProductDetails.css";

function ProductDetail({ product, addToCart }) {
  if (!product) {
    return <div>No results found.</div>;
  }

  return (
    <div className="product-container">
      <h1 className="h1">{product.title}</h1>
      <p className="p">{product.description}</p>
      <p className="p">Price: {product.price}</p>
      <button className="button" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetail;
