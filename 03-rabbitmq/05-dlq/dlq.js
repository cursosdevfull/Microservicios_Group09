const amqp = require("amqplib");

(async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchangeNameDLQ = "exchange-dlq";
  await channel.assertExchange(exchangeNameDLQ, "direct", { durable: true });
  const routingKeyDLQ = "";

  const queueNameDLQ = "queueDLQ";
  await channel.assertQueue(queueNameDLQ);

  await channel.bindQueue(queueNameDLQ, exchangeNameDLQ, routingKeyDLQ);

  channel.consume(
    queueNameDLQ,
    (message) => {
      console.log("message DLQ", message.content.toString());
      channel.ack(message);
    },
    { noAck: false }
  );
})();
