const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const userModel = mongoose.model("User");
const bcrypt = require('bcrypt')


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
                res.json({message : "saved successfully"})
            }).catch((err)=>{
                console.log(err)
            })
        })
       
    }).catch((err)=>{
        console.log(err)
    })
    

})

module.exports = router;