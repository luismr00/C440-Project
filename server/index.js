const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
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
      else console.log("Database created");
    });

    const create = fs.readFileSync(path.join(__dirname, './comp440.sql')).toString();

    db.query(create,  (err, result) => {
        if (err) throw err;
        else console.log("user table successfully created");
    });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false,
}));

// cookie parser middleware
app.use(cookieParser());
let session;

app.get('/', (req, res) => {
    console.log(session);
    if(session != undefined) {
        if(session.user != undefined && session.user != null)
            res.json({ user: session.user });
    } else {
        res.json({ user: null });
    }
});

app.post('/api/login', (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    console.log('received: ' + email + ', ' + password);

    db.query("SELECT * FROM user WHERE email = ? AND password = ?",[
        email,
        password
    ], (err, result) => {
        if (err) console.log(err) && res.status(400).json({ success: false });
        else {
            console.log("result: ", result);
            if (result.length > 0) {
                session = req.session;
                session.user = { username: result[0].username, firstName: result[0].first_name, lastName: result[0].last_name };
                res.status(201).json({ success: true, firstName: result[0].first_name });
            } else {
                res.status(400).json({ success: false, err: "Invalid username or password" });
            }
        }
    });
});

app.post('/api/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    console.log('received: ' + username + ', ' + password + ', ' + firstName + ', ' + lastName + ', ' + email);
    
    db.query("INSERT INTO user VALUES (?, ?, ?, ?, ?)", [
        username,
        password,
        firstName,
        lastName,
        email
    ], (err, result) => {
        if (err) {
            console.log(err)
            if(err.code === 'ER_DUP_ENTRY') {
                res.status(400).json({ success: false, err: "Username already exists" });
            } else res.status(400).json({ success: false, err: err });
        }
        else {
            console.log("user successfully created");
            session = req.session;
            session.user = { username: username, firstName: firstName, lastName: lastName };
            res.status(201).json({ success: true });
        }
    });
});

app.post('/api/initialize', (req, res) => {
    // const initializeFile = fs.readFileSync(path.join(__dirname, './university.sql')).toString();
    // db.query(initializeFile, (err, result) => {
    //     if (err) throw err;
    //     else {
    //         console.log("DB initialized");
    //         res.status(201).json({ success: true });
    //     }
    // })

    const initializeFile2 = fs.readFileSync(path.join(__dirname, './data.sql')).toString();
    db.query(initializeFile2, (err, result) => {
        if (err) throw err;
        else {
            console.log("initialized data");
            res.status(201).json({ success: true });
        }
    })
});

app.get('/logout',(req,res) => {
    req.session.destroy();
    session.user = null;
    res.status(200).json({ success: true });
});

app.post('/api/create', (req, res) => {
    if(typeof session.user !== undefined && session.user !== null) {
        const subject = req.body.subject;
        const description = req.body.description;
        const tags = req.body.tags;
        const date = new Date();
        const user_id = session.user.username;
        db.query("INSERT INTO blog (subject, description, tags, date, user_id) VALUES(?, ?, ?, ?, ?)",[
            subject,
            description,
            tags,
            date,
            user_id
        ], (err, result) => {
                if (err) {
                    console.log(err)
                    res.status(400).json({ success: false, err: err });
                }
                else {
                    console.log("successfully created");
                    res.status(201).json({ success: true });
                }
            }
        );
    } else {
        res.status(400).json({ success: false, err: "You must be logged in to create a post" });
    }
})

app.get('/api/blogs', (req, res) => {
    db.query("SELECT * FROM blog", (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).json({ success: false, err: err });
        }
        else {
            console.log("successfully retrieved");
            res.status(201).json({ success: true, blogs: result });
        }
    });
});

app.post('/api/:id/comment', (req, res) => {
    if(session.user != undefined && session.user != null) {
        const comment = req.body.comment;
        const blog_id = req.params.id.split(':')[1];
        const username = session.user.username;
        const date = new Date();
        db.query("INSERT INTO comment (comment, blog_id, username, date) VALUES(?, ?, ?, ?)",[
            comment,
            blog_id,
            username,
            date
        ], (err, result) => {
                if (err) {
                    console.log(err)
                    res.status(400).json({ success: false, err: err });
                }
                else {
                    console.log("successfully created");
                    res.status(201).json({ success: true });
                }
            }
        );
    } else {
        res.status(400).json({ success: false, err: "You must be logged in to comment" });
    }
})

app.get('/api/:id/comments', (req, res) => {
    const blog_id = req.params.id.split(':')[1];

    db.query("SELECT * FROM comment WHERE blog_id = ?",[
        blog_id
    ], (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).json({ success: false, err: err });
        }
        else {
            console.log("successfully retrieved");
            res.status(201).json({ success: true, comments: result });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});