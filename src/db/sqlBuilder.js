//A function that reads the table 
async function readData(model) {
    const foundItems = await model.findAll({attributes: {exclude: ['id']},},{ where: { period: '202210' } });
    return foundItems;
  }

  module.exports = {
    readData,
  };