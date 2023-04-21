import React, { useState, useEffect } from "react";
import "./Cart.css";

function Cart({
  cartItems,
  removeItemFromCart,
  updateItemQuantity,
  calculateTotalPrice,
}) {
  const [cartData, setCartData] = useState([]);

  // Load cart data from local storage when the component mounts
  useEffect(() => {
    const data = localStorage.getItem("cartData");
    console.log(data);
    if (data) {
      setCartData(JSON.parse(data));
    }
  }, []);

  // Save cart data to local storage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  if (cartItems.length === 0) {
    return <div>No items in cart.</div>;
  }

  return (
    <div>
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th className="th">Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(event) =>
                    updateItemQuantity(item.id, event.target.value)
                  }
                />
              </td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => removeItemFromCart(item.id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Price: {calculateTotalPrice()}</p>
    </div>
  );
}

export default Cart;
