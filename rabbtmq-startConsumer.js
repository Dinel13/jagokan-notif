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
      ch.prefetch(10);

      // Connect to queue
      ch.assertQueue(queue, { durable: true }, function (err, _ok) {
        if (closeOnErr(err)) return;
        // Consume incoming messages
        ch.consume(queue, processMsg, { noAck: false });
        console.log("[AMQP] Worker is started");
      });

      function processMsg(msg) {
        // Process incoming messages and send them to fnConsumer
        // Here we need to send a callback(true) for acknowledge the message or callback(false) for reject them
        fnConsumer(queue, msg, function (ok) {
          try {
            ok ? ch.ack(msg) : ch.reject(msg, true);
          } catch (e) {
            closeOnErr(e);
          }
        });
      }
    });
  },
};

function closeOnErr(err) {
  if (!err) return false;
  console.error("[AMQP] error", err);
  conn.close();
  return true;
}
