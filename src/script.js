// Configuración del broker MQTT
const brokerUrl = "ws://sielcondev01.site:9105"; // URL del broker MQTT
const clientId = "myClient"; // ID del cliente

// Crear una instancia del cliente MQTT
const client = mqtt.connect(brokerUrl);

// Funciones para manejar los eventos del cliente MQTT
client.on("connect", () => {
  console.log("Conectado al broker MQTT");
  document.getElementById("connect-btn").disabled = true;
  document.getElementById("disconnect-btn").disabled = false;
});

client.on("end", () => {
  console.log("Desconectado del broker MQTT");
  document.getElementById("connect-btn").disabled = false;
  document.getElementById("disconnect-btn").disabled = true;
});

client.on("error", (error) => {
  console.error("Error al conectarse al broker MQTT:", error);
});

client.on("message", (topic, message) => {
  // message is Buffer
  console.log(`Topico: ${topic} = ${message}`);
  // document.getElementById("messages").innerHTML += `<p>${message.payloadString}</p>`;
});

// Función para publicar un mensaje en un tema
function publishMessage(topic, message) {
  client.publish(topic, message, (error) => {
    if (error) {
      console.error("Error al publicar mensaje:", error);
    } else {
    }
  });
}

// Función para suscribirse a un tema
function subscribeToTopic(topic) {
  client.subscribe(topic, (error) => {
    if (error) {
      console.error("Error al suscribirse a tema:", error);
    } else {
      console.log(`Suscripción exitosa a ${topic}`);
      updateSubscriptionList(topic);
    }
  });
}

// Función para cancelar una suscripción a un tema
function unsubscribeFromTopic(topic) {
  client.unsubscribe(topic, (error) => {
    if (error) {
      console.error("Error al cancelar suscripción:", error);
    } else {
      console.log(`Suscripción cancelada a ${topic}`);
    }
    updateSubscriptionList(topic);
  });
}

// Función para actualizar la lista de suscripciones, mejorar, no esta  funcionando bien solo agrega los topicos a los que nos suscribimos y desuscribimos
function updateSubscriptionList(topic) {
  const subscriptionList = document.getElementById("subscription-list");
  const subscriptionItem = document.createElement("li");
  subscriptionItem.textContent = topic;
  subscriptionList.appendChild(subscriptionItem);
}

// Event listeners para los botones
document.getElementById("publish-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const topic = document.getElementById("topic").value;
  const message = document.getElementById("message").value;
  publishMessage(topic, message);
});

document.getElementById("subscribe-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const topic = document.getElementById("topic").value;
  subscribeToTopic(topic);
});

document.getElementById("unsubscribe-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const topic = document.getElementById("topic").value;
  unsubscribeFromTopic(topic);
});

document.getElementById("connect-btn").addEventListener("click", (e) => {
  e.preventDefault();
  client.connect(brokerUrl);
});

document.getElementById("disconnect-btn").addEventListener("click", (e) => {
  e.preventDefault();
  client.end();
});
