import express from 'express';
import {
     deleteUserById, getAllUsers, getUserById, updateUserById, updateUserPassword
} from '../controllers/user.controller.js'; // Adjust path as needed
import { auth } from '../middlewares/auth.middleware.js';
const router = express.Router();
// router.post('/', createUser);
router.get('/getAllUsers', getAllUsers); 
router.get('/getUser/:id', getUserById); 
router.delete('/deleteUser/:id', deleteUserById); 
// router.put('updateUser/:id', updateUserById);
router.put('/resetPass',auth, updateUserPassword);


export default router;
