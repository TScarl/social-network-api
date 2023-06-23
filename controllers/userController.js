const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

userSchema.methods.populateThoughts = function () {
  return this.populate({
    path: 'thoughts',
    options: { sort: { createdAt: -1 } },
    populate: {
      path: 'reactions',
      model: 'Reaction',
    },
  }).execPopulate();
};

//get a single user (_id), populate thought and friend data

// post a new user

// put a user

// delete a user

// bonus: remove a users associated thoughts when deleted

// /api/users/:userId/friends/:friendId
// post to add a new friend to friend list

// delete to remove a friend from friend list







// module.exports = {
//   // Get all courses
//   getCourses(req, res) {
//     Course.find()
//       .then((courses) => res.json(courses))
//       .catch((err) => res.status(500).json(err));
//   },
//   // Get a course
//   getSingleCourse(req, res) {
//     Course.findOne({ _id: req.params.courseId })
//       .select('-__v')
//       .then((course) =>
//         !course
//           ? res.status(404).json({ message: 'No course with that ID' })
//           : res.json(course)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
//   // Create a course
//   createCourse(req, res) {
//     Course.create(req.body)
//       .then((course) => res.json(course))
//       .catch((err) => {
//         console.log(err);
//         return res.status(500).json(err);
//       });
//   },
//   // Delete a course
//   deleteCourse(req, res) {
//     Course.findOneAndDelete({ _id: req.params.courseId })
//       .then((course) =>
//         !course
//           ? res.status(404).json({ message: 'No course with that ID' })
//           : Student.deleteMany({ _id: { $in: course.students } })
//       )
//       .then(() => res.json({ message: 'Course and students deleted!' }))
//       .catch((err) => res.status(500).json(err));
//   },
//   // Update a course
//   updateCourse(req, res) {
//     Course.findOneAndUpdate(
//       { _id: req.params.courseId },
//       { $set: req.body },
//       { runValidators: true, new: true }
//     )
//       .then((course) =>
//         !course
//           ? res.status(404).json({ message: 'No course with this id!' })
//           : res.json(course)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
// };




// const User = mongoose.model('User', userSchema);

// // Populate the thoughts field for a specific user
// User.findById(userId)
//   .populate('thoughts')
//   .exec((err, user) => {
//     if (err) {
//       // Handle the error
//     } else {
//       // Access the populated thoughts array
//       console.log(user.thoughts);
//     }
//   });



// // Populate the friends field for a specific user
// User.findById(userId)
//   .populate('friends')
//   .exec((err, user) => {
//     if (err) {
//       // Handle the error
//     } else {
//       // Access the populated friends array
//       console.log(user.friends);
//     }
//   });