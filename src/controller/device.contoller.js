const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { deviceService } = require('../service');
const logger = require('../config/logger');
const { success } = require('../utils/AppUtils')

const createDevice = catchAsync(async (req, res) => {
  const device = await deviceService.createDevice(req.body);
  res.status(httpStatus.CREATED).send(success({ device }, 'Device Successfully Created'));
});

const getDevices = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const devices = await deviceService.queryDevices(filter, options);
  res.send(success({ devices: devices.results }, 'Devices Fetched Successfully'));
});

const getDevice = catchAsync(async (req, res) => {
  const device = await deviceService.getDeviceById(req.params.deviceId);
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }
  res.send(success({ device }));
});

const updateDevice = catchAsync(async (req, res) => {
  const device = await deviceService.updateDeviceById(req.params.deviceId, req.body);
  res.send(success({ device }, 'Devices Updated Successfully'));
});

const deleteDevice = catchAsync(async (req, res) => {
  await deviceService.deleteDeviceById(req.params.deviceId);
  res.send(success(req.params.deviceId, 'Devices Deleted Successfully'));
});

const sendMqttMessageByDeviceID = catchAsync(async (req, res) => {
  deviceService
    .sendMqttMessageByDeviceID(req.params.deviceId, req.body.message)
    .then((data) => {
      logger.info(data);
      res.send(success(req.params.deviceId, `Sent message to device ${req.params.deviceId}`));
    })
    .catch((err) => {
      throw new ApiError(httpStatus[500], `${err}`);
    });
});

const toggleTurnOnOffDevice = catchAsync(async (req, res) => {
  deviceService
    .toggleTurnOnOffDevice(req.params.deviceId)
    .then((device) => {
      logger.info(device);
      res.send(success(device, `Device Turned ${device.isDeviceOn ? 'on' : 'off'}`));
    })
    .catch((err) => {
      throw new ApiError(httpStatus[500], `${err}`);
    });
});

module.exports = {
  createDevice,
  getDevices,
  getDevice,
  updateDevice,
  deleteDevice,
  sendMqttMessageByDeviceID,
  toggleTurnOnOffDevice,
};
