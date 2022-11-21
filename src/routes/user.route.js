const express = require('express');

const validate = require('../middlewares/validate');
const userValidation = require('../validaiors/user.validation');
const userController = require('../controller/user.controller');

const router = express.Router();

router.route('/').post(validate(userValidation.createUser), userController.createUser);

router.route('/:email').get(validate(userValidation.getUserByEmail, userController.getUserByEmail));

router.route('/:name').get(validate(userValidation.getUserByName, userController.getUserByName));

router
  .route('/:userId')
  .get(validate(userValidation.getUserById), userController.getUserById)
  .patch(validate(userValidation.updateUserById), userController.updateUserById)
  .delete(validate(userValidation.deleteUser), userController.deleteUser);

router.route('/:userId/devices').get(validate(userValidation.getUserDevicesByUserId), userController.getUserDevicesByUserId);

module.exports = router;
