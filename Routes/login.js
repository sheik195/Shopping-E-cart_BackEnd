const express=require("express");
const route=express.Router();
const app=express();
const Users=require("../database/Users");
const AdminUser=require("../database/AdminUser");
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
app.use(express.json());
require('../database/db');

route.post("/adminlogin",async(req,res)=>{
    try{
        const ad=await AdminUser.find({email:req.body.email});
        if(req.body.email===ad[0].email && req.body.pwd===ad[0].pwd){
        res.json({
            status: "success",
            user: ad
        });
    }
    else{
        res.json({
            status: "Wrong User"
        });
    }
    } catch (error) {
        res.json({
            status: "error"
        });
    }
})


route.post("/signup",async(req,res)=>{
    try {
        const password=req.body.pwd;
        const pass=await bcrypt.hash(password,"asdfghjjhgfdss");
        const data={
            "name":req.body.name,
            "pwd":pass,
            "phn":req.body.phn,
            "email":req.body.email}
        const newuser= await Users.create(data);
        const token =jwt.sign({userId:newuser._id},"fathima",{ expiresIn: '1d' })
        res.json({
            status: "success",
            user: newuser,
            token:token
        });
        console.log("S1");
    } catch (error) {
        res.json({
            status: "error",
            err:error
        });
    }
});

route.post("/login",async(req,res)=>{
    try {
        const newuser= await Users.find({email:req.body.email});
        if(newuser===-1){
        res.json({
            status: "Please Enter Correct Email Id",
            user: newuser
        });
    }
    else{
        if(newuser[0].pwd==req.body.pwd){
            res.json({
                status: "Success",
                user: newuser
            });
        }
        else{
            res.json({
                status: "Please Enter Correct password",
                user: newuser
            });
        }

    }
    } catch (error) {
        res.json({
            status: "error"
        });
    }
});

module.exports=route;