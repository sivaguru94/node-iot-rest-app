const express = require('express');

const validate = require('../middlewares/validate');
const deviceValidation = require('../model/device/device.validation');
const deviceController = require('../controller/device.contoller');

const router = express.Router();

router
  .route('/')
  .post(validate(deviceValidation.createDevice), deviceController.createDevice)
  .get(validate(deviceValidation.getDevices), deviceController.getDevices);

router
  .route('/:deviceId')
  .get(validate(deviceValidation.getDevice), deviceController.getDevice)
  .patch(validate(deviceValidation.updateDevice), deviceController.updateDevice)
  .delete(validate(deviceValidation.deleteDevice), deviceController.deleteDevice);

router
  .route('/:deviceId/send-mqtt-message')
  .patch(validate(deviceValidation.sendMqttMessage), deviceController.sendMqttMessageByDeviceID);

router
  .route('/:deviceId/turn-on-off')
  .patch(validate(deviceValidation.toggleTurnOnOffDevice), deviceController.toggleTurnOnOffDevice);

module.exports = router;
