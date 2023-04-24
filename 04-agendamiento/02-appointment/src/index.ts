import app from "./app";
import BrokerBootstrap from "./bootstrap/broker.bootstrap";
import DatabaseBootstrap from "./bootstrap/database.bootstrap";
import ServerBootstrap from "./bootstrap/server.bootstrap";
import logger from "./helpers/Logger";
import { BrokerApplication } from "./module/application/broker.application";
import { BrokerRepository } from "./module/domain/repositories/broker.repository";
import { BrokerInfrastructure } from "./module/infrastructure/broker.infrastructure";
import BrokerController from "./module/interfaces/broker/broker.controller";

const server = new ServerBootstrap(app);
const database = new DatabaseBootstrap();
const broker = new BrokerBootstrap();

const brokerRepository: BrokerRepository = new BrokerInfrastructure();
const brokerApplication = new BrokerApplication(brokerRepository);
const brokerController = new BrokerController(brokerApplication);

(async () => {
  try {
    const promiseBootstraps = [
      server.initialize(),
      database.initialize(),
      broker.initialize(),
    ];

    await Promise.all(promiseBootstraps);

    brokerController.listen();
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
})();
