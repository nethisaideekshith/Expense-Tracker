const mongoose= require('mongoose')
const bcrypt= require('bcrypt')
const { profile } = require('console')
require("dotenv").config()

//User Schema

const userSchema= mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profileImage:{
        type: String
    }
})

//password hashing

userSchema.pre('save',async function(next){
  if(!this.isModified('password'))
    return next();
  this.password=await bcrypt.hash(this.password,10);
  next();
})



const incomeCategories = ['Salary', 'Freelance', 'Savings', 'Others'];
const expenseCategories = ['Food', 'Movies', 'Shopping', 'Transport', 'Bills', 'Others'];

const allCategories = [...incomeCategories, ...expenseCategories];

// Transaction Schema

const transactionSchema = new mongoose.Schema({
    type: { 
        type: String,
        enum: ['income', 'expense'], 
        required: true 
    },
    category: { 
        type: String, 
        enum: allCategories, 
        required: true 
    },
    amount: { 
        type: Number,
         required: true 
    },
    date: { 
        type: Date, 
        required: true,
        default: Date.now
    }
});

// Category check

transactionSchema.pre('save', function (next) {
    if (this.type === 'income' && !incomeCategories.includes(this.category)) {
        return next(new Error('Invalid category for income.'));
    }
    if (this.type === 'expense' && !expenseCategories.includes(this.category)) {
        return next(new Error('Invalid category for expense.'));
    }
    next();
});


// Database Connection

let dbConnection;
let db={};
db.connectDb=async ()=>{
  try{
    dbConnection=await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected successfully");
  }
  catch(er){
    console.log("DB connection failed");
  }
}

//User Model

db.getUsers= async ()=>{
  const model=await dbConnection.model("User",userSchema);
  return model;
}

//Transaction Model

db.getTransaction= async ()=>{
    const model=await dbConnection.model("Transaction",transactionSchema);
    return model;
}

module.exports= db;