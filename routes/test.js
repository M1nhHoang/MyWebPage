const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 7777 });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(message)
  });
});