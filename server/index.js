const express = require('express');
const sqlite3 = require('sqlite3').verbose();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken'); for later

const app = express();
const port = process.env.PORT || 3000;

//connect
const db = new sqlite3.Database('users.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('might have done it.');
});

// middleware
app.use(express.json());

// route(s)
app.use('/api/users');

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});