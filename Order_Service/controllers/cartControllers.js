const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");

// @desc Add item to cart
// @route POST /api/cart
const addItem = asyncHandler(async(req,res) => {
    const {customerId, restaurantId, item} = req.body;

    if(!customerId || !restaurantId || !item) {
        res.status(400);
        throw new Error("customerId, restaurantId and item are required");
    }

    // find if a cart already exists for this customer + restaurant
    let cart = await Cart.findOne({customerId, restaurantId});

    if(!cart) {
        // No cart found, then create new cart
        cart = new Cart({
            customerId,
            restaurantId,
            items: [item],
            totalAmount: item.quantity * (item.price || 0),
        });
    } else {
        // cart found, then add or update item
        const existingItem  = cart.items.find(i => i.itemId === item.itemId);

        if(existingItem) {
            // item already exists, then update quantity
            existingItem.quantity += item.quantity;
        } else {
            // new item, then push to items array
            cart.items.push(item);
        }

        // recalculate total amount
        cart.totalAmount = cart.items.reduce(
            (sum, i) => sum + i.quantity * (i.price || 0),
            0
        );
    }

    await cart.save();

    res.status(200).json({
        message: "Item added to cart successfully",
        cart
    });
});

// @desc View all carts
// @route GET /api/cart
const getCarts = asyncHandler(async(req,res) => {
    res.status(200).json({message: "Get all carts"});
});

// @desc View cart by restaurant
// @route GET /api/cart/:rid
const getCart = asyncHandler(async(req,res) => {
    res.status(200).json({message: `Get cart for ${req.params.rid}`});
});

// @desc Update cart(restaurant)
// @route PUT /api/cart/:rid
const updateCart = asyncHandler(async(req,res) => {
    res.status(200).json({message: `Update cart for ${req.params.rid}`});
});

// @desc Clear a restaurant's cart
// @route DELETE /api/cart/:rid
const clearCart = asyncHandler(async(req,res) => {
    res.status(200).json({message: `Clear cart for ${req.params.rid}`});
});

// @desc Remove item from cart
// @route DELETE /api/cart/:rid/:iid
const removeItem = asyncHandler(async(req,res) => {
    res.status(200).json({message: `Remove item for ${req.params.iid}`});
});



module.exports = {
    addItem,
    getCarts,
    getCart,
    updateCart,
    removeItem,
    clearCart
};