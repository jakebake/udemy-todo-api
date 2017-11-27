const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const config = require('./config/config.js');
let {mongoose} = require('./db/mongoose.js');
let {Todo} = require('./models/todo.js');
let {User} = require('./models/user.js');
let {authenticate} = require('./middleware/authenticate.js');

let app = express();

app.use(bodyParser.json());

// POST todo
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

// DELETE todo by ID
app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send('## ID is not valid');
    } else {
        Todo.findByIdAndRemove(id).then((todo) => {
            if (!todo) {
                return res.status(404).send('Todo with this ID was not found!');
            }
            res.send({message: 'Todo successfully removed',todo});
        }, () => res.status(400).send());
    }
});

// DELETE all todos
app.delete('/todos/', (req, res) => {
    Todo.remove({}).then((todo) => {
        if (!todo) {
            return res.status(404).send('No todos found!');
        }
        res.send(`## All todos were succesfully removed!`);
    }, () => res.status(400).send());
});

// UPDATE todo by ID
app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(400).send('## ID is not valid');
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else if (!_.isBoolean(body.completed)) {
        return res.status(400).send('Value of "completed" needs to be a boolean');
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send('ID not found');
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });

});


// POST /users
app.post('/users', (req, res) => {

    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);

    //console.log('## new user', user);

    user.save().then((result) => {
        //console.log('## result', result);
        return user.generateAuthToken();
        // res.send(result);
    }).then((token) => {
        //console.log('## user im zweiten then()', user);
        res.header('x-auth', token).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    });
});


// GET /users/me
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});


let port = process.env.PORT;
app.listen(port, () => {
    console.log(`## Listening on port ${port} in NODE_ENV ${config.env}`);
});

module.exports = {app};
