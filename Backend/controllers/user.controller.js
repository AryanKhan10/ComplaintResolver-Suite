// import { User } from '../models/user.model';
import { User } from '../models/user.model.js';


//creating a single user
const createUser = async(req, res)=>{
    try{
        const {firstName, lastName, email,address,password,accountType} = req.body;
        console.log('Data recieved for new user');

        if( !firstName || !lastName || !email || !accountType || !password ){
          return  res.status(400).json({message:'All Requried Fields Must be Provided' } );
        }

        const userCreated = await new User({firstName, lastName, email, accountType, password});
        console.log('New user created');
        const userSaved = await userCreated.save();
        console.log('user saved');
        res.status(201).json({ message: "New User Created", user: userSaved });

    }catch(error){
        res.status(500).json({ message: "Error creating user", error });
    }
}


// geting All users

const getAllUsers = async (req, res) => {
    try{
        const allUsers = await User.find();

        res.status(200).json({ message: "All users Fetched", allUsers });
    }
    catch(error){

        res.status(500).json(
            { message: "Error fetching complaints", error }
    );
}
}

//geting single user data

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        

        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Respond with the user data
        res.status(200).json({ message: "User found", user });
    } catch (error) {
        console.error("Error occurred while finding user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


//updating user by id

const updateUserById = async (req, res) => {
    try {
      const { id } = req.params;
  
      console.log("User found and is ready to update");
  
      // Update user fields
      const { firstName, lastName, email, address } = req.body;
      const userSaved = await User.findByIdAndUpdate(
        id, 
        { firstName, lastName, email, address }, 
        { new: true, runValidators: true }
      );
  
      if (!userSaved) {
        return res.status(404).json({ message: "User not found" });
      }
  
      console.log("User updated");
  
      res.status(200).json({ message: "User by id Updated", user: userSaved });
    } catch (err) {
      console.error("Error occurred updating user:", err);
      
      res.status(500).json({ message: "An error occurred", error: err.message });
    }
  };


//updating user password

  const updateUserPassword = async (req, res) => {
    try {
      const { id } = req.params;
      const { password } = req.body;
  
      if (!password) {
        return res.status(400).json({ message: 'Password is required' });
      }
  
      console.log('Updating password for user:', await User.findById(id));
  
    
  
              const updatePassword = await User.findByIdAndUpdate(
              id,
              { password },
              { new: true, runValidators: true }
            );
        
            if (!updatePassword) {
              return res.status(404).json({ message: 'User not found!' });
            }
        
            res.status(201).json({ message: 'Password Updated', user: updatePassword });
      } catch (err) {
      console.error('Error Occurred Updating Password:', err);
      res.status(500).json({ message: 'Error occurred while updating password' });
    }
  };



  //Deleting a single user 

  const deleteUserById = async (req, res) => {
    try{
      const {id} =req.params;
    const user = await User.findByIdAndDelete(id);
    console.log('user Deleted ', user);
    res.status(201).json('User deleted successfully');
    
    }catch(err){
      console.log('Error occured deleting user', err);
      res.status(500).json({message:'Error delteting user', err});
    }
  };




export  {
  createUser, getAllUsers, 
  getUserById, updateUserById,
   deleteUserById, updateUserPassword};