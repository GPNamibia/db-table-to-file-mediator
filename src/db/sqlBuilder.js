// upsert record into MYSQL
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

async function readData(model) {
  const foundItems = await model.findAll();
  return foundItems;
}

module.exports = {
  readData,
};
