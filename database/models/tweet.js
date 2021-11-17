const { Schema, model } = require("mongoose");

const tweetSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Tweet = model("Tweet", tweetSchema, "tuits");

module.exports = Tweet;
