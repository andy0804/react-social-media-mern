const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator/check");
const { restart } = require("nodemon");

// @route GET api/profile/me
// @desc Get current user profile
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res
        .status(400)
        .json({ message: "There is no profile for this user " });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).send("Server error");
  }
});
// @route POST api/profile
// @desc submit a profile
// @access Private
router.post(
  "/",
  auth,
  [
    check("status", "Status is required").not().isEmpty(),
    check("skills", "Skills are required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      linkedin,
      facebook,
      twitter,
      instagram,
    } = req.body;

    // build profile
    const profilefields = {};
    profilefields.user = req.user.id;

    if (company) profilefields.company = company;
    if (website) profilefields.website = website;
    if (location) profilefields.location = location;
    if (bio) profilefields.bio = bio;
    if (status) profilefields.status = status;
    if (githubusername) profilefields.githubusername = githubusername;
    if (skills) {
      profilefields.skills = skills.split(",").map((skill) => skill.trim());
    }
    // build social object
    console.log("Here.......");
    profilefields.social = {};
    if (youtube) profilefields.social.youtube = youtube;
    if (linkedin) profilefields.social.linkedin = linkedin;
    if (instagram) profilefields.social.instagram = instagram;
    if (facebook) profilefields.social.facebook = facebook;
    if (twitter) profilefields.social.twitter = twitter;

    try {
      console.log("Here find profile.......");

      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profilefields },
          { new: true }
        );

        return res.json(profile);
      }
      console.log("here", JSON.stringify(profilefields));
      //create
      profile = new Profile(profilefields);

      await profile.save();
      res.json(profile);
    } catch (e) {
      console.log(err.message);
    }
  }
);

// @route GET api/profile
// @desc  GET ALL PROFILES
// @access Profile
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Something went wrong");
  }
});

// @route GET api/profile
// @desc  GET  PROFILE by id
// @access Profile
router.get("/user/:user_id", async (req, res) => {
  try {
    const profiles = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profiles)
      return res.status(400).json({ msg: "There is no profile for this user" });

    res.json(profiles);
  } catch (error) {
    if (error.kind === "ObjectId")
      return res.status(400).json({ msg: "There is no profile for this user" });

    console.log(error.message);
    res.status(500).json("Something went wrong");
  }
});

// @route DELETE api/profile
// @desc  GET  PROFILE by id
// @access Profile
router.delete("/", auth, async (req, res) => {
  try {
    // @todo remove posts
    console.log("delete");
    console.log("id", req.user.id);
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Something went wrong");
  }
});

// @route   PUT api/profile/experience
// @desc  Add experience
// @access Private

router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is  required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = { title, company, location, from, to, current, description };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Something went wrong");
    }
  }
);

// @route   DELETE  api/profile/experience/exp_id
// @desc  delete experience
// @access Private

router.delete(
  "/experience/:exp_id",

  auth,
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      const removeIndex = profile.experience
        .map((item) => item.id)
        .indexOf(req.params.exp_id);
      profile.experience.splice(removeIndex, 1);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Something went wrong");
    }
  }
);
module.exports = router;
