export function getMetricFromSensorType(sensorType: string): string {
  const metrics: Record<string, string> = {
    ds18b20: "temperature",
    hdc3020: "temperature", // or 'humidity' depending on reading
    veml7700: "light",
  };
  return metrics[sensorType] || "unknown";
}
