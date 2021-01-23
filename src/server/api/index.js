import express from 'express';
import db from '../db';
import activities from './activities';

const api = express();

api.use('/activities', activities);

export default api;
