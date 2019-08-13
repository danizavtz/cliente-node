process.env.NODE_ENV = 'test';
const expect = require('chai').expect,
    supertest = require('supertest'),
    app = require('../app'),
    pg = require('../mysql/db'),
    fs = require('fs'),
    _url = '/clientes/',
    server = app.listen(),
    api = supertest(server);
const sql = fs.readFileSync(__dirname + '/../sql/test.sql').toString();

describe('#CLIENTE', () => {
    before((done) => {
        pg.initialize(app.configdb, err => {
            if (err) {
                throw err;
            }
            pg.client.query(sql, err => {
                if (err) {
                    throw err;
                }
                done();
            });
        });
    });

    describe('GET', () => {
        it('Check get cliente route does not exist', done => {
            api.get(_url + 'test')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(404)
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    done();
                });
        });
        it('Check return an array with clientes', done => {
            api.get(_url)
                .set('Accept', 'application/json; charset=utf-8')
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.instanceOf(Array);
                    expect(res.body.length).to.equal(1);
                    done();
                });
        });
        it('Check return an instanceof cliente', done => {
            api.get(_url + '10')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.have.property("id");
                    expect(res.body.id).to.equal(10);
                    expect(res.body).to.have.property("login");
                    expect(res.body.login).to.equal("blabla");
                    expect(res.body).to.have.property("email");
                    expect(res.body.email).to.equal("a@a.com");
                    expect(res.body).to.have.property("phone");
                    expect(res.body.phone).to.equal("8399887766");
                    done();
                });
        });
    });
    describe('POST', () => {
        it('Check validation error', done => {
            api.post(_url)
                .set('Accept', 'application/json; charset=utf-8')
                .send({})
                .expect(400)
                .end((err, res) => {
                    expect(res.body).to.have.property("errors");
                    expect(res.body.errors).to.be.instanceOf(Array);
                    expect(res.body.errors.length).to.equal(2);
                    done();
                });
        });
        it('Check validation error', done => {
            api.post(_url)
                .set('Accept', 'application/json; charset=utf-8')
                .send({})
                .expect(400)
                .end((err, res) => {
                    expect(res.body).to.have.property("errors");
                    expect(res.body.errors).to.be.instanceOf(Array);
                    expect(res.body.errors.length).to.equal(2);
                    done();
                });
        });
        it('Check phone validation error', done => {
            api.post(_url)
                .set('Accept', 'application/json; charset=utf-8')
                .send({
                    email: "a@a.com",
                    phone: "",
                })
                .expect(400)
                .end((err, res) => {
                    expect(res.body).to.have.property("errors");
                    expect(res.body.errors).to.be.instanceOf(Array);
                    expect(res.body.errors[0]).to.have.property("msg");
                    expect(res.body.errors[0].msg).to.equal("phone is required");
                    done();
                });
        });
        it('Check email validation error', done => {
            api.post(_url)
                .set('Accept', 'application/json; charset=utf-8')
                .send({
                    email: "",
                    phone: "1",
                })
                .expect(400)
                .end((err, res) => {
                    expect(res.body).to.have.property("errors");
                    expect(res.body.errors).to.be.instanceOf(Array);
                    expect(res.body.errors[0]).to.have.property("msg");
                    expect(res.body.errors[0].msg).to.equal("email is required");
                    done();
                });
        });
        it('Check email format validation error', done => {
            api.post(_url)
                .set('Accept', 'application/json; charset=utf-8')
                .send({
                    email: "lalala@",
                    phone: "123",
                })
                .expect(400)
                .end((err, res) => {
                    expect(res.body).to.have.property("errors");
                    expect(res.body.errors).to.be.instanceOf(Array);
                    expect(res.body.errors[0]).to.have.property("msg");
                    expect(res.body.errors[0].msg).to.equal("email is required");
                    done();
                });
        });
        it('Check phone must be numeric validation error', done => {
            api.post(_url)
                .set('Accept', 'application/json; charset=utf-8')
                .send({
                    email: "lalala@tuta.io",
                    phone: "12#3",
                })
                .expect(400)
                .end((err, res) => {
                    expect(res.body).to.have.property("errors");
                    expect(res.body.errors).to.be.instanceOf(Array);
                    expect(res.body.errors[0]).to.have.property("msg");
                    expect(res.body.errors[0].msg).to.equal("phone is required");
                    done();
                });
        });
        it('Check post with success', done => {
            api.post(_url)
                .set('Accept', 'application/json; charset=utf-8')
                .send({
                    email: "lalala@tuta.io",
                    phone: "123",
                })
                .expect(201)
                .end((err, res) => {
                    expect(res.body).to.have.property("id");
                    expect(res.body.id).to.equal(1);
                    expect(res.body).to.have.property("login");
                    expect(res.body.login).to.equal(null);
                    expect(res.body).to.have.property("email");
                    expect(res.body.email).to.equal("lalala@tuta.io")
                    expect(res.body).to.have.property("phone");
                    expect(res.body.phone).to.equal("123")
                    done();
                });
        });
    });
    describe('PUT', () => {
        it('Check put phone validation error', done => {
            api.put(_url + '10')
                .set('Accept', 'application/json; charset=utf-8')
                .send({
                    email: "lalala@tuta.io",
                    phone: "12#3",
                })
                .expect(400)
                .end((err, res) => {
                    expect(res.body).to.have.property("errors");
                    expect(res.body.errors).to.be.instanceOf(Array);
                    expect(res.body.errors[0]).to.have.property("msg");
                    expect(res.body.errors[0].msg).to.equal("phone is required");
                    done();
                });
        });
        it('Check put email validation error', done => {
            api.put(_url + '10')
                .set('Accept', 'application/json; charset=utf-8')
                .send({
                    email: "lalala",
                    phone: "123",
                })
                .expect(400)
                .end((err, res) => {
                    expect(res.body).to.have.property("errors");
                    expect(res.body.errors).to.be.instanceOf(Array);
                    expect(res.body.errors[0]).to.have.property("msg");
                    expect(res.body.errors[0].msg).to.equal("email is required");
                    done();
                });
        });
        it('Check put with success', done => {
            api.get(_url + '10')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.have.property("id");
                    expect(res.body.id).to.equal(10);
                    expect(res.body).to.have.property("login");
                    expect(res.body.login).to.equal("blabla");
                    expect(res.body).to.have.property("email");
                    expect(res.body.email).to.equal("a@a.com");
                    expect(res.body).to.have.property("phone");
                    expect(res.body.phone).to.equal("8399887766");
                    api.put(_url + '10')
                        .set('Accept', 'application/json; charset=utf-8')
                        .send({
                            email: "lalala@tuta.com",
                            phone: "123456789",
                        })
                        .expect(200)
                        .end((err, res) => {
                            expect(res.body).to.have.property("id");
                            expect(res.body.id).to.equal(10);
                            expect(res.body).to.have.property("login");
                            expect(res.body.login).to.equal("blabla")
                            expect(res.body).to.have.property("email");
                            expect(res.body.email).to.equal("lalala@tuta.com")
                            expect(res.body).to.have.property("phone");
                            expect(res.body.phone).to.equal("123456789");
                            done();
                        });
                });
        });
        it('Check put with success all fields', done => {
            api.get(_url + '10')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.have.property("id");
                    expect(res.body.id).to.equal(10);
                    expect(res.body).to.have.property("login");
                    expect(res.body.login).to.equal("blabla")
                    expect(res.body).to.have.property("email");
                    expect(res.body.email).to.equal("lalala@tuta.com")
                    expect(res.body).to.have.property("phone");
                    expect(res.body.phone).to.equal("123456789");
                    api.put(_url + '10')
                        .set('Accept', 'application/json; charset=utf-8')
                        .send({
                            login: "teste",
                            email: "lalala@tuta.io",
                            phone: "123456789",
                        })
                        .expect(200)
                        .end((err, res) => {
                            expect(res.body).to.have.property("id");
                            expect(res.body.id).to.equal(10);
                            expect(res.body).to.have.property("login");
                            expect(res.body.login).to.equal("teste")
                            expect(res.body).to.have.property("email");
                            expect(res.body.email).to.equal("lalala@tuta.io")
                            expect(res.body).to.have.property("phone");
                            expect(res.body.phone).to.equal("123456789");
                            done();
                        });
                });
        });
    });
    describe('DELETE', () => {
        it('Check delete not found error', done => {
            api.delete(_url + '0')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(404)
                .end((err, res) => {
                    expect(res.body).to.have.property("errors");
                    expect(res.body.errors).to.be.instanceOf(Array);
                    expect(res.body.errors[0]).to.have.property("msg");
                    expect(res.body.errors[0].msg).to.equal("Not found");
                    done();
                });
        });
        it('Check delete with success', done => {
            api.delete(_url + '10')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(204)
                .end((err, res) => {
                    expect(res.status).to.equal(204);
                    expect(res.body).to.be.empty;
                    done();
                });
        });
    });
});