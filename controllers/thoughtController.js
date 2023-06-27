const { User, Thought } = require('../models');
const router = require("express").Router();

//  /api/thought
//  get all thoughts
const getThoughts = ("/", async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot retrieve thoughts" });
  }
});

//  get single thought by _id
const getSingleThought = ("/:thoughtId", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot retrieve thought" });
  }
});

// post to create a new thought (must $push new thought_id to user's 'thoughts' field)
const createNewThought = ("/", async (req, res) => {
  try {
    const { thoughtText, username } = req.body;
    const thought = await Thought.create({
      thoughtText,
      username,
    });

    const user = await User.findOneAndUpdate(
      { username },
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    res.status(400).json({ message: "Thought created!" })
  } catch (err) {
    res.status(400).json(err);
  }
});

// put by _id
const updateThought = ('/:thoughtId', async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { thoughtText } = req.body;

    const thought = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      { thoughtText },
      { new: true },
    );

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }

    res.redirect("/");
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete by _id
const deleteThought = ('/:thoughtId', async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const thought = await Thought.deleteOne({ _id: thoughtId });
    res.status(200).json({ message: "Thought deleted!" });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Failed to delete thought" });
  }
});

// /api/thought/:thoughtId/reaction
// post to create reaction stored in a single thought's 'reactions' field
const createReaction = ('/:thoughtId/reaction', async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    const reaction = {
      reactionBody,
      username,
    };

    const thought = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $push: { reactions: reaction } },
      { new: true },
    );

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" })
    }

    res.status(200).json({ message: "Reaction created" });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Failed to create reaction" });
  }
});

// delete to $pull a reaction by the reaction's 'reactionId' field
const deleteReaction = ('/:thoughtId/reaction/:reactionsId', async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;

    const thought = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $pull: { reactions: { reactionId: reactionId } } },
      { new: true },
    );

    if (!thought) {
      return res.status(404).json({ message: "Thought not found" })
    }

    res.status(200).json({ message: "Reaction deleted" });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Failed to delete reaction" });
  }
});

module.exports = {
  getThoughts,
  getSingleThought,
  createNewThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
}