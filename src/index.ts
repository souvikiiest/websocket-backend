import http from "http";
import { WebSocket, WebSocketServer } from "ws";

const httpServer = http.createServer((request, response) => {
  console.log("request came from: ", request.url);
  response.end("hi there");
});
let user = 0;
const wss = new WebSocketServer({ server: httpServer });
wss.on("connection", (socket) => {
  socket.on("error", console.error);
  socket.on("message", (data, isBinary) => {
    wss.clients.forEach((client) => {
      if (client.readyState == WebSocket.OPEN)
        client.send(data, { binary: isBinary });
    });
  });
  console.log("users connected: ", ++user);
  socket.send("hello from socket server");
});
httpServer.listen(8080, () => {
  console.log("server is listening on port: 8080");
});
