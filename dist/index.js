"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const httpServer = http_1.default.createServer((request, response) => {
    console.log("request came from: ", request.url);
    response.end("hi there");
});
let user = 0;
const wss = new ws_1.WebSocketServer({ server: httpServer });
wss.on("connection", (socket) => {
    socket.on("error", console.error);
    socket.on("message", (data, isBinary) => {
        wss.clients.forEach((client) => {
            if (client.readyState == ws_1.WebSocket.OPEN)
                client.send(data, { binary: isBinary });
        });
    });
    console.log("users connected: ", ++user);
    socket.send("hello from socket server");
});
httpServer.listen(8080, () => {
    console.log("server is listening on port: 8080");
});
