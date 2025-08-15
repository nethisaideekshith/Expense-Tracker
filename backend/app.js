const express=require('express')
const app=express()
const dotenv=require('dotenv')
const db=require('./utilities/connection')
const router = require('../backend/routes/router')
const create=require('./model/setup_db')

const cors=require('cors')
const cookieParser=require('cookie-parser')

dotenv.config()

const requestLogger=require('./utilities/requestLogger')
const errorLogger=require('./utilities/errorLogger')

app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));



app.use('/',requestLogger);
app.use('/',(req,res,next)=>{
    db.connectDb().then(data=>{
        next();
    }).catch(error=>{
        next(error);
    })
})
app.use('/set-up-db', (req, res, next) => {
    create.getDB_SetUp().then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        next(err)
    })
})
app.use('/',router);
app.use('/',errorLogger);

const PORT = process.env.PORT;
console.log(PORT);

app.listen(PORT,()=>{
    console.log(`Server is running at port no ${PORT}`);
})