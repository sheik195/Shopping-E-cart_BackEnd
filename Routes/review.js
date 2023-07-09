const express=require("express");
const route=express.Router();
const Admin=require("../database/Admin");
const Cart =require("../database/cart");
const Rat=require("../database/review")
const app=express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

require('../database/db');



route.get("/getreview",async(req,res)=>{
  try{
  const data=await Cart.find({products:req.query.id})
  console.log(data);
  res.json({
    data:data,
    status:200
  })
  }
  catch(err){
    res.json({
      status:404,
      err:err
    })
  }

})


route.post("/addreview", async (req, res) => {
    const productId = req.query._id; // assuming the query parameter is 'id'
    const reviewData = req.body;
    console.log(req.body);
    const rating = await Rat.create(req.body);

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

  route.post("/cos",async(req,res)=>{
    try{
    const data=await Admin.findOne({_id:req.body.products});
    const result=await Cart.create(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  })

  route.post("/addreview", async (req, res) => {
    try {
      const rating = await Rat.create(req.body);
      console.log("000",rating);
      const cart = await Cart.findOneAndUpdate(
        { products: req.query.adminId, productUser: req.query.userId },
        { $push: { reviews: rating._id } },
        { new: true }
      ).populate("products productUser reviews");
      res.json(cart);
    } catch (err) {
      console.log(err);
      res.json({
        status: 404,
        err: err,
      });
    }
  });


  route.get("/get", async (req, res) => {
    try {
      const data = await Rat.find({ product: req.query.id }).populate('user');
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving reviews', error: err });
    }
  });

  

module.exports=route;

