const express = require('express');
const bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();

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


app.listen(3000, () => {
    console.log('## Listening on port 3000');
});


// newUser.save().then((result) => {
//     console.log(`## User ${result.name} was created succesfully`, require('util').inspect(result, true, 5, true));
// },(error) => {
//     console.log('## User could not be created', error);
// });

// mongoose.connection.close();
