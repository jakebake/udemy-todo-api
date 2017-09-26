const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let id = '59b1a689449c73b5d7f0f6c9';

User.findById(id).then((user) => {
    if (!user) {
        return console.log('## User Id not found');
    }
    console.log('## user', user);
}).catch((e) => console.log(e));

// if (!ObjectID.isValid(id)) {
//     console.log('## ID is not valid');
// }
//
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('## todos', todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('## todo by findOne', todo);
// });
//
// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('## ID not found');
//     }
//     console.log('## todo by ID', todo);
// }).catch((e) => {
//     console.log('## error', e);
// });
