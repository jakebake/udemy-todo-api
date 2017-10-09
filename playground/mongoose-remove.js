const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log('## result', result);
// });
//
//
// Todo.findOneAndRemove({_id: '59db6d480e9d2d29d90e78b1'}).then((res) => {
//     console.log('## Todo was removed', res);
// });

// Todo.findByIdAndRemove('59db6d480e9d2d29d90e78b1').then((res) => {
//     console.log('## Todo was removed', res);
// });
