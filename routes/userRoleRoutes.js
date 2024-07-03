const express = require('express');
const router = express.Router();
const userRoleController = require('../controllers/userRoleController');
const path = '/api/userRole';

router.get(path, userRoleController.getAllUserRoles);
//router.post(path, userRoleController.addUserRole);
router.get(path + '/:role/byDate', userRoleController.getUsersByDateRole);
router.put(path + '/:id', userRoleController.updateUserRole);
router.get(path + '/admins', userRoleController.getAdmins);


module.exports = router;