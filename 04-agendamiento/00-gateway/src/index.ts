import app from "./app";
import ServerBootstrap from "./bootstrap/server.bootstrap";
import logger from "./helpers/Logger";

const server = new ServerBootstrap(app);

(async () => {
  try {
    const promiseBootstraps = [server.initialize()];

    await Promise.all(promiseBootstraps);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
})();
