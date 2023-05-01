import BrokerBootstrap from "../../bootstrap/broker.bootstrap";
import logger from "../../helpers/Logger";
import { BrokerRepository } from "../domain/repositories/broker.repository";

export class BrokerApplication {
  constructor(private readonly repository: BrokerRepository) {
    this.consumer = this.consumer.bind(this);
  }

  receive() {
    this.repository.receive(this.consumer);
  }

  sent(message: unknown, routingKey: string) {
    this.repository.sent(message, routingKey);
  }

  consumer(message: any) {
    if (message !== null) {
      logger.info(message.content.toString());
      //channel.reject(message, false);
      BrokerBootstrap.channel.ack(message);

      const integrationEvent = {
        detail: "CREATE_APPOINTMENT",
        payload: JSON.parse(message.content.toString()),
      };

      this.repository.sentNotification(integrationEvent, "");
    }
  }
}
