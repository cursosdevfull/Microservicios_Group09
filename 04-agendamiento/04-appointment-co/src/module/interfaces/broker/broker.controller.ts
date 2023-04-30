import { BrokerApplication } from "../../application/broker.application";

export default class {
  constructor(private readonly application: BrokerApplication) {
    this.listen = this.listen.bind(this);
  }
  async listen() {
    this.application.receive();
  }

  /*   sent(message: unknown, routingKey: string) {
    this.application.sent(message, routingKey);
  } */
}
