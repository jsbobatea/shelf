const express = require('express');
const {getShelf, addItem, deleteItem} = require('../mongo/shelf');

const router = express.Router();

router.get('/v1/shelf/:username/:shelf', (request, response) => {
    getShelf(request.params.username, request.params.shelf)
        .then(result => response.json(result))
        .catch(error => response.status(404).send(error));
});

router.post('/v1/shelf/additem', (request, response) => {
    addItem(request.params.username, request.params.shelf, request.body.title, request.body.review, request.body.rating);
    response.status(201).send(request.body.title + ' added to shelf');
});

router.post('/v1/shelf/deleteitem/:item', (request, response) => {
    deleteItem(request.body.username, request.body.shelf, request.params.item)
        .then(result => response.status(200).send('Deleted item!'))
        .catch(error => response.status(400).send(error));
})

exports.shelfRouter = router;
