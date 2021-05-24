const httpStatus = require('http-status');
const { Device } = require('../model');
const ApiError = require('../utils/ApiError');
const { MQTT_CLIENT } = require('../utils/AppConstants');
const utils = require('../utils/AppUtils');
const mqtt = require('./mqtt.service');
/**
 * Create a device
 * @param {Object} deviceBody
 * @returns {Promise<Device>}
 */
const createDevice = async (deviceBody) => {
  const device = {
    ...deviceBody,
    topic: utils.genarateTopic(deviceBody.room, deviceBody.name),
  };
  return Device.create(device);
};

/**
 * Query for devices
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDevices = async (filter, options) => {
  return Device.paginate(filter, options);
};

/**
 * Get device by id
 * @param {ObjectId} id
 * @returns {Promise<Device>}
 */
const getDeviceById = async (id) => {
  return Device.findById(id);
};

/**
 * Get device by name
 * @param {string} name
 * @returns {Promise<Device>}
 */
const getDeviceByName = async (name) => {
  return Device.find({ name });
};

/**
 * Update device by id
 * @param {ObjectId} deviceId
 * @param {Object} updateBody
 * @returns {Promise<Device>}
 */
const updateDeviceById = async (deviceId, updateBody) => {
  const device = await getDeviceById(deviceId);
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }

  const updateObject = {
    name: updateBody.name || device.name,
    room: updateBody.room || device.room,
  };
  updateObject.topic = utils.genarateTopic(updateObject.room, updateObject.name);
  Object.assign(device, updateObject);
  await device.save();
  return device;
};

/**
 * Delete device by id
 * @param {ObjectId} deviceId
 * @returns {Promise<Device>}
 */
const deleteDeviceById = async (deviceId) => {
  const device = await getDeviceById(deviceId);
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }
  await device.remove();
  return device;
};

const sendMqttMessageByDeviceID = async (deviceId, message) => {
  const device = await getDeviceById(deviceId);
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }
  return mqtt.sendMqttMessageToDevice(device, message);
};

module.exports = {
  createDevice,
  queryDevices,
  getDeviceById,
  getDeviceByName,
  updateDeviceById,
  deleteDeviceById,
  sendMqttMessageByDeviceID,
};
