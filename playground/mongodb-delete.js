// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('## Unable to connect to MongoDB server');
    }
    console.log('## Connected to MongoDB server');

    // db.collection('Todos').deleteMany({text: 'More to do, pressure is rising'}).then((result) => {
    //     console.log('## result', result);
    // });

    // db.collection('Todos').deleteOne({text: 'Kill Batman'}).then((result) => {
    //     console.log('## result', result);
    // });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('59a48a4cf4a209657efc3c73')
    }).then((result) => {
        console.log('## result', result);
    }).then( () => {
        return db.collection('Users').deleteMany({name: 'Oli'});
    }).then((result) => {
        console.log('## result', result);
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
