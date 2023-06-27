const { User, Thought } = require('../models');
const userData = require('./userData');
const thoughtData = require('./thoughtData');
const mongoose = require('mongoose');

console.time('seeding');

// MongoDB connection URI
const uri = 'mongodb://127.0.0.1:27017/social-network';

// Creates a connection to MongoDB
const seedDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create users
    for (const userObj of userData) {
      const user = await User.create(userObj);
      console.log(`User created with ID: ${user._id}`);
    }

    for (const thoughtObj of thoughtData) {
      const thought = await Thought.create(thoughtObj);
      console.log(`Thought created with ID: ${thought._id}`);
    }

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    console.timeEnd('seeding');
    mongoose.disconnect(); // Disconnect from MongoDB after seeding
  }
};

seedDatabase();