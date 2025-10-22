import "dotenv/config";
import express from "express";
import { initMqtt } from "./lib/mqtt";

const app = express();

app.use(express.json());

async function start() {
  const app = express();

  // Wait for MQTT to connect
  await initMqtt();

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

await start().catch((err) => {
  console.error("Failed to start:", err);
  process.exit(1);
});

console.log("after everything is done");
