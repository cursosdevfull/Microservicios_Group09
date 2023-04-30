import { BrokerRepository } from "../domain/repositories/broker.repository";

export class BrokerApplication {
  constructor(private readonly repository: BrokerRepository) {}

  receive() {
    this.repository.receive();
  }

  /* sent(message: unknown, routingKey: string) {
    this.repository.sent(message, routingKey);
  } */
}
