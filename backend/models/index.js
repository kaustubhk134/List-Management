const sequelize = require("../utils/database");
const List = require("./listModel");

sequelize.sync({ force: true });
// sequelize.sync();

module.exports = {
    sequelize, List
}