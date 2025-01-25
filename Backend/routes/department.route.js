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
router.post('/createDepartment', auth, isAdmin, createDepartment);
router.get('/getAllDepartments', auth, isAdmin, getAllDepartments);
router.get('/getDepartment/:id', auth, isAdmin, getDepartmentById);
router.put('/updateDepartment/:id', auth, isAdmin, updateDepartment);
router.delete('/deleteDepartment/:id', auth, isAdmin, deleteDepartment);

export default router;
