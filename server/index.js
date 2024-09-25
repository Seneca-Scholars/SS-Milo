const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const userController = require('../server/controllers/userController');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const db = new sqlite3.Database('users.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to db.');
});

const secret = require('crypto').randomBytes(64).toString('hex');


app.use(cors()); 
app.use(express.json());

const userRoutes = require('../server/routes/users'); 

app.use('/api/users', userController); 

userService.createTable();


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

