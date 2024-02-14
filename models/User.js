const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const sequelize = require('../DB/dbconncet');

module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {
    userName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        defaultValue: "suadmin",
        allowNull: true,
        validate: {
            len: [6, 255]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: 'email',
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: /^\d{10}$/
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,

    },
    User_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true

        // allowNull defaults to true
    },
    User_remarks_history: {
        type: DataTypes.JSON,
        allowNull: true
        // allowNull defaults to true
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
        }
    },
});
return User
}
// module.exports = User;