const express = require('express');
const router = express.Router();
const role = require('../Controllers/role')

router.post('/create-role', role.createRoleWithPermissions)

module.exports = router;