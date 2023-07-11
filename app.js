const express=require("express");
const cors = require('cors');
const app=express();

const login=require("./Routes/login")
const admin=require('./Routes/admin');
const review=require("./Routes/review");
const order=require("./Routes/order");
app.use(express.json())
app.use(cors({
    origin:"https://tubular-pixie-28fcd4.netlify.app",
    credentials: true
}))

app.use("/login",login);
app.use("/admin",admin);
app.use("/review",review);
app.use("/order",order);

app.listen("3500",()=>{
    console.log("server Running");
})