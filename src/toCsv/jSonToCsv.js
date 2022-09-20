const sqlBuilder = require("../db/sqlBuilder")
const fs  = require('fs')
const express = require("express")
const objectstocsv = require("object-to-csv") 
const converter= require('json-2-csv')
const mysql = require("mysql")
const app = express()

function getPtrackerData(table_name) {
sqlBuilder.readData(table_name).then((res)=>{
var data = JSON.parse(JSON.stringify(res))

converter.json2csv(data, (err,csv)=>{
    if (err){
        throw err;
    }
    console.log(csv)

    fs.writeFileSync('./data.csv', csv)
})
})}


module.exports = {
    getPtrackerData
}






