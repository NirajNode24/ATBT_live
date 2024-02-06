const { DataTypes, DATE } = require('sequelize');
const sequelize = require('../DB/dbconncet');

const Custom = async (req, res) => {
  try {
    var data = req.body.arrayOfObjects; 
    var EntityName = req.body.Name;
    const inputnames = data.map(item => item.inputname);
    var Name = inputnames[0];
    var Image = inputnames[1];
    var Description = inputnames[2];
    var Members = inputnames[3];
    var MultiSelect = inputnames[4];
    var Custom1 = inputnames[5];
    var Custom2 = inputnames[6];
    var Custom3 = inputnames[7];
    var Custom4 = inputnames[8]
    var Custom5 = inputnames[9]



    console.log(inputnames)
    const Entity = sequelize.define('CutomEntityForm', {
      [Name]: {
        type: DataTypes.STRING,
        allowNull: true
      },
      [Description]: {
        type: DataTypes.STRING,
        allowNull: true
      },
      [Members]: {
        type: DataTypes.STRING,
        allowNull: true
      },
      [Image]: {
        type: DataTypes.STRING,
        allowNull: true
      },
      [MultiSelect]:{
        type: DataTypes.STRING,
        allowNull: true
      },
      [Custom1]:{
        type: DataTypes.STRING,
        allowNull: true
      },
      [Custom2]:{
        type: DataTypes.STRING,
        allowNull: true
      },
      [Custom3]:{
        type: DataTypes.STRING,
        allowNull: true
      },
      [Custom4]:{
        type: DataTypes.STRING,
        allowNull: true
      },
      [Custom5]:{
        type: DataTypes.STRING,
      },
      EntityName:{
        type: DataTypes.STRING,
        allowNull: true
      }
    });  

    await Entity.sync();
    res.status(201).json({ message: "Entity created successfully" });
  } catch (error) {
    console.error("Error creating entity:", error);
    res.status(500).json({ error: "Error" });
  }
};

module.exports = { Custom };
