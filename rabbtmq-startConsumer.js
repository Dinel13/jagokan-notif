require("dotenv").config();
const amqp = require("amqplib/callback_api");
module.exports = {
  StartConsumer: (conn, queue, fnConsumer) => {
    // Create a channel for queue
    conn.createChannel(function (err, ch) {
      if (closeOnErr(err)) return;

      ch.on("error", function (err) {
        console.error("[AMQP] channel error", err.message);
      });

      ch.on("close", function () {
        console.log("[AMQP] channel closed");
      });

      // Set prefetch value
      //  ch.prefetch(process.env.CLOUDAMQP_CONSUMER_PREFETCH ? process.env.CLOUDAMQP_CONSUMER_PREFETCH : 10);
      ch.prefetch(20);

      // Connect to queue
      ch.assertQueue(queue, { durable: false });

      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        queue
      );
      ch.consume(queue, fnConsumer, { noAck: false });
    });
  },
};

function closeOnErr(err) {
  if (!err) return false;
  console.error("[AMQP] error", err);
  conn.close();
  return true;
}
