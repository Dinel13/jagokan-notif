const { InitConnection } = require("./rabbtmq-startConnect");
const { StartConsumer } = require("./rabbtmq-startConsumer");
const { sendWa } = require("./twilio");

function fnConsumer(msg, callback) {
  let data = JSON.parse(msg.content.toString()); 
  sendWa(data);
  callback(true);
}

// InitConnection of rabbitmq
InitConnection((conn) => {
  // start consumer worker when the connection to rabbitmq has been made
  StartConsumer(conn, "wa-pay", fnConsumer);
});