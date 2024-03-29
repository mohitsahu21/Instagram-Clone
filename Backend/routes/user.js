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

router.put('/follow',requiredLogin,async (req,res)=>{
   try{
    const data = await userModel.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id} 
    },{
        new:true
    })
    if(data){
      const user=await userModel.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId} 
        },{
            new:true
        }).select("-password")
        if(user){
        res.json(user)}
        else{
            return res.status(422).json({error: "User not found"})
        }
    }
    else{
        return res.status(422).json({error: "User not found"})
    }
   }
   catch (error){
    res.send({ status : "error"});
}
    
})

router.put('/unfollow', requiredLogin, async (req,res)=>{
   try{
    const data = await userModel.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id} 
    },{
        new:true
    })
    if(data){
      const user= await  userModel.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.unfollowId} 
        },{
            new:true
        }).select("-password")
        if(user){
        res.json(user)}
        else{
            return res.status(422).json({error: "User not found"})
        }
    }
    else{
        return res.status(422).json({error: "User not found"})
    }
   }
   catch (error){
    res.send({ status : "error"});
}
    
})

router.put('/updateprofilepic',requiredLogin,async (req,res)=>{
    try{
         
          const user = await userModel.findByIdAndUpdate(req.user._id,{profilePic:req.body.profilePic},{
            new:true
        });
        
          if (!user){
            return res.status(422).json({error:"Pic cannot post"})
          }
          else{
            res.json(user)
          }

    }
    catch (error){
        res.send({ status : "error"});
    
    }
})

router.post('/search-users',(req,res)=>{
    let userPattern = new RegExp("^"+ req.body.query)
    userModel.find({email:{$regex:userPattern}})
    .select("_id email name profilePic")
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"No user found with this email"})
        }
        res.json({user})
    }).catch((err)=>{
        console.log(err)
    })
})



module.exports = router;