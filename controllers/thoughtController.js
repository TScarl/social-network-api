const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');
const router = require("express").Router();

//  /api/thought
//  get all thoughts
router.get("/", async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot retrieve thoughts" });
  }
});

//  get single thought by _id
router.get("/:thoughtId", async (req, res) => {
  try {
    const thought = await Thought.findById(id = req.params.thoughtId);
    if(!thought) {
      return res.status(404).json({ message: "Thought not found"});
    }
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cannot retrieve thought" });
  }
});

// post to create a new thought (must $push new thought_id to user's 'thoughts' field)
router.post("/", async (req, res) => {
  try {
    const thought = await Thought.create({
      thoughtText,
    });

    // user authentication logic
    const user = await User.findOneAndUpdate({
      where: { id: _id },
    });
    $push thought to user;

    // save session variables and redirect to the main page once saved
    res.redirect("/");
  } catch (err) {
    res.status(400).json(err);
  }
});

// put by _id
router.put('/:thoughtId', async (req, res) => {
  try {
    const thought = await thought.findOneAndUpdate({
      where: { _id: req.params.id },
    });
    thoughtText = req.body;
    update thought with req.body
      res.redirect("/");
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete by _id
router.delete('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.deleteOne({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Thought deleted!" });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Failed to delete thought" });
  }
});

// /api/thought/:thoughtId/reaction
// post to create reaction stored in a single thought's 'reactions' field
router.post('/:thoughtId/reaction', async (req, res) =>{
  try {
    const reaction = await Thought findOne({
      where: { id: req.params.id },
    });
    fill reaction field with reaction

    res.status(200).json({ message: "Reaction created" });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Failed to create reaction" });
  }
});
// delete to $pull a reaction by the reaction's 'reactionId' field
router.delete('/:thoughtId/reaction', async (req, res) =>{
  try {
    const reaction = await Thought findOne({
      where: { id: req.params.id },
    });
    fill reaction field with reaction

    res.status(200).json({ message: "Reaction deleted" });
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Failed to delete reaction" });
  }
});

module.exports = router;


// module.exports = {
//   getThoughts(req, res) {
//     Post.find()
//       .populate('User')
//       .then((friends) => res.json(friends))
//       .catch((err) => {
//         console.error({ message: err });
//         return res.status(500).json(err);
//       });
//   },
//   populateThoughts = function () {
//     return this.populate({
//       path: 'thoughts',
//       options: { sort: { createdAt: -1 } },
//       populate: {
//         path: 'reactions',
//         model: 'Reaction',
//       },
//     }).execPopulate();
//   };
//   getSinglePost(req, res) {
//     Post.findOne({ _id: req.params.postId })
//       .then((post) =>
//         !post
//           ? res.status(404).json({ message: 'No post with that ID' })
//           : res.json(post)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
//   // create a new post
//   createPost(req, res) {
//     Post.create(req.body)
//       .then((post) => res.json(post))
//       .catch((err) => res.status(500).json(err));
//   },
// };






// const headCount = async () => {
//   try {
//     const numberOfStudents = await Student.aggregate([
//       {
//         $group: {
//           _id: null,
//           count: { $sum: 1 },
//         }
//       }
//     ])

//     return numberOfStudents[0].count;
//   } catch (err) {
//     console.error(err);
//     throw err
//   }
// }


// // Execute the aggregate method on the Student model and calculate the overall grade by using the $avg operator
// const grade = async (studentId) =>
//   Student.aggregate([
//     // TODO: Ensure we include only the student who can match the given ObjectId using the $match operator
//     { $match: { _id: new ObjectId(studentId) } },

//     {
//       $group: {
//         _id: null,
//         studentId: { $avg: '$score' },
//       }
//       // Your code here
//     },
//     {
//       $unwind: '$assignments',
//     },
//     // TODO: Group information for the student with the given ObjectId alongside an overall grade calculated using the $avg operator
//     {
//       // Your code here
//     },
//   ]);

// module.exports = {
//   // Get all students
//   getStudents(req, res) {
//     Student.find()
//       .then(async (students) => {
//         const studentObj = {
//           students,
//           headCount: await headCount(),
//         };
//         return res.json(studentObj);
//       })
//       .catch((err) => {
//         console.log(err);
//         return res.status(500).json(err);
//       });
//   },
//   // Get a single student
//   getSingleStudent(req, res) {
//     Student.findOne({ _id: req.params.studentId })
//       .select('-__v')
//       .lean()
//       .then(async (student) =>
//         !student
//           ? res.status(404).json({ message: 'No student with that ID' })
//           : res.json({
//             student,
//             grade: await grade(req.params.studentId),
//           })
//       )
//       .catch((err) => {
//         console.log(err);
//         return res.status(500).json(err);
//       });
//   },
//   // create a new student
//   createStudent(req, res) {
//     Student.create(req.body)
//       .then((student) => res.json(student))
//       .catch((err) => res.status(500).json(err));
//   },
//   // Delete a student and remove them from the course
//   deleteStudent(req, res) {
//     Student.findOneAndRemove({ _id: req.params.studentId })
//       .then((student) =>
//         !student
//           ? res.status(404).json({ message: 'No such student exists' })
//           : Course.findOneAndUpdate(
//             { students: req.params.studentId },
//             { $pull: { students: req.params.studentId } },
//             { new: true }
//           )
//       )
//       .then((course) =>
//         !course
//           ? res.status(404).json({
//             message: 'Student deleted, but no courses found',
//           })
//           : res.json({ message: 'Student successfully deleted' })
//       )
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   },

//   // Add an assignment to a student
//   addAssignment(req, res) {
//     console.log('You are adding an assignment');
//     console.log(req.body);
//     Student.findOneAndUpdate(
//       { _id: req.params.studentId },
//       { $addToSet: { assignments: req.body } },
//       { runValidators: true, new: true }
//     )
//       .then((student) =>
//         !student
//           ? res
//             .status(404)
//             .json({ message: 'No student found with that ID :(' })
//           : res.json(student)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
//   // Remove assignment from a student
//   removeAssignment(req, res) {
//     Student.findOneAndUpdate(
//       { _id: req.params.studentId },
//       { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
//       { runValidators: true, new: true }
//     )
//       .then((student) =>
//         !student
//           ? res
//             .status(404)
//             .json({ message: 'No student found with that ID :(' })
//           : res.json(student)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
// };
