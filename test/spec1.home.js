process.env.NODE_ENV = 'test';
var expect = require('chai').expect,
    supertest = require('supertest'),
    app = require('../app'),
    url = '/',
    server = app.listen(),
    api = supertest(server);

describe('#HOME', function() {
    describe('GET', function() {
        it('Check get route does not exist', function(done) {
            api.get(url + 'test')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(404)
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    done();
                });
        });
        it('Check undefined route does not exist', function(done) {
            api.get(url + undefined)
                .set('Accept', 'application/json; charset=utf-8')
                .expect(404)
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    done();
                });
        });
        it('Check home page', function(done) {
            api.get(url)
                .set('Accept', 'application/json; charset=utf-8')
                .expect(200)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });
});
