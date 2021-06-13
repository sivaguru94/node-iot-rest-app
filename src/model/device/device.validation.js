const Joi = require('joi');
const { objectId } = require('../../validaiors/validators');

const createDevice = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    room: Joi.string().required(),
    isDeviceOn: Joi.boolean().required(),
  }),
};

const getDevices = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    topic: Joi.string(),
  }),
};

const getDevice = {
  params: Joi.object().keys({
    deviceId: Joi.string().custom(objectId),
  }),
};

const updateDevice = {
  params: Joi.object().keys({
    deviceId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().min(1),
      room: Joi.string().min(1),
    })
    .or('name', 'room'),
};

const deleteDevice = {
  params: Joi.object().keys({
    deviceId: Joi.string().custom(objectId),
  }),
};

const sendMqttMessage = {
  params: Joi.object().keys({
    deviceId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    message: Joi.object().required(),
  }),
};

const toggleTurnOnOffDevice = {
  params: Joi.object().keys({
    deviceId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createDevice,
  getDevices,
  getDevice,
  updateDevice,
  deleteDevice,
  sendMqttMessage,
  toggleTurnOnOffDevice,
};
