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
  }),
};

const getDevice = {
  params: Joi.object().keys({
    deviceId: Joi.string().custom(objectId),
  }),
};

const getDeviceByName = {
  query: Joi.object().keys({
    name: Joi.string().required(),
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
    isDeviceOn: Joi.boolean().required(),
  }),
};

module.exports = {
  createDevice,
  getDevices,
  getDevice,
  getDeviceByName,
  updateDevice,
  deleteDevice,
};
