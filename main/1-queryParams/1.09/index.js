// index.js
import express from 'express';
import mongoose from 'mongoose';
import { Event } from './event.model.js';
import { eventValidationSchema } from './event.validator.js';
import validator from 'express-joi-validation';
import { queryValidationSchema } from './event.query.validator.js';

const app = express();
app.use(express.json());

async function startServer() {
  await mongoose.connect('mongodb://localhost:27017/eventdb');
  await Event.init(); // ensures indexes are built
  const queryValidator = validator.createValidator();
  // GET /events?q=search&date[gte]=2024-01-01&tags[in]=js,node


  app.get(
  '/events',
  queryValidator.query(queryValidationSchema),
  async (req, res) => {
    const { q } = req.query;
    const dateGte = req.query['date[gte]'];
    const tagsIn = req.query['tags[in]'];

    const filter = {};
    if (q) filter.$text = { $search: q };
    if (dateGte) filter.date = { $gte: new Date(dateGte) };
    if (tagsIn) filter.tags = { $in: tagsIn.split(',') };

    const projection = q ? { score: { $meta: 'textScore' } } : {};
    const sort = q ? { score: { $meta: 'textScore' } } : { date: 1 };

    try {
      const events = await Event.find(filter, projection).sort(sort);
      res.json(events);
    } catch (err) {
      res.status(500).json({ error: 'Query failed', details: err.message });
    }
  }
);


  // POST /events
  app.post('/events', async (req, res) => {
    const { error, value } = eventValidationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const newEvent = await Event.create(value);
      res.status(201).json({ message: 'Event created', event: newEvent });
    } catch (err) {
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  });

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}

startServer();
