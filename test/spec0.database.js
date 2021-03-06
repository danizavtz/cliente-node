process.env.NODE_ENV = 'test';
const expect = require('chai').expect,
    pg = require('../mysql/db');

describe('#DATABASE', () => {
    describe('CONNECTION ERROR', () => {
        it('Should return database not found', (done) => {
            pg.initialize({}, (err) => {
            	err = JSON.parse(JSON.stringify(err));
            	expect(err).to.have.property("name");
            	expect(err.name).to.equal("error");
            	expect(err).to.have.property("severity");
            	expect(err.severity).to.equal("FATAL");
                done();
            });
        });
    });
});
