const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test Todo'
},{
    _id: new ObjectID(),
    text: 'Second test Todo',
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    expect(todos[2].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo on invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should return the todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                // console.log('## res.body.todos[0]', res.body.todos[0]);
                // expect(res.body.todos[0]).toIncludeKeys(['text', 'completedAt']);
                expect(res.body.todos[0].text).toBe(todos[0].text);
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return the todo', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                console.log('## res.body', res.body);
                expect(res.body.todo.text).toBe(todos[0].text);
            }).end(done);
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get(`/todos/11${new ObjectID().toHexString()}`)
            .expect(400)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        let hexID = todos[1]._id.toHexString();
        //let hexID2 = todos[0]._id.toHexString();

        request(app)
            .delete(`/todos/${hexID}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexID);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.findById(hexID).then((todo) => {
                expect(todo).toBe(null);
                done();
            }).catch((e) => done(e));

        });
    });

    it('should return 404 if todo not found', (done) => {
        let hexID = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexID}`)
            .expect(404)
        .end(done);
    });

    it('should return 404 if objectID invalid', (done) => {
        request(app)
            .delete(`/todos/123abc`)
            .expect(400)
        .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update a todo', (done) => {
        let hexID = todos[0]._id.toHexString();

        request(app)
            .patch(`/todos/${hexID}`)
            .send({"completed":true, "text": "Changed in test"})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe("Changed in test");
                expect(typeof(res.body.todo.completedAt)).toEqual('string');
            })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.findById(hexID).then((todo) => {
                expect(todo.completed).toBe(true);
                done();
            }).catch((e) => done(e));

        });
    });

    it('should clear completedAt when todo is not completed', (done) => {
        let hexID = todos[1]._id.toHexString();

        request(app)
            .patch(`/todos/${hexID}`)
            .send({"completed":false})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBe(null);
            })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.findById(hexID).then((todo) => {
                expect(todo.completed).toBe(false);
                done();
            }).catch((e) => done(e));

        });
    });
});
