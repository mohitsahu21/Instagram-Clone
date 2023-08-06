const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requiredLogin = require('../middelware/requirelogin');
const postModel = mongoose.model('Post');
const userModel = mongoose.model("User");

router.get('/user/:id',requiredLogin, async(req,res)=>{
    try{
    const user = await userModel.findOne({_id:req.params.id}).select("-password")
    if (user){
        const posts = await postModel.find({postedBy:req.params.id})
        .populate("postedBy" , "_id name")

        if(posts) {
            res.json({user,posts})
        }
        else{
           return res.status(404).json({error: "Posts not found"})
        }
        
    }
    else{
       return res.status(404).json({error: "User not found"})
    }

    }
    
    catch (error){
        res.send({ status : "error"});
    }
})



module.exports = router;