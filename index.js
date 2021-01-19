const express=require('express');
const bodyparser=require('body-parser');
const userRoute=require('./Routes/user');
const documentRoute=require('./Routes/document')
const fileUpload=require('express-fileupload');

const app=express();
app.use(fileUpload());
app.use(bodyparser.json());
app.use('/user',userRoute);
// app.use('/file',documentRoute);
app.post('/upload',(req,res)=>
{
    console.log("in");
    // let sampleFile;
    // let uploadPath;

    // if(!req.files || Object.keys(req.files).length === 0)
    // {
    //     res.status(400).json("No files were uploaded")
    // }
  
    // sampleFile=req.files.file;
    // uploadPath='upload/'+sampleFile.name

    // sampleFile.mv(uploadPath,function(err){
    //     if(err)
    //     {
    //         return res.status(500).json(err)
    //     }
    //     else{
    //         res.status(200).json("File Uploaded")
    //     }
    // })
});
app.listen(8080,()=>
{
    console.log('app is started')
});

