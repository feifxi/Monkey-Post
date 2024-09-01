const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true,"Please enter content"]
    },
    img: { 
        type: String,   
        required: [true,"Please enter img"] 
    },
    author: {   
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: [true,"Please enter author"]   
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', PostSchema)