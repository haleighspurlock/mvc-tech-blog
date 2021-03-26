const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const { post } = require('./user-routes');

// create a comment
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment_body: req.body.comment,
            comment_date: Date.now(),
            user_id: req.session.user_id,
            post_id: req.body.postId,
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// // update a comment
// router.put('/:id', async (req, res) => {
//     try {
//         const commentData = await Comment.update(req.body, {
//             where: {
//                 id: req.params.id,
//             },
//         });

//         if(!commentData) {
//             res.status(404).json({ message: 'No comment found with this id!' });
//             return;
//         }

//         res.status(200).json(commentData);
//     }   catch(err) {
//         res.status(500).json(err);
//     }
// });

// delete a comment
// router.delete('/:id', async (req, res) => {
//     try {
//         const commentData = await Comment.destroy ({
//            where: {
//                id: req.params.id,
//            },
//         });

//         if (!commentData) {
//             res.status(404).json({ message: 'No comment found with this id!' });
//             return;
//         }

//         res.status(200).json(commentData);
//         } catch (err) {
//             res.status(500).json(err);
//         }
// });

module.exports = router;