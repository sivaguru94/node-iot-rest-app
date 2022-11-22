const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const ApiError = require('./ApiError');

const removeAllSpaceFromString = (str) => str.replace(/\s/g, '');

const generateTopic = (userId, room, name) =>
  `${removeAllSpaceFromString(userId)}/${removeAllSpaceFromString(room)}/${removeAllSpaceFromString(name)}`;

const success = (result, message = '') => {
  return {
    status: 'SUCCESS',
    message,
    result,
  };
};

const bcryptCompare = (password, passwordHash) => {
  return bcrypt.compare(password, passwordHash);
};

const verifyDeviceAccess = (user, device) => {
  if (device.user.toString() !== user.id.toString()) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User un-authorized');
  }
};

module.exports = {
  removeAllSpaceFromString,
  generateTopic,
  success,
  bcryptCompare,
  verifyDeviceAccess,
};
