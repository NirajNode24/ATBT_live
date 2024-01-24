const express = require('express')
const userRouter = express.Router()
const User = require('../Controllers/user')

// Define a route for the homepage
router.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

// Define a route for a specific resource
router.post('/add', User.Add_User)
router.get('/list', User.List_User)
router.get('/list/:id', User.Get_User)
router.put('/update/:id', User.Update_User)
router.delete('/delete/:id', User.Delete_User)
router.post('/create-user', User.Create_User)


module.exports = userRouter;
