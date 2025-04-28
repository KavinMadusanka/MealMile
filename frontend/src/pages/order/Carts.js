import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use navigate instead of useHistory
import '../../components/style/carts.css'

const Carts = () => {
    const [carts, setCarts] = useState([]);
    const navigate = useNavigate(); // Initialize navigate

    // Fetch carts for the customer (replace with actual customer ID)
    const fetchCarts = async () => {
        // const customerId = localStorage.getItem("customerId");
        const cid = 'cus001'; // Example customer ID
        const res = await fetch(`http://localhost:8089/api/cart/${cid}`);
        const data = await res.json();
        setCarts(data);
    };

    useEffect(() => {
        fetchCarts();
    }, []);

    // Navigate to Cart.js when a cart is clicked
    const viewCart = (cid, rid) => {
        navigate(`/cart/${cid}/${rid}`); // Use navigate for routing
    };

    return (
        <div>
            <h2>Your Carts</h2>
            <div className="cart-list">
                {carts.map((cart) => (
                    <div 
                        key={cart.cartId} 
                        className="cart-container" 
                        onClick={() => viewCart(cart.customerId, cart.restaurantId)}
                    >
                        <h3>Restaurant: {cart.restaurantId}</h3>
                        {/* Items */}
                        <div className="cart-items">
                            {cart.items && cart.items.length > 0 ? (
                                cart.items.map((item, index) => (
                                    <p key={index}>
                                        • Item: {item.itemId} × {item.quantity}
                                    </p>
                                ))
                            ) : (
                                <p>No items in cart</p>
                            )}
                        </div>

                        {/* Total Amount */}
                        <div className="cart-total">
    <span>Total</span>
    <span>Rs. {cart.totalAmount.toFixed(2)}</span>
</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carts;
