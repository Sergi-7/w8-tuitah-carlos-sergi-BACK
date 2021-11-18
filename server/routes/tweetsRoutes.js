const express = require("express");
const {
  getTweets,
  createTweets,
  deleteTweet,
  addLike,
  getTweet,
} = require("../controllers/tweetsControllers");

const router = express.Router();

router.get("/", getTweets);
router.get("/:id", getTweet);
router.post("/new", createTweets);
router.delete("/delete/:id", deleteTweet);
router.patch("/like", addLike);

module.exports = router;
