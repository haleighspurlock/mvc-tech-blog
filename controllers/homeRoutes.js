const router = require('express').Router();
const { Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        res.render('dashboard', {
            logged_in: req.session.logged_in,
        });
    }   catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        res.render('dashboard', {
            logged_in: req.session.logged_in,
        });
    }   catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/posts', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            // include: [
            //     {
            //         model: Comment,
            //         attributes: ['comment_body', 'comment_date'],
            //     },
            // ],
        });

        const posts = dbPostData.map((post) =>post.get({ plain: true }));
        console.log(posts)
        res.render('post', {
            logged_in: req.session.logged_in,
            posts,
        });
    }   catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// get one post
router.get('/post/:id', async (req, res) => {
    // // if user is not logged in, redirect user to login page
    // if (!req.session.loggedIn) {
    //     res.redirect('/login');
    // } else{
    //     // if user is logged in, show the post
    //     try {
    //         const dbPostData = await Post.findByPk(req.params.id, {
    //             include: [
    //                 {
    //                     model: Comment,
    //                     attributes: ['comment_body', 'comment_date'],
    //                 },
    //             ],
    //         });
    //         const post = dbPostData.get({ plain: true });
    //         res.render('post', { post, loggedIn: req.session.loggedIn });
    //     } catch(err) {
    //         console.log(err);
    //         res.status(500).json(err);
    //     }
    // }
});

//get all comments
// router.get('/', async (req, res) => {
    // try {
    //     const dbCommentData = await Comment.findAll({
    //         include: [
    //             {
    //                 model: Post,
    //                 attributes: ['post_title', 'post_date'],
    //             },
    //         ],
    //     });

    //     const comments = dbCommentData.map((comment) =>
    //     comment.get({ plain: text })
    //     );

    //     res.render('homepage', {
    //         comments,
    //         loggedIn: req.sessions.loggedIn,
    //     });
    // }   catch (err) {
    //     console.log(err);
    //     res.status(500).json(err);
    // }
// });

// get one comment
router.get('/comment/:id', async (req, res) => {
    // // if user is not logged in, redirect user to login page
    // if (!req.session.loggedIn) {
    //     res.redirect('/login');
    // } else {
    //     // if user is logged in, show the comment
    //     try {
    //         const dbCommentData = await Comment.findByPk(req.params.id, {
    //             includes: [
    //                 {
    //                     model: Post,
    //                     attributes: ['post_title', 'post_date'],
    //                 },
    //             ],
    //         });

    //         const comment = dbCommentData.get({ plain: true });
    //         res.render('post', { comment, loggedIn: req.session.loggedIn });
    //     } catch(err) {
    //         console.log(err);
    //         res.status(500).json(err);
    //     }
    // }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;