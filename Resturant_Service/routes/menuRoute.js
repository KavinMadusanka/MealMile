import express from 'express';
import { addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    searchMenuItems,
    getAllMenu,
    getSingleItem
 } from '../Controllers/menuController.js';
import { verifyToken,
    requireSignIn,
    isAdmin,
    isRestaurant
 } from '../middlewares/authmiddleware.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js'

const router = express.Router();

//create menu items using Id
router.post('/AddMenu',uploadMiddleware, addMenuItem);

//update menu items using Id
router.put('/updateMenu/:MenuID', updateMenuItem);

//delete menu items using Id
router.delete('/deleteMenu/:MenuID', deleteMenuItem);

//search menu items
router.post('/SearchMenu', searchMenuItems);

//get all items
router.get('/getAllMenu',verifyToken,getAllMenu);

//get single item
router.get('/getItem',verifyToken ,getSingleItem);

export default router;