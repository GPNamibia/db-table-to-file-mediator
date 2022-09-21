const sqlBuilder = require('../db/sqlBuilder')
const fs = require('fs')
const converter = require('json-2-csv')
const { fact_anc_dhis2_export } = require('../models');
const fastcsv = require("fast-csv");

function getPtrackerData() {
    sqlBuilder.readData(fact_anc_dhis2_export).then((res) => {
        var data = JSON.parse(JSON.stringify(res))

        const ws=fs.createWriteStream('./src/toCsv/data.csv');
        fastcsv
            .write(data, { headers: true })
            .on("finish", function () {
                console.log(`1. Write to data.csv successfully! \n`);
            })
            .pipe(ws);
    })
}

module.exports = {
    getPtrackerData
};