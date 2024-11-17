const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));
wss.on('connection', (ws) => {
    console.log("Client connected");
    ws.on('message', (data) => {
      broadcast(JSON.stringify(data));
    });
});

function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

server.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000');
});