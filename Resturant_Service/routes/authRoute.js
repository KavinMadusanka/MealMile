import express from 'express';
import { registerController,
    loginController,
    Signout,
    userDelete,
    getAllUsers
 } from '../Controllers/authController.js';
import { verifyToken,
    isAdmin
 } from '../middlewares/authmiddleware.js'

const router = express.Router();

//create account
router.post('/register', registerController);

//Login 
router.post('/login',loginController);

//signOut
router.post('/SignOut', Signout) 

//delete account
router.delete('/deleteUser/:userId',verifyToken, userDelete)

//get all users
router.get('/getAllUsers',verifyToken, isAdmin, getAllUsers);

export default router;