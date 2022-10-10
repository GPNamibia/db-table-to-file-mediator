// upsert record into MYSQL
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
const today = new Date()
const currentYear = today.getFullYear()

//A function that reads the table 
async function readData(model) {
  const foundItems = await model.findAll({
    where: {
      period: {
        [Op.substring]: currentYear
      }
    }
  });
  return foundItems;
}

module.exports = {
  readData,
};