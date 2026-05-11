import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = Number(process.env.PORT || 3000);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

await app.prepare();

const httpServer = createServer((req, res) => {
  handle(req, res);
});

const io = new Server(httpServer, {
  path: "/api/socket",
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL || `http://${hostname}:${port}`,
  },
});

io.on("connection", (socket) => {
  socket.on("conversation:join", (conversationId: string) => {
    socket.join(conversationId);
  });

  socket.on("message:send", (payload) => {
    if (!payload?.conversationId) {
      return;
    }

    socket.to(payload.conversationId).emit("message:new", payload.message);
  });

  socket.on("typing", (payload) => {
    if (!payload?.conversationId) {
      return;
    }

    socket.to(payload.conversationId).emit("typing", payload);
  });
});

httpServer.listen(port, () => {
  console.log(`ShopChat ready on http://${hostname}:${port}`);
});
