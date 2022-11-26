// const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    username: { 
        type: String, 
        required:true, 
        trim: true, 
        unique: true
    },
    email: { 
        type: String, 
        required: 'Please enter a valid email address', 
        match:/.+\@.+\..+/,
        unique: true
    },
    thoughts: [
        { 
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],

    friends: [
        { 
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
},

{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

// userSchema.path('email').validate(async (email) => {
//     const emailCount = await mongoose.models.User.countDocuments({ email})
//     return !emailCount
// }, 'Email is not Valid'

// )

UserSchema.virtual('friendCount').get(function (){
    return this.friends.length
})

const User = model('User', UserSchema);
// const handeleError = (err) => console.error(err);

module.exports = User;