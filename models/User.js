const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const sequelize = require('../DB/dbconncet');

module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        defaultValue: "suadmin",
        allowNull: false,
        validate: {
            len: [6, 255]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'email',
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
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
        type: DataTypes.TEXT,
        allowNull: true
        // allowNull defaults to true
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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