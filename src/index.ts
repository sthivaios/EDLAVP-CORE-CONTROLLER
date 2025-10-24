import "dotenv/config";
import express from "express";
import { initMqtt } from "./lib/mqtt/mqtt";

import stationsRouter from "./routes/stations";

const app = express();
app.use(express.json());

async function start() {
  // Wait for MQTT to connect
  await initMqtt();

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}

await start().catch((err) => {
  console.error("Failed to start:", err);
  process.exit(1);
});

app.use("/stations", stationsRouter);

app.get("/", (req, res) => {
  res.status(200).send({ message: "test" });
});
