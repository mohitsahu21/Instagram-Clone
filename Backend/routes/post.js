const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requiredLogin = require('../middelware/requirelogin')
const postModel = mongoose.model('Post')

router.get('/allpost',requiredLogin, (req,res)=>{
    postModel.find().populate("postedBy","_id name profilePic")
    .populate("comments.postedBy","_id name")
    .then((posts)=>{
       res.json({posts})
    }).catch((err)=>{
        console.log(err)
    })
})
router.get('/getfollowingposts',requiredLogin, (req,res)=>{
    postModel.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name profilePic")
    .populate("comments.postedBy","_id name")
    .then((posts)=>{
       res.json({posts})
    }).catch((err)=>{
        console.log(err)
    })
})

router.get('/mypost',requiredLogin, (req,res)=>{
    postModel.find({postedBy:req.user._id}).populate("postedBy","_id name profilePic")
    .populate("comments.postedBy","_id name")
    .then((mypost)=>{
        
         res.json({mypost})
    }).catch((err)=>{
         console.log(err)
    })
})

router.post('/createpost',requiredLogin,(req,res)=>{
    const {title,body,pic} = req.body;
    if(!title || !body || !pic){
        return res.status(422).json({error: "Please fill all the fields"});
    }
    req.user.password = undefined;
    const post = new postModel({
        title,
        body,
        photo: pic,
        postedBy : req.user
    })
    post.save().then((result)=>{
        res.json({post: result})
    }).catch((err)=>{
        console.log(err)
    })

})

router.put('/like', requiredLogin,(req,res)=>{
    postModel.findByIdAndUpdate(req.body.postId,{
        $push:{likes: req.user._id }
    },{
            new : true
        
    }).populate("postedBy","_id name profilePic")
    .populate("comments.postedBy","_id name")
    .then((result)=>{
        res.json(result)
    }).catch((err)=>{
        console.log(err)
    })
})

router.put('/unlike', requiredLogin,(req,res)=>{
    postModel.findByIdAndUpdate(req.body.postId,{
        $pull:{likes: req.user._id }
    },{
            new : true
        
    }).populate("postedBy","_id name profilePic")
    .populate("comments.postedBy","_id name")
    .then((result)=>{
        res.json(result)
    }).catch((err)=>{
        console.log(err)
    })
})

router.put('/comment' , requiredLogin,(req,res) =>{
    const comment = {
        text : req.body.text,
        postedBy : req.user._id
    }
    postModel.findByIdAndUpdate(req.body.postId,{
        $push:{ comments : comment}},{
            new: true
        }).populate("postedBy","_id name profilePic")
        .populate("comments.postedBy","_id name")
        .then((result)=>{ res.json(result)})
        .catch((err)=>{
            console.log(err)
        })
})
router.put("/deletecomment",requiredLogin, async(req,res)=>{
         const postId = req.body.postId;
         const commentId = req.body.commentId;
         try{
            const data = await postModel.findByIdAndUpdate(postId,{
                $pull:{comments: {_id: commentId}}
            },{
                new : true
            
        }).populate("postedBy","_id name profilePic")
            .populate("comments.postedBy","_id name")
           
           res.json(data)
         }
         catch (error){
            res.send({ status : "error"});
         }




} )

router.delete("/deletepost/:postId",requiredLogin, async(req,res)=>{
    let id = req.params.postId;
    try{
        await postModel.findByIdAndDelete({_id : id});
   
    
  const data = await  postModel.find().populate("postedBy","_id name profilePic")
  .populate("comments.postedBy","_id name");
   
   res.json(data)
}
   
catch(error)
{
    res.send({ status : "error"});
} 
});

module.exports = router


