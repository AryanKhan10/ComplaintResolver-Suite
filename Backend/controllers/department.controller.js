import express from 'express';
import {Department }from '../models/department.model.js';

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
        const { departmentName } = req.body; // Change to req.params if using URL params
        console.log('Data fetched for department');
        // Validate input
        if (!departmentName || departmentName.trim() === '') {
            return res.status(400).json({ error: 'Department name is required' });
        }

        // Create new department instance
        const department = new Department({ departmentName });

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

export default createDepartment;
