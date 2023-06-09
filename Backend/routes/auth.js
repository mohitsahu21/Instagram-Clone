const express = require('express');
const router = express.Router();
require("dotenv").config();
const mongoose = require('mongoose')
const userModel = mongoose.model("User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secterKey = process.env.JWT_SECRETKEY;
const requireLogin = require('../middelware/requirelogin')




router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body;
    
  
    userModel.findOne({email: email}).then((savedUser)=>{ 
        if(!name || !email || !password){
            return res.status(422).json({error: "Please fill all the fields"})
        }

        if(savedUser){
            return res.status(422).json({error: "User already exist with the email"})
        }
        bcrypt.hash(password,12).then((hashedPass)=> {
            const user = new userModel({
                name,
                email,
                password: hashedPass
            })
            user.save().then((user)=>{
                res.json({message : "Signup successfully"})
            }).catch((err)=>{
                console.log(err)
            })
        })
       
    }).catch((err)=>{
        console.log(err)
    })
    
})

router.post('/signin',(req,res)=> {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(422).json({error:"Please add email or password"})
    }
    userModel.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password).then((doMatch)=>{
           if(doMatch){
            const token = jwt.sign({_id : savedUser._id}, secterKey);
            const {_id,name,email} = savedUser;
           return res.json({token,user:{_id,name,email}})
           }
           else{
            return res.status(422).json({error:"Invalid email or password"})
           }
        }).catch((err)=>{
            console.log(err)
        })
    })

})

module.exports = router;