const express=require('express');
const bodyparser=require('body-parser');
const userRoute=require('./Routes/user');
const documentRoute=require('./Routes/document')
const fileUpload=require('express-fileupload');
const connection=require('./Middlewares/connection');
const {UserTbl}=require('./Schemas/UserMdl');
const jwt = require("jsonwebtoken");
const app=express();
app.use(fileUpload());
app.use(bodyparser.json());
app.use('/user',userRoute);
app.use('/file',documentRoute);
app.post("/login",connection,(req,res)=>{
    UserTbl.find({userName:req.body.userName}).exec((err,user)=>{
        if(user)
        {
            console.log(user);
            if(user[0].password === req.body.password){
                const token = jwt.sign({user},"secret");
                res.status(200).json({user:user,token:token})
            }
            else
                res.status(400).json("Invalid userName/password");
        }
        else{
            res.status(200).json(users)
        }
    })
})

app.post("/signup",connection,(req,res)=>{
    UserTbl.find({userName:req.body.userName}).exec((err,user)=>{
        if(user.length !== 0)
        {
           return res.status(400).json("User_already_exists");
        }
        console.log(req.body);
        const userObj=new UserTbl({
            userName:req.body.userName,
            password:req.body.password,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            age:req.body.age
        })
    
        userObj.save()
        .then((user)=>{
            const token = jwt.sign({userObj},"secret");
            res.status(200).json({user:user,token:token})
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    })
})

app.listen(8080,()=>
{
    console.log('app is started')
});

