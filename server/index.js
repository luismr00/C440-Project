const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const db = require('./config');

let PORT = process.env.PORT || 4000;

const fs = require('fs');
const path = require('path');

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const create = fs.readFileSync(path.join(__dirname, './comp440.sql')).toString();

    db.query(create,  (err, result) => {
        if (err){
             throw err;
        } else {
            console.log("Query run successfully");
            res.send('Query run successfully');
        }
    });
});

app.post('/signed', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log('received: ' + username + ', ' + password);
    res.status(201).json({ success: true, data: { username: username, password: password } });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});