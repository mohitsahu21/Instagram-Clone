const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    photo:{
        type:String,
        required: true
    },
    likes:[{
        type : ObjectId,
        ref: "User"
    }],
    date:{
        type:Date,
        default:Date.now
    },
    comments: [{
        text:String,
        date:{
            type:Date,
            default:Date.now
        },
        postedBy : {
            type:ObjectId,
            ref: "User"
        }
    }

    ],
    postedBy : {
        type:ObjectId,
        ref: "User"
    }
})

mongoose.model("Post",postSchema);
