const router = require('express').Router();
const { Post } = require('../../models');


// create new post
router.post('/', async (req, res) => {
    try {
        const dbPostData = await Post.create({
            post_title: req.body.title,
            post_date: Date.now(),
            post_body: req.body.content,
            user_id: req.session.user_id
        });
        res.status(200).json(dbPostData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update a post
router.put('/:id', async (req, res) => {
    // try {
    //     const postData = await Post.update(req.body, {
    //         where: {
    //             id: req.params.id,
    //         },
    //     });

    //     if (!postData) {
    //         res.status(404).json({message: 'No post found with this id!' });
    //         return;
    //     }

    //     res.status(200).json(postData);
    //     }   catch(err) {
    //         res.status(500).json(err);
    //     }
});

// delete a post
router.delete('/:id', async (req, res) => {
    // try {
    //     const postData = await Post.destroy ({
    //         where: {
    //             id: req.params.id,
    //         },
    //     });

    //     if (!postData) {
    //         res.status(404).json({ message: 'No post found with this id!' });
    //         return;
    //     }

    //     res.status(200).json(postData);
    //     } catch(err) {
    //         res.status(500).json(err);
    //     }
});

module.exports = router;