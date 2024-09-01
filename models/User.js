const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter username'],
        unique: true
    },
    password: { 
        type: String, 
        required: [true,"Please enter password"]
    },
    profile: {
        type : String,
        required: [true,'Please enter profile']
    }
})

// Auto Hashing Password
UserSchema.pre('save', async function(next){   
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10)  
    next() 
})

module.exports = mongoose.model('User',UserSchema)