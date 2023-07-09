const express=require("express");
const route=express.Router();
const Admin=require("../database/Admin");
const app=express();
  const bodyParser = require('body-parser')
//  app.use(express.json());
//  app.use(express.urlencoded())         // for application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

 
 ///app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
// app.use(bodyParser.json())
require('../database/db');
route.get("/admin",async(req,res)=>{
    try {
        const admin= await Admin.find();
        res.json({
            status: "success",
            user: admin
        });
       console.log(admin);
        console.log("h1");
    } catch (error) {
        res.json({
            status: "error"
        });
        console.log(error);console.log("h1");
    }

})
route.post("/addproduct",async(req,res)=>{
    console.log("-r",req.body);
    try {
        const newuser= await Admin.create(req.body);
        console.log("-",req.body);
        res.json({
            status: "success",
            user: newuser
        });
    } catch (error) {
        console.log("-f",req.body);
        res.json({
            status: "error",
            user:error
        });
       // console.log(error)
    }
})

route.post("/add",(req,res)=>{
    console.log(req.body);
    res.send("hello");
})

route.post("/delproduct",async(req,res)=>{
    try{
        const del=await Admin.deleteOne({_id:req.body.id})
        res.json({
            status: "Success",
            user: del
        });
        console.log(del);
    }
    catch(err){
        res.json({
            status: "Error",
            user: del
        });
    }
})

route.post("/updproduct",async(req,res)=>{
    try{
        const update=await Admin.updateOne({_id:req.body.id},req.body.upd)
        res.json({
            status: "Success",
            user: update
        });
    }
    catch(err){
        res.json({
            status: "Error",
            user: update
        });
    }
})


module.exports=route;
