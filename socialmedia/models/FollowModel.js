const mongoose = require('mongoose');
const Schema = mongoose.Schema

const FollowerSchema = new Schema({
    user:{type:Schema.Types.ObjectId,ref:"user"},

    Follower:[
        {
            user:{type:Schema.Types.ObjectId,ref:"User"}
        }
    ],
    Following:[
        {
            user:{type:Schema.Types.ObjectId,ref:"user"}
        }
    ]
})

module.exports = mongoose,model("Follower", FollowerSchema)