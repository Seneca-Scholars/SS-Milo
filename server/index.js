import express from 'express';
import cors from 'cors';
import { searchUser } from './controllers/peopleController.js';

const app = express();

app.use(cors());

app.get('/search', async (req, res) => {
  const query = req.query.q;

  try {
    const results = await searchUser(query);
    res.json(results);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

app.listen(3000, () => console.log('Listening on 3000'));