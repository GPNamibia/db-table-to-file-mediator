const express = require("express");
const privateConfig = require('./config/private-config.json');
const db = require('./models');
const app = express();
const ptrackerData = require('./csvData/jSonToCsv')
const { getQueryParameters } = require('./openhim/initialize');
const cors = require('cors');

app.use(express.json({limit: "5000000000000mb", extended: true}))
app.use(express.urlencoded({limit: "5000000000000mb", extended: true, parameterLimit: 5000000000000}))

app.all('*', async (req, res) => {
  // Starts when a new request is triggered by the polling channel
  console.log(`\n---------------------------------------------------------------------------------`,
    `\n${new Date().toUTCString('en-GB', { timeZone: 'UTC' })}  - `,
    `DHIS 2 <=> Datatbase File Mediator has received a new request. \n`
  );
  
  //get data from tables and send data to dhis2Mediator
 await ptrackerData.getDataAndPost(getQueryParameters().sql_limit_number)
        .then((results) => {
                res.json(`PTracker data succesfully sent to DHIS2 mediator..${getQueryParameters().sql_limit_number}`);
                console.log(`PTracker data succesfully sent to DHIS2 mediator..${getQueryParameters().sql_limit_number}`);
        }).catch(error => { res.json(`Error retrieving PTracker Data: ${error}`) })
});

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