const express=require('express');
const router= express.Router();
const userServices=require('../services/userServices')
const transactionServices=require('../services/transactionServices')
const User=require('../model/user')
const transation=require('../model/transaction');
const Transaction = require('../model/transaction');

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

//Update Password

router.patch('/updateProfile',async (req, res, next)=>{
    try{
        const profileUpdate= await userServices.updateProfile(req.body.id,req.body.oldPassword,req.body.newPassword);
        res.json({message: "Profile updated successfully!!"});
    }
    catch(error){
        next(error);
    }
})

// Add Transaction

router.post('/addTransaction',async (req, res, next)=>{
    try{
        const newTransaction=new Transaction(req.body);
        const transaction1=await transactionServices.addTransaction(newTransaction);
        res.json(transaction1);
    }
    catch(error){
        next(error);
    }
})

// Get All transactions of a User

router.get('/getAllTransactions',async (req, res, next)=>{
    try{
        const { userId } =req.body;
        const transactions=await transactionServices.getAllTransactions(userId);
        res.json(transactions);
    }
    catch(error){
        next(error);
    }
})

// Delete Transation

router.delete('/deleteTransaction', async(req, res, next)=>{
    try{
        const deletedTxn= await transactionServices.deleteTransaction(req.body.id);
        res.json(deletedTxn);
    }
    catch(error){
        next(error);
    }
})

//Update Transaction

router.patch('/updateTransaction/:id', async(req, res, next)=>{
    try{
        console.log("Update txn");
        const updatedTxn=await transactionServices.updateTransaction(req.params.id,req.body);
        res.json(updatedTxn);
    }
    catch(error){
        next(error);
    }
})

module.exports=router;