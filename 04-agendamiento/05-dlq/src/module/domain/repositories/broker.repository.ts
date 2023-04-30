export interface BrokerRepository {
  //sent(message: unknown, routingKey: string): void;
  receive(): void;
}
