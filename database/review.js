const mongoose = require('mongoose');
const User=require("./Users");
const Admin=require("./Admin");

const Review =mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Admin,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },
    rating:{
        type:String
    },
    description:{
        type:String
    }
},{timestamp: true})

const review=mongoose.model("review",Review);

module.exports=review;