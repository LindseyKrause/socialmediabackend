const { Schema } = require('mongoose');


const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            ref: 'reaction',
            // default: new ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    }
)

module.exports = ReactionSchema;