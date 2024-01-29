const db = require('./index');


module.exports = (sequelize, DataTypes) => {
    const UserEntite = sequelize.define('UserEntite', {
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        EntiteId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Entites',
                key: 'id'
            }
        }

    });
    return UserEntite;
};