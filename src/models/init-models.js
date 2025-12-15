var DataTypes = require("sequelize").DataTypes;
var _questions = require("./questions");

function initModels(sequelize) {
  var questions = _questions(sequelize, DataTypes);


  return {
    questions,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
