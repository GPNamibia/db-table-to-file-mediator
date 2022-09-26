const sqlBuilder = require('../db/sqlBuilder')
const fs = require('fs')
const converter = require('json-2-csv')
const { fact_anc_dhis2_export } = require('../models');
const { fact_mbfu_dhis2_export } = require('../models');
const { fact_maternity_dhis2_export } = require('../models');
const fastcsv = require("fast-csv");
const axios = require('axios').default;
const privateConfig = require("../config/private-config.json")
const { parse } = require("csv-parse");

//Read from model and stringify to convert to csv
async function getPtrackerDataFromDb(table_name_model, table_name) {
  await sqlBuilder.readData(table_name_model).then((res) => {
    var data = JSON.parse(JSON.stringify(res))

    const ws = fs.createWriteStream(`./src/csvData/ ${table_name}.csv`);
    fastcsv
      .write(data, { headers: true })
      .on("finish", function () {
        console.log(`Write to ${table_name} successfully! \n`);
      })
      .pipe(ws);
  })
}
// send data to dhis2Mediator
const postCsvToEndpoint = async (table_name) => {
  const csvFile = fs.readFile(`./src/csvData/ ${table_name}.csv`, function (err, filedata) {
    parse(filedata, { columns: true, trim: true }, function (err, rows) {
      axios.post('http://192.168.1.17:4000/api/csv/getCsv', {
        table_name, rows
      })
        .then(function (response) {
          //console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  })
}
//the data being sent
async function postPtrackerData() {
  try {
    await Promise.all([
      this.postCsvToEndpoint(privateConfig.tables.fact_anc_dhis2_export),
      this.postCsvToEndpoint(privateConfig.tables.fact_mbfu_dhis2_export),
      this.postCsvToEndpoint(privateConfig.tables.fact_maternity_dhis2_export)
    ])
  } catch (error) {
    console.log("error posting data", error)
  }
}
//the data being received
async function getPtrackerData() {
  try {
    await Promise.all([
      this.getPtrackerDataFromDb(fact_anc_dhis2_export, privateConfig.tables.fact_anc_dhis2_export),
      this.getPtrackerDataFromDb(fact_mbfu_dhis2_export, privateConfig.tables.fact_mbfu_dhis2_export),
      this.getPtrackerDataFromDb(fact_maternity_dhis2_export, privateConfig.tables.fact_maternity_dhis2_export)
    ])
  } catch (error) {
    console.log("error fetching data from database:", error)
  }
}

module.exports = {
  getPtrackerDataFromDb,
  postCsvToEndpoint,
  getPtrackerData,
  postPtrackerData
};

