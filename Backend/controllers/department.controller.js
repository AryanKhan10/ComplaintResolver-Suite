import express from 'express';
import { Department } from '../models/department.model.js';

// const createDepartment = async (req, res) => {
//     try {
//         const {departmentName} = req.body;
//         const department = new Department({departmentName});
//         // console.log('new department created: ' + department);

//         const saveDepartment = await department.save();
//         res.status(201).send('Department created successfully');

//     }catch(error){
//         // throw new Error(error);
//         console.log('error occured at catch block');
//         res.status(500).send(error);
//     }
// };




// export default createDepartment;



// import express from 'express';
// import Department from '../models/department.model.js'; // Ensure the correct file path and extension

const createDepartment = async (req, res) => {
    try {
        // Extract department name from body (preferred) or params
        const { departmentName, departmentLocation, departmentType, departmentEmployees, departmentHead } = req.body; // Change to req.params if using URL params
        console.log('Data fetched for department');
        // Validate input
        if (!departmentName || departmentName.trim() === '') {
            return res.status(400).json({ error: 'Department name is required' });
        }

        // Create new department instance
        const department = new Department({ departmentName, departmentLocation, departmentType, departmentEmployees, departmentHead });

        // Save to database
        const saveDepartment = await department.save();
        console.log('Department Saved:', saveDepartment);
        // Respond with success and saved data
        res.status(201).json({
            message: 'Department created successfully',
            department: saveDepartment,
        });
    } catch (error) {
        // Log and respond with an error message
        console.error('Error occurred while creating department:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// fetch a department
const getDepartmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById(id).populate('agentId');

        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        res.status(200).json({
            message: 'Department fetched successfully',
            department,
        });
    } catch (error) {
        console.error('Error occurred while fetching the department:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// fetching all departments data from backend
const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find().populate('agentId');
        res.status(200).json({
            message: 'Departments fetched successfully',
            departments,
        });
    } catch (error) {
        console.error('Error occurred while fetching departments:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


//Updating a single department or depratment by ID

const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { departmentName, agentId } = req.body;

        const updatedDepartment = await Department.findByIdAndUpdate(
            id,
            { departmentName, agentId },
            { new: true, runValidators: true }
        );

        if (!updatedDepartment) {
            return res.status(404).json({ error: 'Department not found' });
        }

        res.status(200).json({
            message: 'Department updated successfully',
            department: updatedDepartment,
        });
    } catch (error) {
        console.error('Error occurred while updating department:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// delete a single department by id
const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedDepartment = await Department.findByIdAndDelete(id);

        if (!deletedDepartment) {
            return res.status(404).json({ error: 'Department not found' });
        }

        res.status(200).json({
            message: 'Department deleted successfully',
            department: deletedDepartment,
        });
    } catch (error) {
        console.error('Error occurred while deleting department:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
};

