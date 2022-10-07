const chai = require('chai');
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const sqlBuilder = require('../src/db/sqlBuilder');
const model = require('./dummyModel/fact_anc_dhis2_export.js')

describe('Get PTracker data from model: readData', () => {
    const sandbox = sinon.createSandbox();
    afterEach(() => { sandbox.restore() });

    it(`Should get data from the database model`, () => {
        const getStub = sandbox.stub(sqlBuilder, 'readData')
        .resolves(true)
     sqlBuilder.readData(model)
        .then((result) => {
            expect(result).to.be.equal(true);
            expect(getStub).to.have.been.calledOnce;
            done();
        })
        .catch();
    })
    it(`Should return an error message if any of the parameters are missing or undefined`, () => {
        const getStub = sandbox.stub(sqlBuilder, 'readData')
            .resolves()
        sqlBuilder.readData(model)
            .catch(error => {
                expect(error).to.be.equal('Error, parameters passed.\n');
                expect(getStub).to.have.not.been.called;
                done();
            });
    })

    it(`Should return an error message if no parameters are passed`, () => {
        const getStub = sandbox.stub(sqlBuilder, 'readData')
            .resolves()
        sqlBuilder.readData()
            .catch(error => {
                expect(error).to.be.equal('Error, no parameters passed.\n');
                expect(getStub).to.have.not.been.called;
                done();
            });
    })
});