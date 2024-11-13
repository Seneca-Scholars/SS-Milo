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
    console.error('err fetching users:', err);
    }
});

app.listen(3000, () => console.log('Listening on 3000'));