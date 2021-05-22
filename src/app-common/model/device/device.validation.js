const Joi = require('joi');
const { objectId } = require('../../validaiors/validators');

const createDevice = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        topic: Joi.string().required(),
        isDeviceON: Joi.boolean().required(),
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
        userId: Joi.string().custom(objectId),
    }),
};

const updateDevice = {
    params: Joi.object().keys({
        userId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            name: Joi.string().required(),
            topic: Joi.string().required(),
        })
        .min(1),
};

const deleteDevice = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
        isDeviceON: Joi.boolean().required(),
    }),
};

module.exports = {
    createDevice,
    getDevices,
    getDevice,
    updateDevice,
    deleteDevice,
};
