const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://20csr195:20csr195@project1.3vbpz74.mongodb.net/?retryWrites=true&w=majority");


const con=mongoose.connection;

con.on('open',()=>{
    console.log("database running");
})