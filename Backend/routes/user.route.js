import express from 'express';
import {
    deleteUserById,
    getAllUsers, getUserById, updateUserById, updateUserPassword
} from '../controllers/user.controller.js'; 
// singUpController,signInController
const router = express.Router();
// router.post('/account-singup/', singUpController);
// router.post('/account-login', signInController);
router.get('/', getAllUsers); 
router.get('/:id', getUserById); 
router.delete('/:id', deleteUserById); 
router.put('/:id', updateUserById);
router.put('/account/:id', updateUserPassword);


export default router;
