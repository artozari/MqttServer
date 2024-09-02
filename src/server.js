const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://test.mosquitto.org");

client.on("connect", () => {
  client.subscribe("NadineL", (err) => {
    if (!err) {
      client.publish("NadineL", "Hola soy Nadine mqtt");
    }
  });
});

client.on("message", (topic, message) => {
  // message is Buffer
  console.log(`Topico: ${topic} = ${message}`);
  //   client.end();
});
