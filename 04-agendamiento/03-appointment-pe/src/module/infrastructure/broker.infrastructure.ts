import BrokerBootstrap from "../../bootstrap/broker.bootstrap";
import logger from "../../helpers/Logger";
import Parameters from "../../helpers/Parameters";
import { BrokerRepository } from "../domain/repositories/broker.repository";

export class BrokerInfrastructure implements BrokerRepository {
  async sent(message: unknown, routingKey: string) {
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
  }
  async receive() {
    const channel = BrokerBootstrap.channel;
    const exchangeName = Parameters.EXCHANGE_NAME;
    const exchangeNameDLQ = Parameters.EXCHANGE_NAME_DLQ;
    const routingKeyDLQ = Parameters.ROUTING_KEY_DLQ;

    await channel.assertExchange(exchangeName, "direct", { durable: false });
    await channel.assertExchange(exchangeNameDLQ, "direct", { durable: false });

    const queue = await channel.assertQueue("", {
      exclusive: true,
      deadLetterExchange: exchangeNameDLQ,
      deadLetterRoutingKey: routingKeyDLQ,
    });
    await channel.bindQueue(queue.queue, exchangeName, "PE");

    channel.consume(
      queue.queue,
      (message) => {
        if (message !== null) {
          logger.info(message.content.toString());
          //channel.reject(message, false);
          channel.ack(message);
        }
      },
      { noAck: false }
    );

    const queueDLQ = await channel.assertQueue("", { exclusive: true });
    await channel.bindQueue(queueDLQ.queue, exchangeNameDLQ, routingKeyDLQ);

    channel.consume(
      queueDLQ.queue,
      (message) => {
        logger.info(`message failed: ${message.content.toString()}`);
        channel.ack(message);
      },
      {
        noAck: false,
      }
    );
  }
}
