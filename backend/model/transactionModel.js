const connection=require('../utilities/connection')
const transactionModel={}

transactionModel.addTransaction= async(newTransaction)=>{
    try{
        const users=await connection.getUsers();
        console.log(newTransaction.userId)
        const user=await users.findById(newTransaction.userId);

        if(!user){
            let error = new Error("No such user exists");
            error.status = 500;
            throw error;
        }

         // console.log("Incoming transaction:", newTransaction);

            const transactions=await connection.getTransactions();
            const transaction1=await transactions.create(newTransaction);
            return transaction1;
        }
    catch(error){
        throw error;
    }
}

transactionModel.getAllTransactions= async(userId)=>{
    try{
        const users=await connection.getUsers();
        // console.log("Incoming userId:", userId);
        const user = await users.findById(userId);
        // console.log("DB User:", user);

        if(!user){
            let error = new Error("No such user exists");
            error.status = 500;
            throw error;
        }
        // console.log(userId);
        const transactions=await connection.getTransactions();
        // console.log("Incoming userId:", userId, typeof userId);

        const allTxns = await transactions.find({ userId }).sort({ date: 1 });


        if(!allTxns || allTxns.length === 0){
            return {message: "No transactions found"}
        }
        return allTxns;
    }
    catch(error){
        throw error;
    }
}

transactionModel.deleteTransaction=async (id)=>{
    try{
        const transactions= await connection.getTransactions();
        const deletedTxn=await transactions.deleteOne({_id: id});
        if(!deletedTxn){
            return {message: "No such transaction exists"};
        }
        return deletedTxn;
    }
    catch(error){
        throw error;
    }
}

transactionModel.updateTransaction=async (id,txnDetails)=>{
    try{
        const transactions=await connection.getTransactions();
        const updatedTxn = await transactions.findByIdAndUpdate(
            id, 
            { $set: txnDetails },  // spread into $set, not nested
            { new: true }          // returns updated doc
        );
        if(!updatedTxn){
            return {message:"No such transaction exists"};
        }
        return updatedTxn;
    }
    catch(error){
        throw error;
    }
}

module.exports=transactionModel;