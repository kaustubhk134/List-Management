const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const { v4: uuidv4 } = require("uuid");

const List = sequelize.define("List",{

id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    // autoIncrement: true,
},

title:{
    type:DataTypes.STRING,
    allowNull:false
},

description:{
    type:DataTypes.TEXT,
    allowNull:false
},

isDeleted:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
}

});

module.exports=List;