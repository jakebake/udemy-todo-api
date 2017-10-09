const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body.text);

    let todo = new Todo({
        text: req.body.text
    });

    console.log('## todo', todo);

    todo.save().then((result) => {
        console.log('## result', result);
        res.send(result);
    }, (error) => {
        res.status(400).send(error);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
        console.log('## Could not get Todos', e);
    });
});


// GET todo by ID
app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(400).send('## ID is not valid');
    }
    else {
        Todo.findById(id).then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({todo});
        }, () => res.status(400).send());
    }
});



app.listen(port, () => {
    console.log(`## Listening on port ${port}`);
});

module.exports = {app};
