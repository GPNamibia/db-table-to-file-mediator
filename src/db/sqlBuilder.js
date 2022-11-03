// upsert record into MYSQL
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
const today = new Date()
const currentYear = today.getFullYear()

//A function that reads the table 
async function readData(model,sqlLimit) {
const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - sqlLimit));
const month = String(sevenDaysAgo.getMonth() + 1).padStart(2, '0');    // 10 (Month is 0-based, so 10 means 11th Month)
const year = sevenDaysAgo.getFullYear()
const intervalDate=year.toString()+month.toString();
console.log(intervalDate)

  const foundItems = await model.findAll({
    where: {
      period: {
        [Op.gte]: intervalDate
      }
    }
  });
  return foundItems;
}

module.exports = {
  readData,
};