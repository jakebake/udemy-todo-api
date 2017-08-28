// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('## Unable to connect to MongoDB server');
    }
    console.log('## Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'My first todo',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('## Unable to insert todo', err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });


    // db.collection('Users').insertOne({
    //     name: 'Smuschel',
    //     age: 34,
    //     location: 'secret'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('## Unable to insert user');
    //     }
    //
    //     console.log('## Inserted user:', require('util').inspect(result.ops, true, 5, true));
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    db.close();
});
