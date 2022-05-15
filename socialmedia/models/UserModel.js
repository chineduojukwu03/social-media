const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Schema = new Schema ({
     name:{type: String, required:true},

     email:{type:String, required:true,unique:true},

     password:{type:String,required:true, select: false},

     username:{type:String, required:true, trim:true},

     profilePicUrl:{type:String},

     newMessagePropup: {type:Boolean,default:true},

     unreadMessage:{type:Boolean,default:false},

     unreadNotification:{type:Boolean,default:false},

     role:{type:String,default:"user", enum:['user','root']},

     resetToken:{type:String},

     expireToken:{type:Date}

},
{timestamps:true}
);
module.exports = mongoose.model("User", UserSchema)