import { ObjectId } from 'mongodb';
import db from '../../db';
import schema from './schema';

const client = await db.connection;

let collectionExists = await client
    .listCollections({ name: 'activities' })
    .hasNext();

const activities = collectionExists
    ? client.collection("activities")
    : await init();
  
function init() {
    return client.createCollection('activities', {
        validator: { $jsonSchema: schema }
    });
}

function getAll() {
    return activities.find().toArray();
}

function getByCreator(user) {
    return activities.find({ creator: user.sub }).toArray();
}

function getOne(id) {
    return activities.findOne({_id: new ObjectId(id)});
}

function create(user, activity) {
    return activities.insertOne({
        ...activity,
        creator: user.sub
    });
}

export default {
    getAll,
    getByCreator,
    getOne,
    create
}
