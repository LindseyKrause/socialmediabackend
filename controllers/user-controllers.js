const { User } = require('../Models')

//user Routes -------------------------------------
const userController = {
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
    
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    postNewUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
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
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
    //friend routes------------------------------------

    //named as "update" because it is updating a user to add a friend to it, however this is the "Add Friend" functionality. 
    updateUserFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $addToSet: { friends: params.friendId } }, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    deleteUserFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $pull: {friends: params.friendId}})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
};

module.exports = userController;