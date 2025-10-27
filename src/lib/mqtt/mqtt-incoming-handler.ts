import { PrismaClient } from "../../generated/prisma/client";
import { getMetricFromSensorType } from "./misc";

interface MqttMessage {
  metadata: {
    timestamp: number;
    device: string;
  };
  readout: {
    value: number;
    sensor: string;
    unit: string;
    address?: string;
  };
}

export async function handleIncomingSensorMessage(message: MqttMessage) {
  const prisma = new PrismaClient();

  const timestamp = new Date(message.metadata.timestamp * 1000);
  const stationId = message.metadata.device;

  // Ensure station exists (auto-discovery)
  await prisma.station.upsert({
    where: { id: stationId },
    update: { lastSeen: timestamp },
    create: {
      id: stationId,
      lastSeen: timestamp,
    },
  });

  let sensor = await prisma.sensor.findUnique({
    where: {
      stationId_type_address: {
        stationId: stationId,
        type: message.readout.sensor,
        address: message.readout.address || "",
      },
    },
  });

  if (!sensor) {
    sensor = await prisma.sensor.create({
      data: {
        stationId,
        type: message.readout.sensor,
        address: message.readout.address || "",
        metric: getMetricFromSensorType(message.readout.sensor),
        unit: message.readout.unit,
      },
    });
  }

  // Store reading
  const reading = await prisma.reading.create({
    data: {
      time: timestamp,
      stationId,
      sensorId: sensor.id,
      value: message.readout.value,
    },
    include: {
      sensor: {
        select: {
          type: true,
          unit: true,
        },
      },
    },
  });

  console.log(reading);
}
