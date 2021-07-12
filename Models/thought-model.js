const { Schema, model, Types } = require('mongoose');

const ThoughSchema = new Schema(
    {
        thoughtId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'reaction'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.reduce(
        (total, reaction) => total + reaction.replies.length + 1,
        0
    );
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;

