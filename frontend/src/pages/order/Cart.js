import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import '../../components/style/cartDetails.css';
import Layout from '../../components/Layout/Layout';

const Cart = () => {
    const [cartDetails, setCartDetails] = useState(null);
    const [phoneNo, setPhoneNo] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [quantities, setQuantities] = useState({});
    const { cid, rid } = useParams();
    const navigate = useNavigate();

    const fetchCartDetails = async () => {
        try {
            const res = await fetch(`http://localhost:8089/api/cart/${cid}/${rid}`);
            if (!res.ok) throw new Error('Failed to fetch cart details');
            const data = await res.json();
            setCartDetails(data);

            // Initialize quantities for input fields
            if (data.items) {
                const qtyMap = {};
                data.items.forEach(item => {
                    qtyMap[item.itemId] = item.quantity;
                });
                setQuantities(qtyMap);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const deleteItem = async (itemId) => {
        const confirmDelete = window.confirm('Are you sure you want to remove this item from your cart?');
        if (!confirmDelete) return;
    
        try {
            const res = await fetch(`http://localhost:8089/api/cart/${cid}/${rid}/${itemId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchCartDetails();
            } else {
                console.error('Failed to delete item');
            }
        } catch (error) {
            console.error(error.message);
        }
    };    

    const updateQuantity = async (itemId, newQuantity) => {
        try {
            const res = await fetch(`http://localhost:8089/api/cart/${cid}/${rid}/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });
            if (res.ok) {
                fetchCartDetails();
            } else {
                console.error('Failed to update quantity');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const placeOrder = async () => {
        if (!phoneNo.trim()) {
            alert('Please enter a phone number');
            return;
        }
        if (!deliveryAddress.trim()) {
            alert('Please enter a delivery address');
            return;
        }

        if (!cartDetails?._id) {
            alert('Cart ID not found');
            return;
        }

        try {
            const res = await fetch(`http://localhost:8089/api/orders/${cartDetails._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNo, deliveryAddress }),
            });

            if (res.ok) {
                alert('Order placed successfully!');
                navigate('/carts');
            } else {
                console.error('Failed to place the order');
                alert('Something went wrong. Please try again later.');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchCartDetails();
    }, [cid, rid]);

    return (
        <Layout>
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
                                                    value={quantities[item.itemId] || 1}
                                                    min="1"
                                                    onChange={(e) => {
                                                        const newQuantities = { ...quantities };
                                                        newQuantities[item.itemId] = parseInt(e.target.value, 10);
                                                        setQuantities(newQuantities);
                                                    }}
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
                            <p><strong>Total Amount: </strong>Rs. {cartDetails.totalAmount.toFixed(2)}</p>
                        </div>

                        {/* Phone Number and Delivery Address */}
                        <div className="order-form">
                            <h4>Enter Phone Number</h4>
                            <input
                                type="text"
                                placeholder="Enter your phone number"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    marginBottom: '15px'
                                }}
                            />

                            <h4>Enter Delivery Address</h4>
                            <textarea
                                placeholder="Enter your delivery address"
                                value={deliveryAddress}
                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                rows="4"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    marginBottom: '20px'
                                }}
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
        </Layout>
    );
};

export default Cart;
