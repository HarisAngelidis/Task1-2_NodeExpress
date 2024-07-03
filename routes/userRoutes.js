const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const path = '/api/user/';

router.get(path + 'ByDate', userController.getUsersByDate);
router.get(path, userController.getAllUsers);
router.get(path + ':role', userController.getAllUsers);
router.get(path + ':id', userController.getUserById);
router.post(path, userController.addUser);
router.put(path + ':id', userController.updateUser);
router.delete(path + ':id', userController.deleteUser);


module.exports = router;
