export interface BrokerRepository {
  sent(message: unknown, routingKey: string): void;
  sentNotification(message: unknown, routingKey: string): void;
  receive(consumer: (message: any) => any): void;
}
