import express from 'express';
import { registerController,
    loginController,
    Signout
 } from '../Controllers/authController.js';

const router = express.Router();

//create account
router.post('/register', registerController);

//Login 
router.post('/login',loginController);

//signOut
router.post('/SignOut', Signout) 

export default router;