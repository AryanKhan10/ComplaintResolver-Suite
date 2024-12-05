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
    deleteUserById,
    getAllUsers, getUserById, updateUserById, updateUserPassword
} from '../controllers/user.controller.js'; 

const router = express.Router();
router.get('/', getAllUsers); 
router.get('/:id', getUserById); 
router.delete('/:id', deleteUserById); 
router.put('/:id', updateUserById);
router.put('/account/:id', updateUserPassword);

export default router;
