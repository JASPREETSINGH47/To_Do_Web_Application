var DataTypes = require("sequelize").DataTypes;
var _list = require("./list");

function initModels(sequelize) {
  var list = _list(sequelize, DataTypes);


  return {
    list,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
