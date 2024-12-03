import express from 'express';
import {
    createUser, deleteUserById, getAllUsers, getUserById, updateUserById, updateUserPassword
} from '../controllers/userController.js'; // Adjust path as needed

const router = express.Router();
router.post('/', createUser);
router.get('/', getAllUsers); 
router.get('/:id', getUserById); 
router.delete('/:id', deleteUserById); 
router.put('/:id', updateUserById);
router.put('/account/:id', updateUserPassword);


export default router;
