var db = require('../models/index');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const User = db.User

async function Login_User(email, password) {
    try {
        const user = await User.findOne({
            where: {
                email
            }
        });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            return user;
        } else {
            throw new Error('Authentication failed');
        }
    } catch (error) {
        throw error;
    }
}

const List_User = async (req, res) => {
    try {
        // Create an User with the given data
        const user = await User.findAll();
        res.status(200).json({ user });
    } catch (error) {
        // Handle any errors that occur during the User creation process
        console.error("Error creating User:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const Get_User = async (req, res) => {
    try {
        // Create an User with the given data
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: `your id is:${req.params.id}`, user });
    } catch (error) {
        // Handle any errors that occur during the User creation process
        console.error("Error creating User:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const Update_User = async (req, res) => {
    try {
        var data = req.body;
        await User.update(data, {
            where: { id: req.params.id }
        });
        res.status(200).json({ message: `User updated successfully ${req.params.id}` });
    } catch (error) {
        // Handle any errors that occur during the User creation process
        console.error("Error creating User:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const Delete_User = async (req, res) => {
    try {
        await User.destroy({
            where: { id: req.params.id },
            // truncate: true
        });

        res.status(200).json({ message: `User deleted successfully ${req.params.id}` });
    } catch (error) {
        console.error("Error deleting User:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { Login_User, List_User, Get_User, Update_User, Delete_User };
