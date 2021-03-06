const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Schema = new Schema({
    user:{type: Schema.Types.ObjectId,ref: "user"},

    bio:{type:String,require:true},

    social:{
        youtube:{type:String},
        twitter:{type:String},
        facebook:{type:String},
        instagram:{type:String}
    }
},
{timestamps:true}
)

module.exports = mongoose.model('Profile',ProfileSchema)