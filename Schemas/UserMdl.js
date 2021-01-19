const mongoose=require('mongoose');
const UserSchema=mongoose.Schema({
    userName:{type:String},
    password:{type:String},
    firstName:{type:String},
    lastName:{type:String},
    age:{type:Number}
})

const userMdl=mongoose.model('userTbl',UserSchema)

const DocumentSchema=mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'userTbl'},
    file:{type:String},
})

const documentMdl=mongoose.model('documentTbl',DocumentSchema)

module.exports = {UserTbl:userMdl,DocumentTbl:documentMdl}
