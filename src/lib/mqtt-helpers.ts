export function handleIncomingSensorMessage(topic: string, message: string) {
  console.log("\n\n");
  console.log("Received:", topic, JSON.parse(message));
}
