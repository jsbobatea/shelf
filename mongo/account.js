const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');
const {uri, db, accountsCollection} = require('./mongo');

async function register(username, password, email) {
    const client = new MongoClient(uri, {useUnifiedTopology: true});
    var hash = bcrypt.hash(password, 8);
    try {
        await client.connect();
        const database = client.db(db);
        const collection = database.collection(accountsCollection);
        const doc = {
            username: username,
            password: hash,
            email: email
        };
        await collection.insertOne(doc);
    } finally {
        await client.close();
    }
}

async function login(username, password) {
    const client = new MongoClient(uri, {useUnifiedTopology: true});
    try {
        await client.connect();
        const database = client.db(db);
        const collection = database.collection(accountsCollection);
        const query = {username: username};
        var user = await collection.findOne(query);
        bcrypt.compare(password, user.password, function (err, res) {
            if (res) {
                console.log('Passwords match');
            } else {
                console.log(err)
            }
        });
    } finally {
        await client.close();
    }
}

async function updateEmail(email) {
    const client = new MongoClient(uri, {useUnifiedTopology: true});
    try {
        await client.connect();
        const database = client.db(db);
        const collection = database.collection(accountsCollection);
        const filter = {
            username: 'jsbobatea',
            email: email
        };
        //const options = {upsert: true};
        const updateDoc = {
            $set: {
                email: email
            }
        };
        await collection.updateOne(filter, updateDoc);
    } finally {
        await client.close();
    }
}

exports.register = register;
exports.updateEmail = updateEmail;
exports.login = login;
