const connection= require('../utilities/connection');
const bcrypt= require('bcrypt');
const userModel={};

userModel.signup=async (newUser)=>{
    try{
        users=await connection.getUsers();
        x=await users.findOne({email: newUser.email});
        if (x) {
            let error = new Error("User already exists");
            error.status = 500;
            throw error;
        }
        user1= await users.insertOne(newUser);
        return user1;
    }
    catch(error){
        throw error;
    }
}

userModel.login=async (email,password)=>{
    try{
        const users= await connection.getUsers();
        const user1= await users.findOne({email: email});

        if(!user1){
            const err = new Error('User not found');
            err.status = 404;
            throw err;
        }
        const isMatch = await bcrypt.compare(password, user1.password);
         console.log('Password match:', isMatch);

        if (!isMatch) {
             const err = new Error('Invalid Password');
            err.status = 401;
            throw err;
        }

        return user1;
    }
    catch(error){
        throw error;
    }
}

userModel.updateProfile=async (id,oldPassword,newPassword)=>{
    try{
        const users=await connection.getUsers();
        const user1=await users.findById(id);
        if(!user1){
            const err = new Error('User not found');
            err.status = 404;
            throw err;
        }

        // Handle password validation and update
        const isMatch = await bcrypt.compare(oldPassword, user1.password);
        if (!isMatch) {
            const error = new Error("Incorrect old password");
            error.status = 401;
            throw error;
        }

        // Update password if new one provided
        if (newPassword) {
            user1.password = newPassword;
        }
        await user1.save();
        return { message: "Profile updated successfully" }
    }
    catch(error){
        throw error;
    }
}

module.exports=userModel;