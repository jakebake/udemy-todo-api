// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('## Unable to connect to MongoDB server');
    }
    console.log('## Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('59a48e3df4a209657efc3c7f')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log('## result', result);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('59a48b70f4a209657efc3c7e')
    }, {
        $set: {
            name: 'Oliver'
        },
        $inc: {
            age: 12
        }
    },{
        returnOriginal: false
    }).then((result) => {
        console.log('## result', result);
    });

    // db.close();
});
