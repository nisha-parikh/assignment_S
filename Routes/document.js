const express=require('express');

const route=express();
const connection=require('../Middlewares/connection');
const {DocumentTbl}=require('../Schemas/UserMdl');

route.post("/upload",connection,(req,res)=>
{
    console.log(req)
    console.log(__dirname)

    let sampleFile;
    let uploadPath;

    if(!req.file || Object.keys(req.file).length === 0)
    {
        res.status(400).json("No files were uploaded")
    }
  
    sampleFile=req.file;
    uploadPath='upload/'+sampleFile.name

    sampleFile.mv(uploadPath,function(err){
        if(err)
        {
            return res.status(500).json(err)
        }
        else{
            res.status(200).json("File Uploaded")
        }
    })
});

module.exports=route;