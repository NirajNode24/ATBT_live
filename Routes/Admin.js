const express = require('express');
const router = express.Router();
const Admin = require('../Controllers/admin')

// Define a route for the homepage
router.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

// Define a route for a specific resource
router.post('/add', Admin.Add_Admin)
router.get('/list', Admin.List_Admin)
router.get('/list/:id', Admin.Get_Admin)
router.put('/update/:id', Admin.Update_Admin)
router.delete('/delete/:id', Admin.Delete_Admin)
router.post('/create-user', Admin.Create_User)
router.delete('/delete-user/:id', Admin.Delete_User)


module.exports = router;