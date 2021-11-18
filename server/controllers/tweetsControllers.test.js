const { getTweets, createTweets, deleteTweet } = require("./tweetsControllers");
const Tweet = require("../../database/models/tweet");

describe("Given a getTweets controller", () => {
  describe("When it receives an object res", () => {
    test("Then it should call the method json", async () => {
      const tuits = [
        { text: "aaa", likes: 2, date: "14/14/14" },
        { text: "eee", likes: 1, date: "15/11/12" },
      ];

      Tweet.find = jest.fn().mockResolvedValue(tuits);
      const res = {
        json: jest.fn(),
      };

      await getTweets(null, res);

      expect(Tweet.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(tuits);
    });
  });
});

describe("Given a createTweets controller", () => {
  describe("When it receives a request", () => {
    test("Then it should return a response with the new tweet created", async () => {
      const res = {
        json: jest.fn(),
      };

      const tuit = {
        text: "aaa",
        likes: 2,
        date: "14/14/14",
      };

      const req = {
        body: tuit,
      };
      Tweet.create = jest.fn().mockResolvedValue(tuit);

      await createTweets(req, res);

      expect(Tweet.create).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(tuit);
    });
  });
  describe("When it is invoked and it rejects", () => {
    test("Then it should call next with an error", async () => {
      const error = { code: 400 };
      Tweet.create = jest.fn().mockResolvedValue(null);
      const req = {
        body: {},
      };

      const res = {};
      const next = jest.fn();

      await createTweets(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });
});

describe("Given a deleteTweet function", () => {
  describe("When it receives a req", () => {
    test("Then it should call the method json", async () => {
      const req = {
        params: "61969114c2001f17f918785c",
      };

      const res = {
        json: jest.fn(),
      };

      Tweet.findByIdAndDelete = jest.fn().mockResolvedValue({});

      await deleteTweet(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When an error it´s reject", () => {
    test("Then it should call next", async () => {
      const req = {
        params: "61969114c2001f17f918785c",
      };
      const next = jest.fn();
      const error = new Error();
      Tweet.findByIdAndDelete = jest.fn().mockRejectedValue(error);

      await deleteTweet(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
