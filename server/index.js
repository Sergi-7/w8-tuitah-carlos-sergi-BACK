require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("twiter:server");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const tweetsRoutes = require("./routes/tweetsRoutes");

const app = express();

const InitializeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellow(`Server on, lisen at ${port}`));
      resolve(server);
    });
    server.on("error", () => {
      debug(chalk.red("Error tring to conect the server"));
    });
    reject();
  });

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/tweets", tweetsRoutes);

module.exports = InitializeServer;
