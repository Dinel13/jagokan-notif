require("dotenv").config();
const amqp = require("amqplib/callback_api");
const { sendWa } = require("./twilio");

function initMq( queue, callback) {
  amqp.connect(process.env.URL_RMQ, (err, conn) => {
    console.log("[AMQP] try connecting");
    if (err) {
      console.log(err);
      setTimeout(initMq(queue), 10000);
    }

    console.info("connect to RabbitMQ success");

    conn.on("error", function (err) {
      console.log(err);
      setTimeout(initMq(queue), 10000);
    });

    conn.on("close", function () {
      console.log(err);
      setTimeout(initMq(queue), 10000);
    });
    callback(conn);
  });
}

function getMsg(queue, callback) {
  initMq(queue, (conn) => {
    conn.createChannel(function (error, channel) {
      if (error) {
        console.log(err);
        setTimeout(initChanel(queue), 10000);
      }
      channel.assertQueue(queue, {
        durable: false,
      });
      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        queue
      );
      channel.consume(queue, (msg) => {
        callback(JSON.parse(msg.content.toString()));
        channel.ack(msg);
      });
    });
  });
}


// get msg from queue and send to twilio
// input : queue name adn callback function
// output : none

getMsg("wa-pay", sendWa ); 

// old code
// InitConnection of rabbitmq
// InitConnection((conn) => {
//   // start consumer worker when the connection to rabbitmq has been made
//   StartConsumer(conn, "wa-pay", fnConsumer);
// });
