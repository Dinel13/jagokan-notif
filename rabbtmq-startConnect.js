
require("dotenv").config();
const amqp = require("amqplib/callback_api");

module.exports = {
    InitConnection: (fnFinish) => {
      // Start connection with Rabbitmq
      amqp.connect(process.env.URL_RMQ, (err, conn) => {
      // If connection error
      if (err) {
        console.error("[AMQP]", err.message);
        return setTimeout(this, 1000);
      }
      
      conn.on("error", function(err) {
        console.log("ERROR", err);
        if (err.message !== "Connection closing") {
          console.error("[AMQP] conn error", err.message);
        }
      });
      
      conn.on("close", function() {
        // Reconnect when connection was closed
        console.error("[AMQP] reconnecting");
        return setTimeout(() => { module.exports.InitConnection(fnFinish) }, 1000);
      });
      
      // Connection OK
      console.log("[AMQP] connected");
      // Execute finish function
      fnFinish(conn);
    });
  }
};