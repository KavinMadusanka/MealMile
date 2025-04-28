import menuModel from "../models/menuModel.js";
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
        res.status(201).send({ success: true, data: savedItem });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
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
            return res.status(404).send({ success: false, message: "Menu item not found or unauthorized" });
        }

        res.status(200).send({ success: true, data: updatedItem });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

// Delete menu item
export const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurantId = req.user._id;

        const deletedItem = await MenuItem.findOneAndDelete({ _id: id, restaurantId });

        if (!deletedItem) {
            return res.status(404).send({ success: false, message: "Menu item not found or unauthorized" });
        }

        res.status(200).send({ success: true, message: "Menu item deleted successfully" });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
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

        res.status(200).send({ success: true, data: items });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};


// get all menu items
export const getAllMenu = async (req,res) => {
    try {
        const MenuItems = await menuModel.find({}).select("-image").limit(12).sort({createdAt: -1});

        res.status(200).send({
            success:true,
            MenuItems            
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: 'Error fetching Menu Items'
        })
    }
}

//get single item
export const getSingleItem = async (req, res) => {
    try {
        const id = req.body._id;
        const item = await menuModel.findById({id});
        req.status(200).send({
            success:true,
            message:' Items getting successfull.',
            item
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message:'Error getting single item.'
        })
    }
}

