import MenuItem from "../models/menuModel.js";

// Add new menu item
export const addMenuItem = async (req, res) => {
    try {
        const { name, description, price, category, image, tags, isAvailable } = req.body;
        const restaurantId = req.user._id; // assuming you attach the logged-in user to req.user

        const newItem = new MenuItem({
            restaurantId,
            name,
            description,
            price,
            category,
            image,
            tags,
            isAvailable
        });

        const savedItem = await newItem.save();
        res.status(201).json({ success: true, data: savedItem });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update menu item
export const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurantId = req.user._id;

        const updatedItem = await MenuItem.findOneAndUpdate(
            { _id: id, restaurantId },
            req.body,
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ success: false, message: "Menu item not found or unauthorized" });
        }

        res.status(200).json({ success: true, data: updatedItem });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete menu item
export const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurantId = req.user._id;

        const deletedItem = await MenuItem.findOneAndDelete({ _id: id, restaurantId });

        if (!deletedItem) {
            return res.status(404).json({ success: false, message: "Menu item not found or unauthorized" });
        }

        res.status(200).json({ success: true, message: "Menu item deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Search menu items (by name or tags)
export const searchMenuItems = async (req, res) => {
    try {
        const { keyword } = req.query;

        const items = await MenuItem.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { tags: { $regex: keyword, $options: "i" } }
            ]
        });

        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
