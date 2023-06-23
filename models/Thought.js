const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // .get to format timestamp
    },
  },
);

// formats the createdAt date to the local time
reactionSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt.toLocaleString();
});

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// formats the createdAt date to the local time
thoughtSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt.toLocaleString();
});

// returns the length of the thought's 'reactions' array
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
})

// may not need to export the Reaction schema since it is a subSchema
const Thought = model('Thought', thoughtSchema);
const Reaction = model('Reaction', reactionSchema)

module.exports = Thought ;
