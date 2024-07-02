const express = require('express');
const router = express.Router();
const userRoleController = require('../controllers/userRoleController');

router.get('/userRole', userRoleController.getAllUserRoles);
router.post('/add/userRole', userRoleController.addUserRole);
router.put('/update/userRole/:id', userRoleController.updateUserRole);
router.get('/admins', userRoleController.getAdmins);
router.get('/users/byDate/:Apo/:Mexri/:Rolos', userRoleController.getUsersByDateRole);

module.exports = router;