const {MongoClient} = require('mongodb');
const {uri, db, shelfCollection} = require('./mongo');

async function getShelf(username, shelf) {
    const client = new MongoClient(uri, {useUnifiedTopology: true});
    try {
        await client.connect();
        const database = client.db(db);
        const collection = database.collection(shelfCollection);
        const query = {username: username, shelf: shelf};
        const options = {
            sort: {title: 1},
            projection: {_id: 0, title: 1, rating: 1, review: 1}
        };
        const cursor = collection.find(query, options);

        if ((await cursor.count()) === 0) {
            return `No ${shelf} shelf found for user ${username}`;
        }

        return await cursor.toArray();
    } finally {
        await client.close();
    }
}

async function addItem(username, shelf, title, review, rating) {
    const client = new MongoClient(uri, {useUnifiedTopology: true});
    try {
        await client.connect();
        const database = client.db(db);
        const collection = database.collection(shelfCollection);
        const doc = {
            username: username,
            shelf: shelf,
            title: title,
            review: review,
            rating: rating
        };
        await collection.insertOne(doc);
    } finally {
        await client.close();
    }
}

async function deleteItem(username, shelf, title) {
    const client = new MongoClient(uri, {useUnifiedTopology: true});
    try {
        await client.connect();
        const database = client.db(db);
        const collection = database.collection(shelfCollection);
        const query = {username: username, shelf: shelf, title: title};
        await collection.findOneAndDelete(query);
    } finally {
        await client.close();
    }
}

exports.getShelf = getShelf;
exports.addItem = addItem;
exports.deleteItem = deleteItem;
