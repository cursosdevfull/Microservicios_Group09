const amqp = require("amqplib");
const args = process.argv.slice(2);

(async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchangeName = "exchange-topic";
  await channel.assertExchange(exchangeName, "topic", { durable: true });

  const assertQueue = await channel.assertQueue("", { exclusive: true });
  const routingKey = args.length > 0 ? args[0] : "key";

  await channel.bindQueue(assertQueue.queue, exchangeName, routingKey);

  channel.consume(
    assertQueue.queue,
    (message) => console.log(message.content.toString()),
    { noAck: false }
  );
})();
