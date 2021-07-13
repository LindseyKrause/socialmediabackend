const { User } = require('../Models')

//user Routes -------------------------------------
const userController = {
    //todo get all users
    getAllUsers(req, res) {
        User.find({})
            // .select(-__v)
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    //todo get a single user by id and poppulated thought and friend data
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // todo post new user
    postNewUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
    // todo put to update user by _id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    //todo delete to remove user by its _id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
    //todo bonus: remove a user's associated thoughts when deleted
    //friend routes------------------------------------
    //todo post to add a new friend to a user's friend list
    updateUserFriend({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $push: { friends: body } }, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    //todo delete to remove a friend from user's friend list. 
    deleteUserFriend({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
};

module.exports = userController;