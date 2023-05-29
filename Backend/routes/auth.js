const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const userModel = mongoose.model("User")

router.get('/',(req,res) =>{
    res.send("home page")
})
router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body;
    
    
  
    userModel.findOne({email: email}).then((savedUser)=>{ 
        if(savedUser){
            return res.status(422).json({error: "User already exist with the email"})
        }
        const user = new userModel({
            name,
            email,
            password
        })
        user.save().then((user)=>{
            res.json({message : "saved successfully"})
        }).catch((err)=>{
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err)
    })
    

})

module.exports = router;