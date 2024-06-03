const express = require("express");
const router = express.Router();

const info = require("../schema/info");
const posts = require("../schema/post");
const fetchuser = require('../middleware/fetchuser');

router.post('/', fetchuser, async (req, res) => {
    try {
        const { infoid, postid } = req.body;

        // Find the user from the info collection
        const user = await info.findById(infoid);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Find the post from the post collection
        const post = await posts.findById(postid);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        // Check if the user has already liked the post
        if (post.LikedBy.some(likedBy => likedBy.userid === user._id.toString())) {
            return res.status(400).send("Already liked");
        }

        // Add the user to the list of users who liked the post
        post.LikedBy.push({ likedby: user.RealName, userid: user._id.toString() });

        // Increment the likes count
        post.likesCount += 1;

        // Save the updated post
        await post.save();

        res.status(200).send("Like successful");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
