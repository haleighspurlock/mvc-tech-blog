const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const { post } = require('./user-routes');

//get all comments
router.get('/', async (req, res) => {
    try {
        const dbCommentData = await Comment.findAll({
            include: [
                {
                    model: Post,
                    attributes: ['post_title', 'post_date'],
                },
            ],
        });

        const comments = dbCommentData.map((comment) =>
        comment.get({ plain: text })
        );

        res.render('homepage', {
            comments,
            loggedIn: req.sessions.loggedIn,
        });
    }   catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// get one comment
router.get('/comment/id:', async (req, res) => {
    // if user is not logged in, redirect user to login page
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        // if user is logged in, show the comment
        try {
            const dbCommentData = await Comment.findByPk(req.params.id, {
                includes: [
                    {
                        model: Post,
                        attributes: ['post_title', 'post_date'],
                    },
                ],
            }),
            const comment = dbCommentData.get({ plain: true });
            res.render('comment', { comment, loggedIn: req.session.loggedIn });
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

// create a comment
router.put('/:id', async (req, res) => {
    try {
        const commentData = await Comment.create(req.body);
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update a comment
router.put('/:id', async (req, res) => {
    try {
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if(!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    }   catch(err) {
        res.status(500).json(err);
    }
});

// delete a post
router.delete('/:id', (req, res) => {
    try {
        const commentData = await Comment.destroy ({
           where: {
               id: req.params.id,
           },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
        } catch (err) {
            res.status(500).json(err);
        }
});

module.exports = router;