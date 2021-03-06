const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    postNewThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controllers');

router
    .route('/')
    .get(getAllThoughts)
    .post(postNewThought);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction);


module.exports = router;