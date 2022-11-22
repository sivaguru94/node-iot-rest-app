const express = require('express');

const validate = require('../middlewares/validate');
const deviceValidation = require('../validaiors/device.validation');
const deviceController = require('../controller/device.contoller');
const { getRouteValidators } = require('../auth/auth.service');

const router = express.Router();

router.route('/').post(getRouteValidators(validate(deviceValidation.createDevice)), deviceController.createDevice);

router
  .route('/:deviceId')
  .get(getRouteValidators(validate(deviceValidation.getDevice)), deviceController.getDevice)
  .patch(getRouteValidators(validate(deviceValidation.updateDevice)), deviceController.updateDevice)
  .delete(getRouteValidators(validate(deviceValidation.deleteDevice)), deviceController.deleteDevice);

router
  .route('/:deviceId/send-mqtt-message')
  .patch(getRouteValidators(validate(deviceValidation.sendMqttMessage)), deviceController.sendMqttMessageByDeviceID);

router
  .route('/:deviceId/turn-on-off')
  .patch(getRouteValidators(validate(deviceValidation.toggleTurnOnOffDevice)), deviceController.toggleTurnOnOffDevice);

// Admin Apis
// .get(getRouteValidators(validate(deviceValidation.getDevices)), deviceController.getDevices);

module.exports = router;
