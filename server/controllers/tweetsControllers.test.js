const { getTweets } = require("./tweetsControllers");
const Tweet = require("../../database/models/tweet");

describe("Given a getTweets controller", () => {
  describe("When it an object res", () => {
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
