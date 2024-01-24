const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sequelize = require('../DB/dbconncet');
const session = require('express-session');
const router = express.Router();


router.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

const jwtSecretKey = "your_secret_key";

router.post("/adminlogin", (req, res) => {

  const { email, password } = req.body;
  const sql = "SELECT * FROM user WHERE email = ?";
  const trimmedEmail = String(email).trim();
  const trimmedPassword = String(password).trim();

  sequelize.query(sql, [trimmedEmail], (err, result) => {
    if (err) {
      console.error("Error running database query:", err);
      return res
        .status(500)
        .json({ Status: "Error", Error: "Error in running query" });
    }

    if (result.length === 0) {
      console.log("User not found");
      return res.status(401).json({ Status: "Error", Error: "User not found" });
    }

    const userStatus = result[0].user_status;

    // Check if the user is inactive
    if (userStatus == 0) {
      console.log("User account is inactive");
      return res.status(401).json({
        Status: "inactive",
        Error: "Your account is inactive. Please contact the admin.",
      })
    }

    const hashedPasswordFromDatabase = result[0].password;

    // Compare the user-provided password with the hashed password from the database
    bcrypt.compare(
      trimmedPassword,
      hashedPasswordFromDatabase,
      (bcryptErr, bcryptResult) => {
        console.log("bcryptErr:", bcryptErr);
        console.log("bcryptResult:", bcryptResult);

        if (bcryptErr || !bcryptResult) {
          console.log("Wrong Email or Password");
          return res
            .status(401)
            .json({ Status: "Error", Error: "Wrong Email or Password" });
        }

        var userPayload = {
          userId: result[0].id,
          username: result[0].fullname,
          role: result[0].profile, // Assuming you have a "role" field in your user table
        };

        req.session.userPayload = userPayload;
        const token = jwt.sign(userPayload, jwtSecretKey, {
          expiresIn: "1d",
        });
        res.cookie("token", token);
        console.log("User logged in successfully. Token generated:", token);
        console.log("userId: ", userPayload);
        const adminDataSql = "SELECT * FROM user WHERE id = ?";
        const adminId = result[0].id;

        sequelize.query(adminDataSql, [adminId], (adminErr, adminResult) => {
          if (adminErr) {
            console.error("Error fetching admin data:", adminErr);
            return res
              .status(500)
              .json({ Status: "Error", Error: "Error fetching admin data" });
          }
          // Assuming admin data is successfully fetched, you can include it in the response
          const adminData = adminResult[0];

          // res.cookie('token', token, { httpOnly: false });
          res.cookie("token", token);
          return res
            .status(200)
            .json({ Status: "Success", adminData: adminData, token: token });

          // res.cookie('token', token);
          // return res.status(200).json({ Status: "Success", AdminData: adminData });
        });
      }
    );
  });
});


// for user signup
router.post("/createuser", (req, res) => {
  const email = req.body.email;
  const passwordd = email.split("@")[0];

  // Check if the email already exists in the database
  const checkEmailQuery = "SELECT COUNT(*) AS count FROM user WHERE email = ?";
  sequelize.query(checkEmailQuery, [email], (err, emailResult) => {
    if (err) {
      console.error("Error checking email in the database:", err);
      return res.json({ Status: "Error" });
    }

    // Check if the email count is greater than 0, indicating that the email already exists
    if (emailResult[0].count > 0) {
      console.log("Email already exists.");
      // return res.json({ Status: "Email already exists" });
      return res.json({ Status: "exists" });
    }

    // If the email is not found, proceed with user creation
    bcrypt.hash(passwordd, 10, (hashErr, hash) => {
      if (hashErr) {
        console.error("Error in hashing password:", hashErr);
        return res.json({ Error: "Error in hashing password" });
      }

      const insertUserQuery =
        "INSERT INTO user (`fullname`, `email`, `password`, `phonenumber`, `designation`, `department`, `reportto`, `profile`, `branch`,`user_remarks_history`) VALUES (?)";

      const user_remarks_history = req.body.user_remarks_history;
      const user_remarks_historyJSON = JSON.stringify(user_remarks_history);
      const values = [
        req.body.fullname,
        email,
        hash,
        req.body.phonenumber,
        req.body.designation,
        req.body.department,
        req.body.reportto,
        req.body.profile,
        req.body.branch,
        user_remarks_historyJSON,
      ];

      sequelize.query(insertUserQuery, [values], (insertErr, result) => {
        if (insertErr) {
          console.error("Error in database query:", insertErr);
          return res.json({ Status: "Error" });
        }
        console.log("User created successfully.");
        return res.json({ reqBody: req.body, Result: result });
      });
    });
  });
});

router.get("/userdata", (req, res) => {
  const page = parseInt(req.query.page, 10);
  const { search = '' } = req.query
  const perPage = 5;
  const sql = "SELECT * FROM user ORDER BY id DESC";
  sequelize.query(sql, (err, result) => {
    if (err) {
      res.status(422).json("No data available");
    } else {
      const parsedResults = result.map((row) => {
        const userRemarksHistory = JSON.parse(row.user_remarks_history);

        return {
          ...row,
          user_remarks_history: userRemarksHistory,
        };
      });

      const searchedUsers = parsedResults?.filter((product) => {
        return product.fullname.toLowerCase().includes(search)
      },
      )
      const totalPages = Math.ceil(searchedUsers.length / perPage);

      const paginatedResults = searchedUsers.slice(
        (page - 1) * perPage,
        page * perPage,
      );
      page > totalPages || page <= 0 ? res.status(201).json({
        data: "no data to show for this page"
      }) :
        res.status(201).json({
          data: !page ? searchedUsers : paginatedResults,
          totalPages: totalPages,
          currentPage: page,
        });
    }
  });
});

// Request to reset password
router.post("/changepassword", (req, res) => {
  const { email } = req.body;

  const sqlSelect = "SELECT * FROM user WHERE email = ?";

  sequelize.query(sqlSelect, [email], (selectErr, user) => {
    if (selectErr) {
      console.error("Error selecting user:", selectErr);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!user.length) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = user[0].id;

    // Generate a reset link without using a reset_token
    const resetLink = `http://52.54.165.0:3000/changepassword/${userId}`;

    const mailOptions = {
      from: "balakrishna.n@teksacademy.com", // Replace with your email
      to: 'balunandam1122@gmail.com',
      subject: "Password Reset",
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    mailgun.messages().send(mailOptions, (mailErr) => {
      if (mailErr) {
        console.error("Error sending email:", mailErr);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      return res.status(200).json({ message: "Reset link sent to your email" });
    });
  });
});

// Update password after clicking the link
router.put("/resetpassword/:id", (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  // Check if the password is provided
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error("Error hashing password:", hashErr);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const sqlUpdatePassword = "UPDATE user SET password = ? WHERE id = ?";

    sequelize.query(sqlUpdatePassword, [hashedPassword, id], (updateErr, result) => {
      if (updateErr) {
        console.error("Error updating password:", updateErr);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ updated: true });
    });
  });
});

module.exports = router;