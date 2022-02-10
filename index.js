const { InitConnection } = require("./rabbtmq-startConnect");
const { StartConsumer } = require("./rabbtmq-startConsumer");
const { sendWa } = require("./twilio");

function fnConsumer(queqe, msg, callback) {
  console.log(queqe);
  console.log("Received message: ", msg.content.toString());
  // we tell rabbitmq that the message was processed successfully
  switch (queqe) {
    case "send-wa":
      //convert data from json to object
      let data = JSON.parse(msg.content.toString()); 
      console.log(data);
      sendWa(data);
      break;
    case "send-wa":
      console.log("still not implemented");
      break;
    default:
      console.log("default");
  }
  callback(true);
}

// InitConnection of rabbitmq
InitConnection((conn) => {
  // start consumer worker when the connection to rabbitmq has been made
  StartConsumer(conn, "send-wa", fnConsumer);
});