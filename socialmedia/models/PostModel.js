const mongoose = require('mongoose')
const Schema = mongoose.Schema


const PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },

    text: { type: String, required: true },

    location: { type: String },

    likes: [{ user: { type: Schema.Types.ObjectId, ref: 'User' } }],

    comments: [{
        _id: { type: String, requied: true },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true },
        date: { type: Date, default: Date.now },
    }]



}, { timeStamps: true })

module.exports = mongoose.model('post', PostSchema)