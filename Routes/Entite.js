const express = require('express');
const router = express.Router();
const ECont = require('../Controllers/entite')



// Define a route for a specific resource

router.post('/add',ECont.Add_Entite)
router.get('/list',ECont.List_Entite)
router.get('/list/:id',ECont.Get_Entite)
router.put('/update/:id',ECont.Update_Entite)
router.delete('/delete/:id',ECont.Delete_Entite)


module.exports = router;