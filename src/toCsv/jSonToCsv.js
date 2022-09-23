const sqlBuilder = require('../db/sqlBuilder')
const fs = require('fs')
const converter = require('json-2-csv')
const { fact_anc_dhis2_export } = require('../models');
const fastcsv = require("fast-csv");
const axios = require('axios').default;

//Read from model and stringify to convert to csv

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
const postCsv = async (req, res)=>{
    const csvFile = fs.createReadStream("./src/toCsv/data.csv")
    console.groupCollapsed(csvFile)
    axios.post('http://192.168.1.17:4000/api/csv/getCsv', {
        file: csvFile
      })
      .then(function (response) {
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

module.exports = {
    getPtrackerData, postCsv
};

