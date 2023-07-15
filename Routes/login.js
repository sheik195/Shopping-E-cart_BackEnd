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
        console.log(req.body);
        const password=req.body.pwd;

        const pass=await bcrypt.hash(password,4);
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
    } catch (error) {
        console.log(error);
        res.json({
            status: "error",
            err:error
        });
    }
});

route.post("/login",async(req,res)=>{
    try {
        const newuser= await Users.find({email:req.body.email});
        if(!newuser){
        res.json({
            status: "Please Enter Correct Email Id",
            user: newuser
        });
    }
    else{
        const p=req.body.pwd;
        const pass=await bcrypt.compare(p,newuser[0].pwd)
        console.log(pass)
        if(pass){
            const token =jwt.sign({userId:newuser._id},"fathima",{ expiresIn: '1d' })
        res.json({
            status: "Success",
            user: newuser,
            token:token
        });
        }
        else{
            res.json({
                status: "Please Enter Correct password"
            });
        }

    }
    } catch (error) {
        res.json({
            status: "error",
            err:error
        });
    }
});

module.exports=route;