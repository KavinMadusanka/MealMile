const express = require("express");
const { addItem, getCarts, getCart, updateCart, clearCart, removeItem } = require("../controllers/cartControllers");
const router = express.Router();

router.route("/").post(addItem).get(getCarts);
router.route("/:rid").get(getCart).put(updateCart).delete(clearCart);
router.route("/:rid/:iid").delete(removeItem);

module.exports = router;