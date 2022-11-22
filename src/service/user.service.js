const httpStatus = require('http-status');
const { User } = require('../model');
const ApiError = require('../utils/ApiError');
const utils = require('../utils/AppUtils');
const authService = require('../auth/auth.service');

/**
 * Get user by name
 * @param {Object} query Mongo Query for FindOne
 * @param {string} select Fillds to include / exclude
 * @returns {Promise<User>}
 */
const getOneUser = (query, select) => {
  return User.findOne(query).select(select);
};

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
  return User.findOne({ email });
};

/**
 * Create a user
 * @param {Object} user
 * @returns {Promise<User>}
 */
const createUser = async (user) => {
  const duplicateUser = await getUserByEmail(user.email);
  if (duplicateUser) throw new ApiError(httpStatus.CONFLICT, 'User Already Exists');
  return User.create(user);
};

const userLogin = async (loginRequest) => {
  let token = null;
  const user = await getOneUser({ email: loginRequest.email }, 'name email password');
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
  const isPasswordValid = await utils.bcryptCompare(loginRequest.password, user.password);
  if (isPasswordValid) {
    token = authService.generateAccessToken(user);
  }
  return token;
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
  userLogin,
  getUserByEmail,
  createUser,
  updateUserById,
  deleteUserById,
  getUserById,
  getUserDevicesByUserId,
};
