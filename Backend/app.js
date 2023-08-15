const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config(); 
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const url = process.env.DB_URL;

mongoose.connect(url).then((res)=>{
    console.log("connected")
}).catch((err)=>{
    
   console.log("error:"+ err)
})
app.use(cors());


require('./models/user');
require('./models/post');

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));




app.listen(PORT,()=>{
    console.log(`Server is runnin on ${PORT}` )
});