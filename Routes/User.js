const express = require('express')
const router = express.Router()
const User = require('../Controllers/user')

// Define a route for the homepage
router.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

// Define a route for a specific resource
router.get('/list', User.List_User)
router.get('/list/:id', User.Get_User)
router.put('/update/:id', User.Update_User)
router.put('/changepassword/:id', User.Update_Password)
router.put('/forgotpassword', User.Reset_Password)


module.exports = router;
