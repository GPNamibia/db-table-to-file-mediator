//A function that reads the table 
async function readData(model) {
    const foundItems = await model.findAll({attributes: {exclude: ['id']},},{limit:1000});
    return foundItems;
  }

  module.exports = {
    readData,
  };