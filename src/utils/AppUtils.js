const removeAllSpaceFromString = (str) => str.replace(/\s/g, '');
const generateTopic = (room, name) => `${removeAllSpaceFromString(room)}/${removeAllSpaceFromString(name)}`;
const success = (result, message = '') => {
  return {
    status: 'SUCCESS',
    message,
    result,
  };
};

module.exports = {
  removeAllSpaceFromString,
  generateTopic,
  success,
};
