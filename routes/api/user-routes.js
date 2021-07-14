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
    .delete(deleteUser)

router
    .route('/:id/friends/:friendId')
    .post(updateUserFriend)
    .put(deleteUserFriend);


module.exports = router;