const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true,
    },
    restaurantId: {
        type: String,
        required: true,
    },
    items: [
        {
            itemId: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        default: 0,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);