export default class Parameters {
  static get PORT(): number {
    return +process.env.PORT || 5700;
  }

  static get MONGO_USERNAME(): string {
    return process.env.MONGO_USERNAME || "root";
  }

  static get MONGO_PASSWORD(): string {
    return process.env.MONGO_PASSWORD || "root";
  }

  static get MONGO_DATABASE(): string {
    return process.env.MONGO_DATABASE || "test";
  }

  static get MONGO_HOST(): string {
    return process.env.MONGO_HOST || "localhost";
  }

  static get MONGO_AUTH_SOURCE(): string {
    return process.env.MONGO_AUTH_SOURCE || "admin";
  }

  static get MONGO_PORT(): string {
    return process.env.MONGO_PORT || "27017";
  }

  static get ENVIRONMENT(): string {
    return process.env.NODE_ENV || "local";
  }

  static get RABBIT_HOST(): string {
    return process.env.RABBIT_HOST || "localhost:5672";
  }

  static get EXCHANGE_NOTIFICATION_NAME(): string {
    return process.env.EXCHANGE_NOTIFICATION_NAME || "test-notification";
  }
}
