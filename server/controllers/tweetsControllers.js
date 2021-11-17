const Tweet = require("../../database/models/tweet");

const getTweets = async (req, res) => {
  const tweets = await Tweet.find();
  res.json(tweets);
};

const createTweets = async (req, res, next) => {
  try {
    const tweet = req.body;
    const newTweet = await Tweet.create(tweet);
    res.json(newTweet);
  } catch {
    const error = new Error(
      "There was an error when trying to create a new Tweet"
    );
    error.code = 400;
    next(error);
  }
};

module.exports = {
  getTweets,
  createTweets,
};
