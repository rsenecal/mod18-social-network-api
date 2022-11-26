const { Schema, model, Types } = require('mongoose');


const ReactionSchema = new Schema({
    reactionid: { 
        type: Schema.Types.ObjectId,
        default: () =>  new Types.ObjectId(),
    
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

const ThoughtSchema = new Schema(
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



ThoughtSchema.virtual('reactionCount').get(function (){
    return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema);
// const handeleError = (err) => console.error(err);

module.exports = Thought;