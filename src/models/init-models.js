var DataTypes = require('sequelize').DataTypes;
var _fuel_location_distances = require('./fuel_location_distances');

function initModels(sequelize) {
  var fuel_location_distances = _fuel_location_distances(sequelize, DataTypes);

  return {
    fuel_location_distances,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
