const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requiredLogin = require('../middelware/requirelogin')
const postModel = mongoose.model('Post')

router.get('/allpost',(req,res)=>{
    postModel.find().populate("postedBy","_id name")
    .then((posts)=>{
       res.json({posts})
    }).catch((err)=>{
        console.log(err)
    })
})

router.post('/createpost',requiredLogin,(req,res)=>{
    const {title,body} = req.body;
    if(!title || !body){
        return res.status(422).json({error: "Please fill all the fields"});
    }
    req.user.password = undefined;
    const post = new postModel({
        title,
        body,
        postedBy : req.user
    })
    post.save().then((result)=>{
        res.json({post: result})
    }).catch((err)=>{
        console.log(err)
    })

})

module.exports = router

