const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddeware = require('../middlewares/authMiddleware');

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);

router.route('/user-info').get(authMiddeware.verifyToken, authController.getUserInfo);

router.route('/setAvatar/:id').post(authController.setAvatar);
router.route('/allUsers/:id').get(authController.getAllUsers);

module.exports = router;
