const httpStatus = require('http-status');
const { Device } = require('../app-common/model');
const ApiError = require('../utils/ApiError');

/**
 * Create a device
 * @param {Object} deviceBody
 * @returns {Promise<Device>}
 */
const createDevice = async (deviceBody) => {
    return await Device.create(deviceBody);
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
    return await Device.paginate(filter, options);
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
 * Get device by email
 * @param {string} name
 * @returns {Promise<Device>}
 */
const getDeviceByName = async (name) => {
    return Device.find({name: name });
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

    Object.assign(device, updateBody);
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

module.exports = {
    createDevice,
    queryDevices,
    getDeviceById,
    getDeviceByName,
    updateDeviceById,
    deleteDeviceById,
};
