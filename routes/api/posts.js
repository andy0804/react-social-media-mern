const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route GET api/posts
// @desc Test route
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Something went wrong");
  }
});
// @route GET api/posts
// @desc Test route
// @access Public
router.get("/:id", auth, async (req, res) => {
  try {
    const posts = await Post.findOne({ user: req.params.id }).sort({
      date: -1,
    });

    res.json(posts);
  } catch (error) {
    if (error.kind === "ObjectId")
      return res.status(404).json("Post not found");

    console.log(error.message);
    res.status(500).json("Something went wrong");
  }
});

router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check user
    console.log("Rec");

    if (post.user.toString() !== req.user.id)
      res.status(401).json({ msg: "User not authorized" });

    await post.remove();
    res.json({ msg: "Post removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong");
  }
});

module.exports = router;
