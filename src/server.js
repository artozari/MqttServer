const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://test.mosquitto.org");

client.on("connect", () => {
  client.subscribe("AngelSMC", (err) => {
    if (!err) {
      client.publish("AngelSMC", "Hola soy Angel mqtt");
    }
  });
});

client.on("message", (topic, message) => {
  // message is Buffer
  console.log(`Topico: ${topic} = ${message}`);
  //   client.end();
});
