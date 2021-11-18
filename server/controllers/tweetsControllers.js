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

const deleteTweet = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Tweet.findByIdAndDelete(id);
    res.json(`${id} deleted`);
  } catch (error) {
    error.message = "Objeto no válido, espabila!";
    error.code = 400;
    next(error);
  }
};

const addLike = async (req, res, next) => {
  const { id } = req.body;

  try {
    const tuit = await Tweet.findById(id);
    tuit.likes += 1;
    await tuit.save();
    const tuitLiked = await Tweet.findOne({ _id: id });
    res.json(tuitLiked);
  } catch (error) {
    error.code = 400;
    error.message = "Not found!";
    next(error);
  }
};

module.exports = {
  getTweets,
  createTweets,
  deleteTweet,
  addLike,
};
