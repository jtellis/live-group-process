import express from 'express';
import wsServer from './wsServer';
import path from 'path';

const port = 5000;
const staticDir = 'client';
const app = express();

app.use( express.static( path.resolve(__dirname, staticDir) ) );

app.get('/', function index(req, res) {
    res.sendFile( path.resolve(__dirname, staticDir, 'index.html') );
});

const server = app.listen(port);

server.on('upgrade', (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, function done(ws) {
        wsServer.emit('connection', ws, req);
    });
});
