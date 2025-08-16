const transactionModel= require('../model/transactionModel');
const transactionServices={}

transactionServices.addTransaction=async (newTransaction)=>{
    try{
        transaction1=await transactionModel.addTransaction(newTransaction);
        return transaction1;
    }
    catch(error){
        throw error;
    }
}

transactionServices.getAllTransactions=async (userId)=>{
    try{
        transactions =await transactionModel.getAllTransactions(userId);
        return transactions;
    }
    catch(error){
        throw error;
    }
}

transactionServices.deleteTransaction= async (id)=>{
    try{
        deletedTxn= await transactionModel.deleteTransaction(id);
        return deletedTxn;
    }
    catch(error){
        throw error;
    }
}

transactionServices.updateTransaction= async (id,txnDetails)=>{
    try{
        updatedTxn= await transactionModel.updateTransaction(id,txnDetails);
        return updatedTxn;
    }
    catch(error){
        throw error;
    }
}

module.exports=transactionServices;