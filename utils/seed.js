const { User } = require('../models');
const userData = require('./userData');
const mongoose = require('mongoose');

console.time('seeding');

// MongoDB connection URI
const uri = 'mongodb://localhost/mydatabase';

// Creates a connection to MongoDB
const seedDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await User.deleteMany({});

    // Create users
    for (const userObj of userData) {
      const user = await User.create(userObj);
      console.log(`User created with ID: ${user._id}`);
    }

    console.log('Users seeding completed successfully.');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    console.timeEnd('seeding');
    mongoose.disconnect(); // Disconnect from MongoDB after seeding
  }
};

seedDatabase();