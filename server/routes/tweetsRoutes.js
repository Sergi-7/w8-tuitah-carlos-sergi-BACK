const express = require("express");
const {
  getTweets,
  createTweets,
  deleteTweet,
} = require("../controllers/tweetsControllers");

const router = express.Router();

router.get("/", getTweets);
router.post("/new", createTweets);
router.delete("/delete/:id", deleteTweet);

module.exports = router;
