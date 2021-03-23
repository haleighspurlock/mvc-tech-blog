const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

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

// get one post
router.get('/post/:id', async (req, res) => {
    // if user is not logged in, redirect user to login page
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else{
        // if user is logged in, show the post
        try {
            const dbPostData = await Post.findByPk(req.params.id, {
                include: [
                    {
                        model: Comment,
                        attributes: ['comment_body', 'comment_date'],
                    },
                ],
            });
            const post = dbPostData.get({ plain: true });
            res.render('post', { post, loggedIn: req.session.loggedIn });
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

// create new post
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create(req.body);
        res.status(200).json(CategoryData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update a post
router.put('/:id', async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!postData) {
            res.status(404).json({message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    }   catch(err) {
        res.status(500).json(err);
    }
});

// delete a post
router.delete('/:id', (req, res) => {
    try {
        const postData = await Post.destroy ({
            where: {
                id: req.params.id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;