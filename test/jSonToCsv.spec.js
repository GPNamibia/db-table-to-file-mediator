const chai = require('chai');
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const originalcsv = require("../src/csvData/jSonToCsv");
const {rawData}= require("./dummyData/dummyData.js");
const expect = chai.expect;
const { fact_anc_dhis2_export } = require('../src/models');
const privateConfig = require("../src/config/private-config.json")


describe('Get PTracker data function: getPTrackerDataFremDb', () => {
    const sandbox = sinon.createSandbox();
    afterEach(() => { sandbox.restore() });
    it(`Should get data from the model and convert to JSON`, () => {
        const getStub = sandbox.stub(originalcsv, 'getPtrackerDataFromDb')
        .resolves(true)
        originalcsv.getPtrackerDataFromDb(fact_anc_dhis2_export,privateConfig.tables.fact_anc_dhis2_export)
        .then((result) => {
            expect(result).to.be.equal(true);
            expect(getStub).to.have.been.calledOnce;
            done();
        })
        .catch();
    });
   
  it(`Should return an error message when not converted to CSV due to any of the parameters missing or undefined`, () => {
    const getStub = sandbox.stub(originalcsv, 'getPtrackerDataFromDb')
        .resolves()
        originalcsv.getPtrackerDataFromDb(fact_anc_dhis2_export)
        .catch(error => {
            expect(error).to.be.equal('Incorrect parameters passed.\n');
            expect(getStub).to.have.not.been.called;
            done();
        });
})

it(`should return an error message when not converted to CSV due to no parameters are passed`, () => {
    const getStub = sandbox.stub(originalcsv, 'getPtrackerDataFromDb')
        .resolves()
        originalcsv.getPtrackerDataFromDb()
        .catch(error => {
            expect(error).to.be.equal('Error, no parameters passed.\n');
            expect(getStub).to.have.not.been.called;
            done();
        });
})

});
  
  describe('Convert JSON data to CSV function: saveCsvFile', () => {
    const sandbox = sinon.createSandbox();
    afterEach(() => { sandbox.restore() });
    it(`Should convert JSON data to CSV data `, () => {
        const getStub = sandbox.stub(originalcsv, 'saveCsvFile')
        .resolves(true)
      originalcsv.saveCsvFile(privateConfig.tables.fact_anc_dhis2_export,'./test/dummyData/fact_anc_dhis2_export.csv')
      .then((result) => {
        expect(result).to.be.equal(true);
        expect(getStub).to.have.been.calledOnce;
        done();
    })
    .catch();
})
    
      it(`Should return an error message when any of the parameters are missing or undefined`, () => {
        const getStub = sandbox.stub(originalcsv, 'saveCsvFile')
            .resolves()
            originalcsv.saveCsvFile('./test/dummyData/fact_anc_dhis2_export.csv')
            .catch(error => {
                expect(error).to.be.equal('Error, missing or undefined parameters passed.\n');
                expect(getStub).to.have.not.been.called;
                done();
            });
    })

    it(`Should return an error message when no parameters are passed`, () => {
        const getStub = sandbox.stub(originalcsv, 'saveCsvFile')
            .resolves()
            originalcsv.saveCsvFile()
            .catch(error => {
                expect(error).to.be.equal('Error, no parameters passed.\n');
                expect(getStub).to.have.not.been.called;
                done();
            });
    })
      });

