//A function that reads the table 
async function readData(model) {
    const foundItems = await model.findAll({ attributes: {exclude: ['id']},});
    return foundItems;
  }

  module.exports = {
    readData,
  };