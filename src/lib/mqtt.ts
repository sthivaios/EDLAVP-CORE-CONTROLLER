import mqtt from "mqtt";
import { handleIncomingSensorMessage } from "./mqtt-helpers";

let client: mqtt.MqttClient | null = null;

export function initMqtt(): Promise<mqtt.MqttClient> {
  return new Promise((resolve, reject) => {
    if (client) return resolve(client);

    client = mqtt.connect(process.env.MQTT_URL ?? "", {
      username: process.env.MQTT_USERNAME ?? "",
      password: process.env.MQTT_PASSWORD ?? "",
      clientId: process.env.MQTT_CLIENTID ?? "",
    });

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      client!.subscribe("edlavp/+/sensor/+", (err) => {
        if (err) reject(err);
        else resolve(client!);
      });
    });

    client.on("error", (err) => {
      console.error("MQTT error:", err);
      reject(err);
    });

    client.on("message", (topic, message) => {
      handleIncomingSensorMessage(topic, message.toString());
    });

    // Timeout after 10 seconds
    setTimeout(() => reject(new Error("MQTT connection timeout")), 10000);
  });
}
