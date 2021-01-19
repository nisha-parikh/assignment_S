const express=require('express');
const route=express();
const connection=require('../Middlewares/connection');
const {UserTbl}=require('../Schemas/UserMdl');

route.get("/",connection,(req,res)=>{
    UserTbl.find({},{'__v':0}).exec((err,users)=>{
        if(err)
        {
            res.status(500).json(err)
        }
        else{
            res.status(200).json(users)
        }
    })
})

route.post("/",connection,(req,res)=>
{
    const userObj=new UserTbl({
        userName:req.body.userName,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        age:req.body.age
    })

    userObj.save()
    .then((user)=>{
        res.status(200).json(user)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
});

module.exports=route;