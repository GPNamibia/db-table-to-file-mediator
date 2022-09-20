async function readData(model) {
  const attri = model.attributes
    const foundItems = await model.findAll({ attributes: {exclude: ['id','COCUID','AOCUID']},});
    return foundItems;
    
  }
  module.exports = {
    readData,
  };