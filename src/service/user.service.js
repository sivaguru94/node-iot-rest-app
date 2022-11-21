const httpStatus = require('http-status');
const { User } = require('../model');
const ApiError = require('../utils/ApiError');
const utils = require('../utils/AppUtils');

/**
 * Get user by name
 * @param {string} name
 * @returns {Promise<User>}
 */
const getUserByName = async (name) => {
  return User.find({ name });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.find({ email });
};

/**
 * Create a user
 * @param {Object} user
 * @returns {Promise<User>}
 */
const createUser = async (user) => {
  const duplicateUser = await getUserByEmail(user.email);
  if (duplicateUser.length > 0) throw new Error('User Already Exists');
  return User.create(user);
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<[device]>}
 */
const getUserDevicesByUserId = async (id) => {
  return User.findById(id).select('devices').populate({ path: 'devices' });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateUser
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const updateObject = {
    name: updateBody.name || user.name,
    room: updateBody.email || user.email,
  };
  updateObject.topic = utils.generateTopic(updateObject.room, updateObject.name);
  Object.assign(user, updateObject);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  getUserByName,
  getUserByEmail,
  createUser,
  updateUserById,
  deleteUserById,
  getUserById,
  getUserDevicesByUserId,
};
