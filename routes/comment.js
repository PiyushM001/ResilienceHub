const express = require("express");
const router = express.Router();
const Speakup = require("../schema/speakup");
const fetchuser = require("../middleware/fetchuser");

// Fetch all speakup posts
router.get("/", async (req, res) => {
  try {
    const information = await Speakup.find();
    if (!information) {
      return res.status(404).send("No information found");
    }
    res.json(information);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Create a new speakup post
router.post("/pos", fetchuser, async (req, res) => {
  const { description } = req.body;
  try {
    const information = await Speakup.create({ description });
    return res.status(200).json(information);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Add a comment to a speakup post
router.post("/:id/comment", fetchuser, async (req, res) => {
  const { text } = req.body;
  const userId = req.user.id; // Assuming fetchuser middleware sets req.user
  try {
    const speakupPost = await Speakup.findById(req.params.id);
    if (!speakupPost) {
      return res.status(404).send("Speakup post not found");
    }

    const newComment = {
      user: userId,
      text
    };

    speakupPost.comments.push(newComment);
    await speakupPost.save();

    res.status(200).json(speakupPost);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Fetch comments for a specific speakup post
router.get("/:id/comments", async (req, res) => {
  try {
    const speakupPost = await Speakup.findById(req.params.id).populate("comments.user", "name"); // Assuming the User model has a name field
    if (!speakupPost) {
      return res.status(404).send("Speakup post not found");
    }

    res.status(200).json(speakupPost.comments);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
