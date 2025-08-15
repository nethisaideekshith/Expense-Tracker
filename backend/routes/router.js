const express=require('express');
const router= express.Router();
const userServices=require('../services/userServices')
const transactionServices=require('../services/transactionServices')
const User=require('../model/user')
const transation=require('../model/transaction')

// User Signup

router.post('/signup',async (req, res, next)=>{
    try{
        newUser=new User(req.body);
        const user1= await userServices.signup(newUser);
        res.json(user1);
    }
    catch(error){
        next(error);
    }
})

//User Login

router.post('/login',async (req, res, next)=>{
    try{
        const user= await userServices.login(req.body.email,req.body.password);
        res.status(200).json(user);
    }
    catch(error){
        next(error);
    }
})

module.exports=router;