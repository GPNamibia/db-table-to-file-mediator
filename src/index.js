const express = require("express");
const privateConfig = require('./config/private-config.json');
const db = require('./models');
const app = express();
const mediData = require('./toCsv/jSonToCsv')
const {getQueryParameters }= require('./openhim/initialize');
const cors =require('cors');




app.all('*', async (req, res) => {
  // Starts when a new request is triggered by the polling channel
  console.log(`\n---------------------------------------------------------------------------------`,
    `\n${ new Date().toUTCString('en-GB', { timeZone: 'UTC' }) }  - `,
    `DHIS 2 <=> Datatbase File Mediator has received a new request. \n`
  );
  //csv get request
  mediData.getPtrackerData();
});

//mediData.getPtrackerData();
mediData.postCsv();

// //middleware defined
// app.use(express.json())
// app.use(cors());
// app.use(express.urlencodeed({ extended: true}))

// //define routes
// const router =require("./routes/csvRouter")
// app.use("/api/csv", router)

//openhim 
//getQueryParameters();


//Server PORT
db.sequelize.sync({}).then((req) => {
  app.listen(privateConfig.appConfig.PORT, (err) => {
      if (err) console.log(`Error: ${err}`)
      console.log(`${privateConfig.appConfig.Name}  listening on port ${privateConfig.appConfig.PORT}...  \n`);
  });
}).then(() => {
  console.log(`Succesfully connected to '${privateConfig.development.database}' database...  \n`)

}).catch(err => { console.log(`Error when connecting to '${privateConfig.development.database}' database...:: \n`, err) })