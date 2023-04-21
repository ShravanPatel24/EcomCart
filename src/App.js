import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

import ProductList from "./Components/ProductList/ProductList";
import ProductDetail from "./Components/ProductDetails/ProductDetails";
import Cart from "./Components/Cart/Cart";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      const newCartItem = { ...product, quantity: 1 };
      setCartItems([...cartItems, newCartItem]);
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartItems, newCartItem])
      );
    }
  };

  const removeItemFromCart = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const updateItemQuantity = (id, quantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: parseInt(quantity) };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );
    return totalPrice.toFixed(2);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart ({cartItems.length})</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <ProductList addToCart={addToCart} products={products} />
          </Route>
          <Route path="/products/:id">
            {({ match }) => {
              const productId = parseInt(match.params.id);
              const product = cartItems.find((item) => item.id === productId);
              return <ProductDetail product={product} addToCart={addToCart} />;
            }}
          </Route>
          <Route path="/cart">
            <Cart
              cartItems={cartItems}
              removeItemFromCart={removeItemFromCart}
              updateItemQuantity={updateItemQuantity}
              calculateTotalPrice={calculateTotalPrice}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
