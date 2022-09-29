const express = require("express");
const privateConfig = require('./config/private-config.json');
const db = require('./models');
const app = express();
const ptrackerData = require('./csvData/jSonToCsv')
const { getQueryParameters } = require('./openhim/initialize');
const cors = require('cors');
const { fact_anc_dhis2_export } = require('../src/models');
const { fact_mbfu_dhis2_export } = require('../src/models');
const { fact_maternity_dhis2_export } = require('../src/models');



app.all('*', async (req, res) => {
  // Starts when a new request is triggered by the polling channel
  console.log(`\n---------------------------------------------------------------------------------`,
    `\n${new Date().toUTCString('en-GB', { timeZone: 'UTC' })}  - `,
    `DHIS 2 <=> Datatbase File Mediator has received a new request. \n`
  );
  
  //get data from tables and send data to dhis2Mediator
  ptrackerData.getDataAndPost().then((res)=>{
    try {
      res.json('PTracker data succesfully sent to DHIS@ mediator')
    } catch (error) {
      console.log('Error sending data to DHIS2 mediator')
    }
  })
});
//get data from tables
//ptrackerData.getPtrackerData();
//send data to dhis2Mediator
//ptrackerData.postPtrackerData();



//openhim: comment out when connected to localhost 
getQueryParameters();

//Server PORT
db.sequelize.sync({}).then((req) => {
  app.listen(privateConfig.appConfig.PORT, (err) => {
    if (err) console.log(`Error: ${err}`)
    console.log(`${privateConfig.appConfig.Name}  listening on port ${privateConfig.appConfig.PORT}...  \n`);
  });
}).then(() => {
  console.log(`Succesfully connected to '${privateConfig.development.database}' database...  \n`)

}).catch(err => { console.log(`Error when connecting to '${privateConfig.development.database}' database...:: \n`, err) })