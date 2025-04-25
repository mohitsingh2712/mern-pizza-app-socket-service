import logger from "./src/config/logger";
import { createMessageBroker } from "./src/factories/broker-factory";
import { MessageBroker } from "./src/types/broker";
import ws from "./src/socket";
import config from "config";

const startServer = async () => {
  let broker: MessageBroker | null = null;
  const port = config.get("server.port") || 3000;
  try {
    broker = createMessageBroker();
    await broker.connectConsumer();
    await broker.consumeMessage(["order"], false);
    ws.wsServer
      .listen(port, () => {
        logger.info(`WebSocket server is running on port ${port}`);
      })
      .on("error", (err) => {
        console.log(err);
        logger.error("Error happened: ", err.message);
        process.exit(1);
      });
  } catch (err) {
    console.log(err);
    logger.error("Error happened: ", err.message);
    if (broker) {
      await broker.disconnectConsumer();
    }
    process.exit(1);
  }
};

void startServer();
