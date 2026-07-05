const sequelize = require("../utils/database");

const List = require("./listModel");

sequelize.sync();

module.exports = {
    sequelize, List
}