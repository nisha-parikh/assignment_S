const express=require('express');

const route=express();
const connection=require('../Middlewares/connection');
const {DocumentTbl}=require('../Schemas/UserMdl');

route.post("/upload",(req,res)=>
{
    console.log(req.query.userId);
    let sampleFile;
    let uploadPath;

    if(!req.files || Object.keys(req.files).length === 0)
    {
        res.status(400).json("No files were uploaded")
    }
  
  
    sampleFile=req.files.file;
    uploadPath='upload/'+sampleFile.name


    sampleFile.mv(uploadPath,function(err){
        if(err)
        {
            return res.status(500).json(err)
        }
       
    })
    const docObj = new DocumentTbl({
        userId:req.query.userId,
        file :sampleFile.name
    })
    docObj.save()
    .then((doc)=>{
        res.status(200).json(doc)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
});
module.exports=route;