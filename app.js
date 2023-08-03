const express = require('express');
const session = require('express-session');
const router = require('./routes');
const app = express()
const port = 3000

const path = require('path');

require('dotenv').config();

app.set("view engine", "ejs")

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 600000, httpOnly: false },
}));

app.use(express.urlencoded({ extended: false }))
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));
app.use(router)

app.listen(port, () => console.log("# Connected on port", port))