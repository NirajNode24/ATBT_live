const express = require('express');
const router = express.Router();
const ECont = require('../Controllers/entite')
const upload = require('../utils/store')



// Define a route for a specific resource

router.post('/add', upload.single('image'), ECont.Add_Entite)
router.get('/list', ECont.List_Entite)
router.get('/list/:id', ECont.Get_Entite)
router.put('/update/:id', ECont.Update_Entite)
router.delete('/delete/:id', ECont.Delete_Entite)


module.exports = router;