const express = require('express');
const router = express.Router();
require("dotenv").config();
const mongoose = require('mongoose')
const userModel = mongoose.model("User");
const crypto  =require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secterKey = process.env.JWT_SECRETKEY;
const requireLogin = require('../middelware/requirelogin');
const nodemailer = require("nodemailer");
const mailKey = process.env.Mailkey;
const mailId = process.env.MailId;

const transporter =  nodemailer.createTransport({
    service : 'gmail',
     
     auth: {
       // TODO: replace `user` and `pass` values from <https://forwardemail.net>
       user: mailId,
       pass: mailKey
     }
   });


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
            user.save()
            .then((user)=>{
                    transporter.sendMail({
                    from: '"InstaClone" <mohitsahujbp@gmail.com>', // sender address
                    to: user.email, // list of receivers
                    subject: "Signup Success", // Subject line
                    text: "Welcome to InstaClone", // plain text body
                    html: "<b>Welcome to InstaClone</b>", // html body
                  });

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
            const {_id,name,email,followers,following,profilePic} = savedUser;
           return res.json({token,user:{_id,name,email,followers,following,profilePic}})
           }
           else{
            return res.status(422).json({error:"Invalid email or password"})
           }
        }).catch((err)=>{
            console.log(err)
        })
    })

});

router.post('/reset-password',(req,res)=>{
     crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex");
        userModel.findOne({email:req.body.email})
        .then((user)=>{
            if(!user){
               return res.status(422).json({error: "User don't not exist with that email"})
            }
            user.resetToken = token;
            user.expireToken= Date.now() + 3600000;
            user.save().then((result) => {
                transporter.sendMail({
                    from: '"InstaClone" <mohitsahujbp@gmail.com>', // sender address
                    to: user.email, // list of receivers
                    subject: "Password Reset Link", // Subject line
                    html: `
                    <p>You requested for password reset</p>
                    <h4>click in this <a href="https://instaclone-obaa.onrender.com/reset_password/${token}">link</a> to reset password</h4>`, // html body
                  });
                  res.json({message:"Please check your email,password reset link has been sent to your email"})

            })
            
        })
        .catch((err)=>{
            console.log(err)
        })

     })
})

router.post('/new-password', (req,res)=>{
    const newPassword = req.body.password ;
    const sentToken =  req.body.token;
    userModel.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Session expired,Genrate password reset link again"})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
            user.password = hashedpassword;
            user.resetToken = undefined;
            user.expireToken = undefined;
            user.save().then((saveduser)=>{
             return  res.json({message:"Password updated successfully"})

            })
        })
    }).catch((err)=>{
        console.log(err)
    })
})

module.exports = router;