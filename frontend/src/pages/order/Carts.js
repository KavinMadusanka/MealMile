import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import '../../components/style/carts.css';
import Layout from '../../components/Layout/Layout';

const Carts = () => {
    const [carts, setCarts] = useState([]);
    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem('auth'));
    const cid = userInfo?.user?.id;

    const fetchCarts = async () => {
        if (!cid) {
            console.error('No customer ID found');
            return;
        }

        try {
            const res = await fetch(`http://localhost:8089/api/cart/${cid}`);
            if (!res.ok) throw new Error('Failed to fetch carts');
            const data = await res.json();

            // Enrich each cart
            const enrichedCarts = await Promise.all(
                data.reverse().map(async (cart) => {
                    // Fetch restaurant name
                    let restaurantName = 'Unknown Restaurant';
                    try {
                        const res = await fetch(`http://localhost:8086/api/v1/auth/getSingleUser/${cart.restaurantId}`);
                        if (res.ok) {
                            const resData = await res.json();
                            restaurantName = resData.user?.name || 'Unknown Restaurant';
                        }
                    } catch (e) {
                        console.error(`Error fetching restaurant ${cart.restaurantId}:`, e);
                    }

                    // Fetch menu item details
                    const enrichedItems = await Promise.all(
                        cart.items.map(async (item) => {
                            try {
                                const itemRes = await fetch(`http://localhost:8086/api/v1/menuItem/getItem/${item.itemId}`);
                                if (!itemRes.ok) throw new Error('Failed to fetch item');
                                const itemData = await itemRes.json();
                                return {
                                    ...item,
                                    name: itemData.item?.name || 'Unknown Item',
                                    price: itemData.item?.price || 'N/A',
                                };
                            } catch (e) {
                                console.error(`Error fetching item ${item.itemId}:`, e);
                                return {
                                    ...item,
                                    name: 'Unknown Item',
                                    price: 'N/A',
                                };
                            }
                        })
                    );

                    const calculatedTotal = enrichedItems.reduce((sum, item) => {
                        const price = parseFloat(item.price);
                        const quantity = parseInt(item.quantity);
                        return sum + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity);
                    }, 0);

                    return {
                        ...cart,
                        items: enrichedItems,
                        totalAmount: calculatedTotal,
                        restaurantName,
                    };
                })
            );

            setCarts(enrichedCarts);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchCarts();
    }, []);

    const viewCart = (cid, rid) => {
        navigate(`/cart/${cid}/${rid}`);
    };

    const deleteCart = async (cid, rid) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this cart?');
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:8089/api/cart/${cid}/${rid}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                alert('Cart deleted successfully!');
                fetchCarts();
            } else {
                console.error('Failed to delete cart');
                alert('Failed to delete the cart. Please try again.');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <Layout>
            <div>
                <h2>My Carts</h2>
                <div className="cart-list">
                    {carts.map((cart) => (
                        <div
                            key={cart.cartId}
                            className="cart-container"
                            onClick={() => viewCart(cart.customerId, cart.restaurantId)}
                            style={{ position: 'relative' }}
                        >
                            <FaTrash
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    color: '#D32F2F',
                                    cursor: 'pointer',
                                    zIndex: 1,
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteCart(cart.customerId, cart.restaurantId);
                                }}
                            />

                            <h3>Restaurant: {cart.restaurantName}</h3>

                            {/* Items */}
                            <div className="cart-items">
                                {cart.items && cart.items.length > 0 ? (
                                    cart.items.map((item, index) => (
                                        <p key={index}>
                                            • {item.name} × {item.quantity} ({item.price !== 'N/A' ? `Rs. ${item.price}` : 'N/A'})
                                        </p>
                                    ))
                                ) : (
                                    <p>No items in cart</p>
                                )}
                            </div>

                            {/* Total */}
                            <div className="cart-total">
                                <span>Total</span>
                                <span>Rs. {cart.totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Carts;
