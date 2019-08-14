'use strict';

const express = require('express');
const app = express();
const port = 4500;

require('dotenv').config();
const mysql = require('mysql');

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

conn.connect(err => {
  if (err) {
    console.log(err.toString());
    res.status(404).send('Error connecting to database!')
    return;
  }
  console.log('Connection to DB is A-OK!');
});

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, index.html));
});

app.get('/api/items', (req, res) => {
  conn.query(`SELECT * FROM items;`, (err, rows) => {
    if (err) {
      console.log(err.toString());
      res.status(500).send('Database error!');
      return;
    }
    res.status(200).json(rows);
  });
});

app.post('/api/items/:id/bids', (req, res) => {
  conn.query(`SELECT * FROM items WHERE expiry_date > NOW() AND id=?;`, [req.params.id], (err, item) => {
    if (err) {
      console.log(err.toString());
      res.status(500).send('Database error!');
      return;
    }
    if (item.length === 0) {
      res.status(406).json({
        "message": "The auction is over!"
      });
      return;
    } else {
      conn.query(`SELECT MAX(amount) FROM bids WHERE iId=?;`, [req.params.id], (err, maxAmount) => {
        if (err) {
          console.log(err.toString());
          res.status(500).send('Database error!');
          return;
        }
        if (maxAmount[0]['MAX(amount)'] >= req.body.amount) {
          res.status(406).json({
            "message": "Your bid is below the highest bid!"
          });
          return;
        } else {
          conn.query(`INSERT INTO bids(iId, name, amount) VALUES(?, ?, ?);`, [req.params.id, req.body.name, req.body.amount], (err) => {
            if (err) {
              console.log(err.toString());
              res.status(500).send('Database error!');
              return;
            }
            res.status(200).json({
              "message": "Succesful!"
            });
          });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

module.exports = app;
