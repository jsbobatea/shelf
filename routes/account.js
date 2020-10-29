const express = require('express');
const {register, login, updateEmail} = require('../mongo/account');

const router = express.Router();

router.post('/v1/account/login', (request, response) => {
    const {username, password} = request.body;
    if (!username || !password) {
        response.status(400).send('Username and password required!');
    } else {
        login(username, password)
            .then(result => response.status(200).send('Logged in!'))
            .catch(error => response.status(401).send('Login failed!'))
    }
});

router.post('/v1/account/register', (request, response) => {
    const {username, password, email} = request.body;
    if (!username || !password || !email) {
        response.status(400).send('Invalid data!');
    } else {
        register(username, password, email)
            .then(result => response.status(201).send('Account created!'))
            .catch(error => response.status(200).send('Username or email exists!'));
    }
});

router.post('/v1/account/update/email', (request, response) => {
    if (!request.body.email) {
        response.status(400).send('Invalid data!');
    } else {
        updateEmail(request.body.email)
            .then(result => response.status(200).send('E-mail updated!'))
            .catch(error => response.status(200).send('E-mail already taken!'));
    }
});

router.post('/v1/account/update/')

exports.accountRouter = router;
