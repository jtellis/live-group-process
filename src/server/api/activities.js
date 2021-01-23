import express from 'express';
import activities from '../entities/activities';

const app = express();

app.get('/', async function getActivities(req, res) {
    try {
        let docs = await activities.getAll();
        res.send(docs);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.get('/:id', async function getActivity(req, res) {
    try {
        let doc = await activities.getOne(req.params.id);
        res.send(doc);
    } catch (err) {
        console.error(err)
        res.sendStatus(500);
    }
});

app.post('/', async function createActivity(req, res) {
    try {
        let result = await activities.create(req.body);
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

export default app;
