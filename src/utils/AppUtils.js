const bcrypt = require('bcryptjs');

const removeAllSpaceFromString = (str) => str.replace(/\s/g, '');

const generateTopic = (room, name) => `${removeAllSpaceFromString(room)}/${removeAllSpaceFromString(name)}`;

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

module.exports = {
  removeAllSpaceFromString,
  generateTopic,
  success,
  bcryptCompare,
};
