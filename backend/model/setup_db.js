const dbModel=require('../utilities/connection')
const bcrypt=require('bcrypt');

const userData = async ()=>{
    const hash = async(password) =>{
        return await bcrypt.hash(password,10);
    };
    return [
        {
            name: "Rahul Sharma",
            email: "rahulsharma@gmail.com",
            password: await hash("Rahul@123")
        },
        {
            name: "Priya Singh",
            email: "priyasingh@gmail.com",
            password: await hash("Priya@123")
        },
        {
            name: "Amit Verma",
            email: "amitverma@gmail.com",
            password: await hash("Amit@123")
        }
    ]
}

exports.getDB_SetUp = async () =>{
    const userCollection = await dbModel.getUsers();
    await userCollection.deleteMany();

    //Insert Users
    const users= await userData();
    const userResult= await userCollection.insertMany(users);

    if(userResult.length > 0){
        return "Insertion Successful!!";
    }
    else{
        let err = new Error("Failed to SetUp DB");
        err.status = 500;
        throw err;
    }
};