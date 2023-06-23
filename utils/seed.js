const { User, Thought } = require('../models');
const users = require('./userData.js');
const thoughts = require('./thoughtData');
const connection = require('../config/connection.js');

console.time('seeding');

// Creates a connection to mongodb
connection.once('open', async () => {
  try {
    // Clear existing data if necessary
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create users
    for (const userObj of users) {
      const user = await User.create(userObj);

      console.log(`User created with ID: ${user._id}`);
    }

    console.log('Users seeding completed successfully.');

    // Create thoughts
    for (const thoughtObj of thoughts) {
      const thought = await Thought.create(thoughtObj);

      console.log(`Thought created with ID: ${thought._id}`);
    }

    console.log('Thoughts seeding completed successfully.');
  } catch (error) {
    console.error('Seeding error:', error);
  }
});

seedDatabase();