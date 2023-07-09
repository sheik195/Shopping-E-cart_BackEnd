const mongoose=require("mongoose");

const u2=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    pwd:{
        type:String,
        required:true
    }
},{timestamp: true});

module.exports = mongoose.model('u2', u2)