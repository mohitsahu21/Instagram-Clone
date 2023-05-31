const jwt = require('jsonwebtoken');
require("dotenv").config();
const secterKey = process.env.JWT_SECRETKEY;
const mongoose = require('mongoose');
const userModel = mongoose.model("User");

module.exports= (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error: "You Must Be loggedIn"})
    }
   const token = authorization.replace("Bearer ","") //because authorization == Bearer + token
    jwt.verify(token,secterKey,(err,payload)=>{
        if(err){
            return res.status(401).json({error: "You Must Be loggedIn"})
        }
        const {_id} = payload;
        userModel.findById(_id).then((userdata)=>{
              req.user = userdata;
              next()
        })
        

    })
}