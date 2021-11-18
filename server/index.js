require("dotenv").config();
const debug = require("debug")("twiter:server");
const chalk = require("chalk");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const tweetsRoutes = require("./routes/tweetsRoutes");

const app = express();

const InitializeServer = (port) =>
  new Promise((resolve, reject) => {
    console.log(port);
    const server = app.listen(port, () => {
      debug(chalk.yellow(`Server on, lisen at ${port}`));
      console.log("corriendo server");
      resolve(server);
    });
    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`El puerto${port} esta en uso`));
      }
      debug(chalk.red("Error tring to conect the server"));
      reject();
    });
  });

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/tweets", tweetsRoutes);

module.exports = { InitializeServer, app };
