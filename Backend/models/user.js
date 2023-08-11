
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    email:{
        type: String,
        required : true
    },
    password : {
        type : String,
        required: true
    },
    resetToken : String,
    expireToken : Date,
    profilePic:{
        type:String,
        default:"https://res.cloudinary.com/dhryrs3lr/image/upload/v1691422523/uynekzpqngfnx2jmgmnl.jpg"
    },
    followers:[
        {
            type:ObjectId,ref:"User"
        }
    ],
    following:[
        {
            type:ObjectId,ref:"User"
        }
    ]
});
mongoose.model("User",userSchema);