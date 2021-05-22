const express = require('express');
// const auth = require('../../middlewares/auth');
const validate = require('../middlewares/validate');
const deviceValidation = require('../app-common/model/device/device.validation');
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

module.exports = router;
