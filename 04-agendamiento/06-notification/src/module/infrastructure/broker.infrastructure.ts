import BrokerBootstrap from "../../bootstrap/broker.bootstrap";
import logger from "../../helpers/Logger";
import Parameters from "../../helpers/Parameters";
import { BrokerRepository } from "../domain/repositories/broker.repository";

export class BrokerInfrastructure implements BrokerRepository {
  /* async sent(message: unknown, routingKey: string) {
    const channel = BrokerBootstrap.channel;
    const exchangeName = Parameters.EXCHANGE_NAME;
    const exchangeType = Parameters.EXCHANGE_TYPE;
    const exchangeOptions = { durable: false };

    await channel.assertExchange(exchangeName, exchangeType, exchangeOptions);
    channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(message))
    );
  } */
  async receive() {
    const channel = BrokerBootstrap.channel;
    const exchangeNotificationName = Parameters.EXCHANGE_NOTIFICATION_NAME;

    await channel.assertExchange(exchangeNotificationName, "direct", {
      durable: false,
    });

    const queue = await channel.assertQueue("", { exclusive: true });
    await channel.bindQueue(queue.queue, exchangeNotificationName, "");

    channel.consume(
      queue.queue,
      (message) => {
        logger.info(`message received: ${message.content.toString()}`);
        channel.ack(message);
      },
      {
        noAck: false,
      }
    );
  }
}
