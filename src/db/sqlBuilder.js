// upsert record into MYSQL
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

//A function that reads the table 
async function readData(model) {
  const foundItems = await model.findAll({
    where: {
      period: {
        [Op.substring]: '2022'
      }
    }
  });
  return foundItems;
}

module.exports = {
  readData,
};