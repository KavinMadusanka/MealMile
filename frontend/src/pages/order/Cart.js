import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import '../../components/style/cartDetails.css';

const Cart = () => {
    const [cartDetails, setCartDetails] = useState(null);
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const { cid, rid } = useParams(); // Get cid and rid from URL params

    // Fetch the cart details based on cid and rid
    const fetchCartDetails = async () => {
        const res = await fetch(`http://localhost:8089/api/cart/${cid}/${rid}`);
        const data = await res.json();
        setCartDetails(data);
    };

    // Handle deleting an item from the cart
    const deleteItem = async (itemId) => {
        const res = await fetch(`http://localhost:8089/api/cart/${cid}/${rid}/${itemId}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            fetchCartDetails();
        } else {
            console.error('Failed to delete item');
        }
    };

    // Handle updating the quantity of an item
    const updateQuantity = async (itemId, newQuantity) => {
        const res = await fetch(`http://localhost:8089/api/cart/${cid}/${rid}/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity: newQuantity,
            }),
        });

        if (res.ok) {
            fetchCartDetails();
        } else {
            console.error('Failed to update quantity');
        }
    };

    // Handle placing the order
    const placeOrder = async () => {
        if (!deliveryAddress.trim()) {
            alert('Please enter a delivery address');
            return;
        }

        const orderData = {
            cartId: cid,
            customerId: 'customer-id-placeholder', // Replace with actual customer ID logic
            restaurantId: rid,
            items: cartDetails.items.map(item => ({
                itemId: item.itemId,
                quantity: item.quantity,
            })),
            totalAmount: cartDetails.totalAmount,
            deliveryAddress,
        };

        const res = await fetch(`http://localhost:8089/api/orders/${cid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (res.ok) {
            alert('Order placed successfully!');
        } else {
            console.error('Failed to place the order');
            alert('Something went wrong. Please try again later.');
        }
    };

    useEffect(() => {
        fetchCartDetails();
    }, [cid, rid]); // Fetch when cid or rid changes

    return (
        <div className="cart-content">
            <h2>Cart Details</h2>
            {cartDetails ? (
                <div>
                    <h4>Items:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartDetails.items && cartDetails.items.length > 0 ? (
                                cartDetails.items.map((item) => (
                                    <tr key={item.itemId}>
                                        <td>{item.itemId}</td>
                                        <td>
                                            <input
                                                type="number"
                                                defaultValue={item.quantity}
                                                min="1"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        const newQuantity = parseInt(e.target.value, 10);
                                                        if (newQuantity >= 1) {
                                                            updateQuantity(item.itemId, newQuantity);
                                                        }
                                                    }
                                                }}
                                                style={{ width: '60px' }}
                                            />
                                        </td>
                                        <td>{item.price || 'N/A'}</td>
                                        <td>
                                            <FaTrash
                                                onClick={() => deleteItem(item.itemId)}
                                                style={{ color: '#D32F2F', cursor: 'pointer' }}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No items in the cart.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="total">
                        <p><strong>Total Amount: </strong>{cartDetails.totalAmount}</p>
                    </div>

                    {/* Delivery Address and Place Order */}
                    <div className="delivery-address">
                        <h4>Enter Delivery Address</h4>
                        <textarea
                            placeholder="Enter your delivery address"
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            rows="4"
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                        />
                        <button
                            className="place-order-btn"
                            onClick={placeOrder}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            ) : (
                <p>Loading cart details...</p>
            )}
        </div>
    );
};

export default Cart;
