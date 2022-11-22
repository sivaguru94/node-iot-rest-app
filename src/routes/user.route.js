const express = require('express');

const validate = require('../middlewares/validate');
const userValidation = require('../validaiors/user.validation');
const userController = require('../controller/user.controller');

const { getRouteValidators } = require('../auth/auth.service');

const router = express.Router();

router.route('/register').post(validate(userValidation.createUser), userController.createUser);
router.route('/login').post(validate(userValidation.userLogin), userController.userLogin);

router.route('').patch(getRouteValidators(validate(userValidation.updateUserById)), userController.updateUserById);

router.route('/devices').get(getRouteValidators(), userController.getUserDevicesByUserId);

// Admin Apis
// router.route('/:email').get(getRouteValidators(validate(userValidation.getUserByEmail)), userController.getUserByEmail);
// router.route('/:name').get(getRouteValidators(validate(userValidation.getUserByName)), userController.getUserByName);

// router
//   .route('/:userId')
//   .get(getRouteValidators(validate(userValidation.getUserById)), userController.getUserById)
//   .delete(getRouteValidators(validate(userValidation.deleteUser)), userController.deleteUser);

module.exports = router;
