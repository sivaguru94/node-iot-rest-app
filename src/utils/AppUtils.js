const removeAllSpaceFromString = (str) => str.replace(/\s/g, '');
const genarateTopic = (room, name) => `${removeAllSpaceFromString(room)}/${removeAllSpaceFromString(name)}`;

module.exports = {
  removeAllSpaceFromString,
  genarateTopic,
};
