// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('## Unable to connect to MongoDB server');
    }
    console.log('## Connected to MongoDB server');

    // db.collection('Todos').find({completed: false}).count().then((result) => {
    //      console.log('## Todos to do:', result );
    // }, (err) => {
    //     console.log('## Unable to fetch todos', err);
    // });

    db.collection('Users').find({name: 'Smuschel'}).count().then((result) => {
         console.log('## Es gibt genau', result, 'Smuschels!!' );
    }, (err) => {
        console.log('## Unable to fetch todos', err);
    });

    // db.collection('Todos').find({
    //     _id: new ObjectID('59a463793baeb45c5690b084')
    // }).toArray().then((docs) => {
    //      console.log('## Todos:' );
    //      console.log( require('util').inspect(docs, true, 5, true));
    // }, (err) => {
    //     console.log('## Unable to fetch todos', err);
    // });

    // db.close();
});
