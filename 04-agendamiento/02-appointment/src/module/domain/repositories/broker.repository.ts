export interface BrokerRepository {
  sent(message: unknown): void;
  receive(): void;
}
