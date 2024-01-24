var db = require('../models/index');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const Admin = db.Admin;
const User = db.User

const Add_Admin = async (req, res) => {
  try {
    var data = (req.body)
    console.log(data)
    const admin = await Admin.create(data);
    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    // Handle any errors that occur during the Admin creation process
    console.error("Error creating admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const Create_User = async (req, res) => {
  const transporter = nodemailer.createTransport({
    port: 587,
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: 'nirajkr00024@gmail.com',
      pass: 'fkjj xtju fauu tgai'
    }
  });

  const mailData = {
    from: 'nirajkr00024@gmail.com',
    to: req.body.email,
    subject: 'Sending Email using Node.js',
    text: 'User Created!',
    html: `<b>Hey there your account has been created please use the below credentials to login</b><br><a href="https://main.d4f46sk4x577g.amplifyapp.com/login">login</a></b><br>email:${req.body.email} password: ${req.body.password}<br/>`,
  };
  try {
    var data = (req.body)
    console.log(data)
    const user = await User.create(data);
    transporter.sendMail(mailData, function (err, info) {
      if (err)
        res.status(500).json({ error: err.message });
      else
        // res.json({ message: 'Email sent successfully! ${send_to}', info: info });
        res.json({ message: `mail send to your repected mail ${send_to}` });
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    // Handle any errors that occur during the user creation process
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function Login_Admin(email, password) {
  try {
    const user = await Admin.findOne({
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

const List_Admin = async (req, res) => {
  try {
    // Create an Admin with the given data
    const admin = await Admin.findAll();
    res.status(200).json({ admin });
  } catch (error) {
    // Handle any errors that occur during the Admin creation process
    console.error("Error creating admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const Get_Admin = async (req, res) => {
  try {
    // Create an Admin with the given data
    const admin = await Admin.findOne({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ message: `your id is:${req.params.id}`, admin });
  } catch (error) {
    // Handle any errors that occur during the Admin creation process
    console.error("Error creating admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const Update_Admin = async (req, res) => {
  try {
    var data = req.body;
    await Admin.update(data, {
      where: { id: req.params.id }
    });
    res.status(200).json({ message: `Admin updated successfully ${req.params.id}` });
  } catch (error) {
    // Handle any errors that occur during the Admin creation process
    console.error("Error creating admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const Delete_Admin = async (req, res) => {
  try {
    await Admin.destroy({
      where: { id: req.params.id },
      // truncate: true
    });

    res.status(200).json({ message: `Admin deleted successfully ${req.params.id}` });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { Add_Admin, List_Admin, Get_Admin, Update_Admin, Delete_Admin, Login_Admin, Create_User };


