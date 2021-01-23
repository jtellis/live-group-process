import { ObjectId } from 'mongodb';
import db from '../../db';
import schema from './schema';

const client = await db.connection;

let collectionExists = await client
    .listCollections({ name: 'activities' })
    .hasNext();
if(collectionExists == false) {
    const activities = await init();
} else {
    const activities = client.collection('activities');
}

function init() {
    return client.createCollection('activities', {
        validator: { $jsonSchema: schema }
    });
}

function getAll() {
    return activities.find().toArray();
}

async function getOne(id) {
    return activities.findOne({_id: new ObjectId(id)});
}

function create(activity) {
    return activities.insertOne(activity);
}

export default {
    getAll,
    getOne,
    create
}