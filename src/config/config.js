const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    MOSQUITTO_HOST: Joi.string().required().description('Mqtt host name'),
    MOSQUITTO_PORT: Joi.string().required().description('Mqtt connect port'),
    MOSQUITTO_USER_NAME: Joi.string().required().description('Mqtt username'),
    MOSQUITTO_PASSWORD: Joi.string().description('Mqtt password'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  mqtt: {
    host: envVars.MOSQUITTO_HOST,
    port: envVars.MOSQUITTO_PORT,
    user: envVars.MOSQUITTO_USER_NAME,
    password: envVars.MOSQUITTO_PASSWORD,
  },
};
