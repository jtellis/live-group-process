import ws from 'ws';

const wsServer = new ws.Server({ noServer: true });

wsServer.on('connection', function connection(ws, req) {
});

export default wsServer;
