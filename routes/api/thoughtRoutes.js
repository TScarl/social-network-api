const router = require('express').Router();

// all routes for thoughts and reactions
const {
    getThoughts,
    getSingleThought,
    createNewThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController.js');

// /api/thought
// get all thoughts, create new thought
router.route('/').get(getThoughts).post(createNewThought);

// /api/thought/:thoughtId
// get single thought, update thought, delete thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thought/:thoughtId/reaction
// create a reaction
router.route('/:thoughtId/reaction').post(createReaction)

// /api/thought/:thoughtId/reaction/:reactionId
// delete a reaction
router.route('/:thoughtId/reaction/reactionId').delete(deleteReaction);

module.exports = router;
