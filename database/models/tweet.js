const { Schema, model } = require("mongoose");

const tweetSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Tweet = model("Tweet", tweetSchema, "tuits");

module.exports = Tweet;
