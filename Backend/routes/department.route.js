import express from 'express';
import {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
} from '../controllers/department.controller.js';
import { auth, isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();
router.post('/createDepartment',auth, createDepartment);
router.get('/getAllDepartments',auth,isAdmin, getAllDepartments);
router.get('/getDepartment/:id',auth, getDepartmentById);
router.put('/updateDepartment/:id',auth, updateDepartment);
router.delete('/deleteDepartment/:id',auth, deleteDepartment);

export default router;
