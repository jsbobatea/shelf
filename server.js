const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const {accountRouter} = require('./routes/account');
const {shelfRouter} = require('./routes/shelf');

const app = express();
const port = 3001;

app.listen(port, () => console.log('Running'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(
    session({
        secret: 'supersecret',
        saveUninitialized: true,
        resave: true
    })
);
app.use(accountRouter);
app.use(shelfRouter);

exports.app = app;
