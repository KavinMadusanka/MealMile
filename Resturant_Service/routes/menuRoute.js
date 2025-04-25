import express from 'express';
import { addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    searchMenuItems
 } from '../Controllers/menuController.js';
import { verifyToken,
    isAdmin,
    isRestaurant
 } from '../middlewares/authmiddleware.js'

const router = express.Router();

//create menu items using Id
router.post('/AddMenu',verifyToken,isRestaurant, addMenuItem);

//update menu items using Id
router.put('/updateMenu/:MenuID',verifyToken, isRestaurant, updateMenuItem);

//delete menu items using Id
router.delete('/deleteMenu/:MenuID', verifyToken, isRestaurant, deleteMenuItem);

//search menu items
router.post('/SearchMenu', searchMenuItems);