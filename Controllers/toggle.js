const db = require('../models/index');
const User = db.User

// Your controller function with Sequelize ORM
const Add_toggle = async (req, res) => {
  const id = req.params.id;
  const user_remarks_history = req.body.user_remarks_history;
  const user_status = req.body.user_status;

  try {
    // Find the user by id
    const user = await User.findByPk(id);
    console.log(user)
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user
    const admin = await user.update({
      User_remarks_history: user_remarks_history,
      User_status: user_status
    });
    res.status(201).json({ message: "updated user status", admin });

  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = { Add_toggle };


