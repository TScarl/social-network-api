const router = require('express').Router();

// all routes for user
const {
    getUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController.js');

// /api/user
// get all users, create new user
router.route('/').get(getUsers).post(createUser);

// /api/user/:userId
// get single user, update user, delete user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/user/:userId/friends/:friendId
// add friend, delete friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

//get a single user (_id), populate thought and friend data

// post a new user

// put a user

// delete a user

// bonus: remove a users associated thoughts when deleted


// /api/users/:userId/friends/:friendId
// post to add a new friend to friend list

// delete to remove a friend from friend list

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser);

module.exports = router;
