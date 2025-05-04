import { createServer } from "http";
import { Server } from "socket.io";
import config from "config";

const wsServer = createServer();
const allowedOrigins = [
  config.get("frontend.client"),
  config.get("frontend.admin"),
];

const io = new Server(wsServer, {
  cors: {
    origin: allowedOrigins as string[],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);
  socket.on("join", (data) => {
    socket.join(String(data.tenantId));
    socket.emit("join", { roomId: String(data.tenantId) });
  });
});

export default {
  wsServer,
  io,
};
