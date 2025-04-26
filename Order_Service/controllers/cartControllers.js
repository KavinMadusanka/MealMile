const asyncHandler = require("express-async-handler");

// @desc Add item to cart
// @route POST /api/cart
const addItem = asyncHandler(async(req,res) => {
    res.status(200).json({message: "Add item"});
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