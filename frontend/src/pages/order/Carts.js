import React, { useEffect, useState } from "react";
import axios from "axios";

const Carts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get customerId
  //const customerId = localStorage.getItem("customerId"); // e.g., "cus001"
  const customerId = 'cus001'; 

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        if (!customerId) {
          setError("Customer ID not found. Please login.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:8089/api/cart/${customerId}`);
        setCarts(response.data);
      } catch (err) {
        console.error("Error fetching carts:", err);
        setError("Failed to load carts.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, [customerId]);

  if (loading) return <p>Loading your carts...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>My Carts</h2>
      {carts.length === 0 ? (
        <p>No carts found.</p>
      ) : (
        carts.map((cart) => (
          <div
            key={cart._id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
              borderRadius: "10px"
            }}
          >
            <h3>Restaurant ID: {cart.restaurantId}</h3>
            <h4>Total Amount: Rs. {cart.totalAmount}</h4>
            <ul>
              {cart.items.map((item) => (
                <li key={item.itemId}>
                  Item ID: {item.itemId} | Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Carts;
