const amqp = require("amqplib");

(async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const queueName = "queue01";
  await channel.assertQueue(queueName, { durable: true });

  channel.consume(queueName, (msg) => console.log(msg.content.toString()), {
    noAck: true,
  });
})();
