const Joi = require('joi');
const { objectId } = require('./validators');

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    age: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const userLogin = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const getUserByName = {
  parama: Joi.object().keys({
    name: Joi.string(),
  }),
};

const getUserByEmail = {
  parama: Joi.object().keys({
    email: Joi.string(),
  }),
};

const getUserById = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const deleteUser = {
  params: Joi.object().keys({
    deviceId: Joi.string().custom(objectId),
  }),
};

const updateUserById = {
  body: Joi.object()
    .keys({
      name: Joi.string().min(1),
      email: Joi.string().min(1),
    })
    .or('name', 'email'),
};

module.exports = {
  createUser,
  userLogin,
  getUserByName,
  getUserByEmail,
  getUserById,
  updateUserById,
  deleteUser,
};
