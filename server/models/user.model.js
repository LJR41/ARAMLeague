// 1. import mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 2.1 create the schema with all keys & validation
const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "First name is required"],
        minlength: [2, "First name must be 2 characters or more "]
    },
    lastName:{
        type: String,
        required: [true, "Last name is required"],
        minlength: [2, "Last name must be 2 characters or more "]
    },
    displayName:{
        type: String,
        required: [true, "Username is required"],
        minlength: [2, "Display name must be 2 characters or more "]
    },
    matches: [{
        type: Schema.Types.ObjectId,
        ref: "Match"
    }],
    userEarnings:[{
        type: Schema.Types.UserId,
        ref: "userEarnings"
    }]
    
}, {timestamps: true,}) // 2.2 enable the timestamp for createdAt & updatedAt


// 3. create a mongoose model based on the schema & export it
const User = mongoose.model('User', UserSchema)

module.exports = User