require("dotenv").config();
const client = require("twilio")(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

module.exports = {
  sendWa: (data) => {
    console.log(data);
  },
  //  client.messages
  //    .create({
  //      from: "whatsapp:+14155238886",
  //      body: "Your 2 code is 2, in iadalah uji coba ",
  //      to: "whatsapp:+6289678584370",
  //    })
  //    .then((message) => console.log(message.sid))
  //    .catch((err) => console.log(err)),
};
