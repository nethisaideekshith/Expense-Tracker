const userModel=require('../model/userModel')
const validators=require('../utilities/validator');
const userServices={};

userServices.signup= async(newUser)=>{
    try{
        console.log(newUser.email+" "+newUser.password);
        //validate email and password
        validators.validateEmail(newUser.email);
        validators.validatePassword(newUser.password);
        const user1=await userModel.signup(newUser);
        return user1;
    }
    catch(error){
        throw error;
    }
}

userServices.login=async(email, password)=>{
    try{
        validators.validateEmail(email);
        validators.validatePassword(password);
        const user1= await userModel.login(email,password);
        return user1;
    }
    catch(error){
        throw error;
    }
}

userServices.updateProfile=async(id, oldPassword, newPassword)=>{
    try{
        if(newPassword){
            validators.validatePassword(newPassword);
        }
        const passwordUpdate= await userModel.updateProfile(id,oldPassword,newPassword);
        return passwordUpdate;
    }
    catch(error){
        throw error;
    }
}

module.exports=userServices;