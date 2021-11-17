const Tweet = require("../../database/models/tweet");

const getTweets = async (req, res) => {
  const tweets = await Tweet.find();
  res.json(tweets);
};

module.exports = {
  getTweets,
};
