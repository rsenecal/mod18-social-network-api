const { Schema, model, Types } = require('mongoose');


const ReactionSchema = new Schema({
    reactionid: { 
        type: Schema.Types.ObjectId,
        default: () =>  new mongoose.Types.ObjectId(),
    
    },
    reactionBody: 
        { 
            type: String,
            required: true,
            maxlength: 280,
        },

    username: 
    { 
        type: String,
        required: true,
    },
    createdAt: 
    { 
        type: Date,
        default: Date.now,
        // We need to add a getter to format the dateTime
    },
    
},

{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

constThoughtSchema = new Schema(
    {
        thoughtText: 
        {
            type: String,
            required: true,
            minlength: 1,
            maxlenght: 280,
        },

        createdAt: 
        { 
            type: Date,
            default: Date.now,
            // We need to add a getter to format the dateTime
        },
        username:
        {
            type: String,
            required: true,
        },
       
        reactions: [ReactionSchema],

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

UserSchema.virtual('reactionCount').get(function (){
    return this.friends.length
})

const User = mongoose.model('Thought', ThoughtSchema);
const handeleError = (err) => console.error(err);

module.exports = Thought;