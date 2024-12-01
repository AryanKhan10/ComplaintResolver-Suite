import express from 'express';
import {
    createUser, getAllUsers, getUserById, updateUserById
} from '../controllers/userController.js'; // Adjust path as needed

const router = express.Router();
router.post('/', createUser);
router.get('/', getAllUsers); 
router.get('/:id', getUserById); 
router.put('/:id', updateUserById);


export default router;
