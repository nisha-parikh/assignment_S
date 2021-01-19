const mongoose=require('mongoose');
require('dotenv').config()
const connectionString= process.env.connectionString;

module.exports=(req,res,next)=>{
    mongoose.connect(connectionString,{useUnifiedTopology: true,useNewUrlParser: true}).then(()=>{
        console.log('connected to db');
        next();
    }).catch((dbErr)=>
    {
        console.log(dbErr)
        res.status(500).json("DB Connection Error");
    });
}