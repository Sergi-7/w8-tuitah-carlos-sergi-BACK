require("dotenv").config();
const debug = require("debug")("twiter:test");
const chalk = require("chalk");
const mongoose = require("mongoose");
const supertest = require("supertest");
const { InitializeServer, app } = require("..");

const initiateDB = require("../../database");
const Tweet = require("../../database/models/tweet");

const request = supertest(app);

let server;

beforeAll(async () => {
  await initiateDB(process.env.MONGO_DB_TEST);
  await Tweet.deleteMany();
  server = await InitializeServer(4000);
});

beforeEach(async () => {
  await Tweet.deleteMany();
  await Tweet.create({
    text: "tweet numero 1",
  });
  await Tweet.create({
    text: "tweet numero 2",
  });
});

afterEach(async () => {
  await mongoose.connection.on("close", () => {
    debug(chalk.red("Database connection ended"));
    console.log("data base test on");
  });

  await server.on("close", () => {
    debug(chalk.red("Server conection ended"));
    console.log("server off");
  });
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.connection.close();
    console.log("data base off");
    done();
  });
});

describe("Given a tweets/", () => {
  describe("When it get a GET request ", () => {
    test("Then it should send a response with an array of documents and a status code of 200", async () => {
      await request.get("/tweets/").expect(200);
    });
  });
});

describe("Given a tweets/new", () => {
  describe("When it get a POST request ", () => {
    test("Then it should send a response with an array of documents and a status code of 200", async () => {
      await request
        .post("/tweets/new")
        .send({ text: "Hola Mundo" })
        .expect(200);
    });
  });

  describe("When it get a POST request whit a wrong end point ", () => {
    test("Then it should send a response with a status", async () => {
      await request
        .post("/tweets/nrw")
        .send({ texto: "Hola Mundo" })
        .expect(404);
    });
  });
});
