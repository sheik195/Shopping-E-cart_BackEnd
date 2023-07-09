const express=require("express");
const route=express.Router();
const Admin=require("../database/Admin");
const Cart =require("../database/cart")
const app=express();
const bodyParser = require('body-parser');
const Users = require("../database/Users");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

require('../database/db');


route.post("/addreview", async (req, res) => {
    const productId = req.query._id; // assuming the query parameter is 'id'
    const reviewData = req.body;
    console.log(req.body);

    const data=await Admin.findOne({_id:productId});
    console.log(data);
  
    try {
      const result = await Admin.updateOne(
        { _id: productId },
        { $push: { reviews: reviewData } }
      );
  
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  route.post("/create",async(req,res)=>{
    try{
      const data=await Users.findOne({email:req.body.email})
      // console.log(req.body);
    var value=req.body.cart;
    let result;
    value.forEach(async(x)=>{
      result=await Cart.create({products:x._id,productUser:data._id,range:10});
    })
    
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  })

  route.get("/getdata", async (req, res) => {
    try {
      const id=await Users.find({email:req.query.id});
      console.log("888",id[0]._id);
      const result = await Cart.find({ productUser: id[0]._id });
      const product = [];
      const user = [];
      const range=[];
      for (const ele of result) {
        const result1 = await ele.populate("products");
        const result2 = await ele.populate({
          path: "productUser",
          select: "-pwd" // exclude the password field
        });
        range.push(ele.range);

        product.push(result1.products);
        user.push(result2.productUser);
      }
      res.json({
        status: 200,
        product: product,
        user: user,
        range:range
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });





  
  
  
  
  
  
  
  

module.exports=route;

