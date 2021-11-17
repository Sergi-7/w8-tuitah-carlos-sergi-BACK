const initiateDB = require("./database");
const InitializeServer = require("./server");
require("dotenv").config();

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 6666;

(async () => {
  try {
    await InitializeServer(port);
    await initiateDB(process.env.MONGO_DB);
  } catch (error) {
    process.exit(1);
  }
})();
