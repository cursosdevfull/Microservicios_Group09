// server nodejs
// database
// message broker
import app from "./app";
import DatabaseBootstrap from "./bootstrap/database.bootstrap";
import ServerBootstrap from "./bootstrap/server.bootstrap";
import logger from "./helpers/Logger";

const server = new ServerBootstrap(app);
const database = new DatabaseBootstrap();

(async () => {
  try {
    const promiseBootstraps = [server.initialize(), database.initialize()];

    await Promise.all(promiseBootstraps);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
})();
