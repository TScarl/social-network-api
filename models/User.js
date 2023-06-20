const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      // required means the username must be in the req.body
      required: true,
      // unique ensures there are no duplicate usernames
      unique: true,
      //  trimmed removes any white spaces at the beginning and end of the string
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
       // regex could search for pattern like: abs3$@gmailcom
      match: [/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Please enter a valid email address']
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
  },
  {
    // getters will be included when User model is displayed in JSON format
    toJSON: {
      getters: true,
    },
  }
);

// retrieves length of the users friends array.
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
