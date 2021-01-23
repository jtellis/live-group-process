import { MongoClient } from 'mongodb';

const database = 'livegroup';

const client = new MongoClient('mongodb://localhost', {
        useUnifiedTopology: true
    });

async function connect() {
    return new Promise(async function (resolve, reject) {
            try {
                let connection = await client.connect();
                let db = connection.db(database);
                resolve(db);
            } catch (err) {
                reject(err);
            }
        });
}

async function disconnect() {
    return new Promise(async function (resolve, reject) {
            try {
                resolve(await client.close());
            } catch (err) {
                reject(err);
            }
        });
}

export default {
    /*
        export Promise so that all imports
        share single connection
    */ 
    connection: connect(),
    disconnect
}
