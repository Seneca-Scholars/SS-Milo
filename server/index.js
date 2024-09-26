const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const userRoutes = require('../server/routes/users'); 
const userService = require('../server/services/userService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const secret = require('crypto').randomBytes(64).toString('hex');

const app = express();
const port = process.env.PORT || 3000;

userService.createTable();

const db = new sqlite3.Database('users.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to db.');
});


app.use(cors()); 
app.use(express.json());


app.use('/api/users', userRoutes); 

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

