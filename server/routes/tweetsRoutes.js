const express = require("express");
const {
  getTweets,
  createTweets,
  deleteTweet,
  addLike,
} = require("../controllers/tweetsControllers");

const router = express.Router();

router.get("/", getTweets);
router.post("/new", createTweets);
router.delete("/delete/:id", deleteTweet);
router.patch("/like", addLike);

module.exports = router;
