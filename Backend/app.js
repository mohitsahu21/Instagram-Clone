const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config(); 
const app = express();
const PORT = 5000;
const url = process.env.DB_URL;
require('./models/user')

mongoose.connect(url).then((res)=>{
    console.log("connected")
}).catch((err)=>{
    
   console.log("error:"+ err)
})




app.listen(PORT,()=>{
    console.log(`Server is runnin on ${PORT}` )
});