const router = required('express').Router();
const { Post, Comment, User } = require('../models');

// get all posts
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            include: [
                {
                    model: Comment,
                    attributes: ['comment_body', 'comment_date'],
                },
            ],

        });

        const posts = dbPostData.map((post) =>
        post.get({ plain: true })
        );

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    }   catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});