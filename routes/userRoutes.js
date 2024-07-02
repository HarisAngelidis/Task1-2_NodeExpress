const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/add/user', userController.addUser);
router.put('/update/user/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/users/byDate/:Apo/:Mexri', userController.getUsersByDate);

module.exports = router;
