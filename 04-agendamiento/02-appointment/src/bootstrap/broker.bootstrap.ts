import amqp from "amqplib";

import logger from "../helpers/Logger";
import Parameters from "../helpers/Parameters";
import { Bootstrap } from "./bootstrap";

export default class BrokerBootstrap extends Bootstrap {
  static channel: amqp.Channel;

  initialize(): Promise<boolean | Error> {
    return new Promise(async (resolve, reject) => {
      const host = Parameters.RABBIT_HOST;

      try {
        const connection = await amqp.connect(`amqp://${host}`);
        BrokerBootstrap.channel = await connection.createChannel();
        logger.info("Connected to RabbitMQ");
        resolve(true);
      } catch (error) {
        logger.info("Failed to connect to RabbitMQ");
        reject(error);
      }
    });
  }
}
