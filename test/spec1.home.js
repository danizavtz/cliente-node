process.env.NODE_ENV = 'test';
const expect = require('chai').expect,
    supertest = require('supertest'),
    app = require('../app'),
    url = '/',
    server = app.listen(),
    api = supertest(server);

describe('#HOME', () => {
    describe('GET', () => {
        it('Check get route does not exist', (done) => {
            api.get(url + 'test')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(404)
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    done();
                });
        });
        it('Check undefined route does not exist', (done) => {
            api.get(url + undefined)
                .set('Accept', 'application/json; charset=utf-8')
                .expect(404)
                .end((err, res) => {
                    expect(res.status).to.equal(404);
                    done();
                });
        });
        it('Check home page', (done) => {
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
