import express from 'express';
import {
<<<<<<< HEAD
=======
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
>>>>>>> 754dcf324d1126dd006b608575741f86b11e1779
    deleteUserById,
    getAllUsers, getUserById, updateUserById, updateUserPassword
} from '../controllers/user.controller.js'; 
// singUpController,signInController
const router = express.Router();
<<<<<<< HEAD
// router.post('/account-singup/', singUpController);
// router.post('/account-login', signInController);
=======
>>>>>>> 754dcf324d1126dd006b608575741f86b11e1779
router.get('/', getAllUsers); 
router.get('/:id', getUserById); 
router.delete('/:id', deleteUserById); 
router.put('/:id', updateUserById);
router.put('/account/:id', updateUserPassword);

export default router;
