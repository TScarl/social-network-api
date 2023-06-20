const router = require('express').Router();

// /api/thoughts
//  get all thoughts

//  get single thought by _id

// post to create a new thought (must $push new thought _id to user's 'thoughts' field)

// put by _id

// delete by _id



// /api/thoughts/:thoughtId/reactions
// post to create reaction stored in a single thought's 'reactions' field

// delete to $pull a reaction by the reaction's 'reactionId' value.. field?