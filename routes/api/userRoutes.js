const router = require("express").Router();
// all routes for user
const {
    getUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    deleteAssociatedThoughts,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// /api/user
// get all users, create new user
router.route('/').get(getUsers).post(createUser);

// /api/user/:userId
// get single user, update user, delete user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser).delete(deleteAssociatedThoughts);

// /api/user/:userId/friends/:friendId
// add friend, delete friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;
