import https from 'https';
import fs from 'fs';
import express from 'express';
import nodeCleanup from 'node-cleanup';
import wsServer from './wsServer';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import { auth } from './auth';
import api from './api';
import path from 'path';
import db from './db';
const port = 5000;
const staticDir = 'client';
const app = express();

app.disable('x-powered-by');

if (process.env.NODE_ENV === 'development') {
    /*
        work-around for React Developer Tools CSP violation
        https://github.com/facebook/react/issues/17997
    */
    app.use( helmet({
        contentSecurityPolicy: {
            directives: {
                ...helmet.contentSecurityPolicy.getDefaultDirectives(),
                "script-src": [
                    "'self'",
                    "'unsafe-inline'",
                    "'unsafe-eval'"
                ]
            }
        }
    }));
} else {
    app.use( helmet() );
}

app.use( express.static( path.resolve(__dirname, staticDir) ) );

app.use( bodyParser.json() );

app.use( morgan('combined') );

app.use( auth({ auth0Logout: true }) );

app.use('/graphql', api);

app.get('/*', function index(req, res) {
    res.sendFile( path.resolve(__dirname, staticDir, 'index.html') );
});

db.connection.then(serve);

function serve() {
    const options = {
        key: fs.readFileSync('./key.pem'),
        cert: fs.readFileSync('./cert.pem')
    };
    const server = https.createServer(options, app).listen(port);

    server.on('upgrade', (req, socket, head) => {
        wsServer.handleUpgrade(req, socket, head, function done(ws) {
            wsServer.emit('connection', ws, req);
        });
    });
}

/* https://github.com/jtlapp/node-cleanup#usage */
nodeCleanup((exitCode, signal) => {
    db.disconnect().then(() => {
        process.kill(process.pid, signal);
    });
    nodeCleanup.uninstall();
    return false;
});
