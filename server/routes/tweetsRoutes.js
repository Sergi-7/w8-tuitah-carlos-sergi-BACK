const express = require("express");
const { getTweets, createTweets } = require("../controllers/tweetsControllers");

const router = express.Router();

router.get("/", getTweets);
router.post("/new", createTweets);

module.exports = router;
