const express = require("express");
const { addItem, getCarts, getCart, updateCart, clearCart, removeItem } = require("../controllers/cartControllers");
const router = express.Router();

router.route("/").post(addItem);
router.route("/:cid").get(getCarts);
router.route("/:cid/:rid").get(getCart).put(updateCart).delete(clearCart);
router.route("/:cid/:rid/:iid").delete(removeItem);

module.exports = router;