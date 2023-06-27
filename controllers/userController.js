const { User, Thought } = require('../models');
const router = require("express").Router();

// /api/user
//  get all users
const getUsers = ("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot retrieve users" });
  }
});

//get a single user (_id), populate thought and friend data
const getSingleUser = ("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot retrieve user" });
  }
});

// post a new user
const createUser = ("/", async (req, res) => {
  try {
    const { email, username } = req.body;
    const newUser = await User.create({
      email,
      username,
    });

    res.status(201).json({ message: "User created!" })
  } catch (err) {
    console.error(err); 
    res.status(400).json({ message: "Failed to create user" });
  }
});

// put a user
const updateUser = ('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, thoughts, friends } = req.body;

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { username, email, thoughts, friends },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "user updated successfully" })
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to update user" });
  } 
});

// delete a user
const deleteUser = ('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.deleteOne({ _id: userId });
    res.status(200).json({ message: "User deleted!" });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Failed to delete user" });
  }
});

// bonus: remove a users associated thoughts when deleted... shouldn't be a separate controller...
const deleteAssociatedThoughts = ('/delete/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" })
    }

    await Thought.deleteMany({ username: deletedUser.username });

    res.status(200).json({ message: "User and thoughts deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete user and thoughts" });
  }
});

// /api/users/:userId/friends/:friendId
// post to add a new friend to friend list
const addFriend = ('/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const { email, username } = req.body;

    const friend = {
      email,
      username,
    };

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { friends: friend } },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({ message: "Friend added" });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Failed to add friend" });
  }
});

  // delete to remove a friend from friend list
  const deleteFriend = ('/:userId/friends/:friendId', async (req, res) => {
    try {
      const { userId, friendId } = req.params;

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: { _id: friendId } } },
        { new: true },
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      res.status(200).json({ message: "Friend deleted, permanently!" });
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: "Failed to remove friend" });
    }
  });

  module.exports = {
    getUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    deleteAssociatedThoughts,
    addFriend,
    deleteFriend,
  };