module.exports = (sequelize, DataTypes) => {
  const Entite = sequelize.define('Entite', {
    // Model attributes are defined here
    Entite_Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    Member: {
      type: DataTypes.STRING,
      allowNull: true

      // allowNull defaults to true
    },
    EntityPhoto: {
      type: DataTypes.BLOB('long'),
      allowNull: true
    }
  }, {
    // Other model options go here
  });
  Entite.associate = (models) => {
    Entite.belongsToMany(models.User, { through: 'UserEntite' });
  };
  return Entite;
}