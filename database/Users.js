const mongoose=require("mongoose");

const u1=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phn:{
        type:String,
        required:true,
        unique:true
    },
    pwd:{
        type:String,
        required:true
    },
},{timestamp: true});

module.exports = mongoose.model('u1', u1)