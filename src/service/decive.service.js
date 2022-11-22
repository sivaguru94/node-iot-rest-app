const httpStatus = require('http-status');
const { Device, User } = require('../model');
const ApiError = require('../utils/ApiError');
const utils = require('../utils/AppUtils');
const mqtt = require('./mqtt.service');

/**
 * Get device by name
 * @param {string} name
 * @returns {Promise<Device>}
 */
const getDeviceByName = async (name) => {
  return Device.find({ name });
};

/**
 * Get device by topic
 * @param {string} topic
 * @returns {Promise<Device>}
 */
const getDeviceByTopic = async (topic) => {
  return Device.find({ topic });
};

/**
 * Create a device
 * @param {Object} deviceBody
 * @returns {Promise<Device>}
 */
const createDevice = async (userId, deviceBody) => {
  const device = {
    ...deviceBody,
    user: userId,
    topic: utils.generateTopic(userId, deviceBody.room, deviceBody.name),
  };
  const duplicateDevice = await getDeviceByTopic(device.topic);
  if (duplicateDevice.length > 0) throw new Error('Device Already Exists');

  return Device.create(device).then((docDevice) => {
    return User.findByIdAndUpdate(
      userId,
      { $push: { devices: docDevice._id } },
      { new: true, useFindAndModify: false }
    ).then(() => {
      return docDevice;
    });
  });
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
 * Update device by id
 * @param {ObjectId} deviceId
 * @param {Object} updateBody
 * @returns {Promise<Device>}
 */
const updateDeviceById = async (deviceId, updateBody, user) => {
  const device = await getDeviceById(deviceId);
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }
  utils.verifyDeviceAccess(user, device);
  const updateObject = {
    name: updateBody.name || device.name,
    room: updateBody.room || device.room,
  };
  updateObject.topic = utils.generateTopic(user.id, updateObject.room, updateObject.name);
  Object.assign(device, updateObject);
  await device.save();
  return device;
};

/**
 * Delete device by id
 * @param {ObjectId} deviceId
 * @returns {Promise<Device>}
 */
const deleteDeviceById = async (deviceId, user) => {
  const device = await getDeviceById(deviceId);
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }
  utils.verifyDeviceAccess(user, device);
  await device.remove();
  return device;
};

const sendMqttMessageByDeviceID = async (deviceId, message, user) => {
  const device = await getDeviceById(deviceId);
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }
  utils.verifyDeviceAccess(user, device);
  return mqtt.sendMqttMessageToDevice(device, JSON.stringify(message));
};

const toggleTurnOnOffDevice = async (deviceId, user) => {
  const device = await getDeviceById(deviceId);
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }
  utils.verifyDeviceAccess(user, device);
  // Send Mqtt Message
  try {
    await mqtt.sendMqttMessageToDevice(device, `${!device.isDeviceOn}`);
  } catch (e) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Currently Not able to Contact the device');
  }
  // Update Device Status
  const deviceUpdateObject = {
    isDeviceOn: !device.isDeviceOn,
  };
  Object.assign(device, deviceUpdateObject);
  await device.save();

  return device;
};

module.exports = {
  createDevice,
  queryDevices,
  getDeviceById,
  getDeviceByName,
  updateDeviceById,
  deleteDeviceById,
  sendMqttMessageByDeviceID,
  getDeviceByTopic,
  toggleTurnOnOffDevice,
};
