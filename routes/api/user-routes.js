const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    postNewUser,
    updateUser,
    deleteUser,
    updateUserFriend,
    deleteUserFriend
} = require('../../controllers/user-controllers');

router
    .route('/')
    .get(getAllUsers)
    .post(postNewUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .put(updateUserFriend)
    .delete(deleteUser)
    .delete(deleteUserFriend);

module.exports = router;