const mongoose = require('mongoose');
const app = require('./src/app');
const config = require('./src/config/config');
const logger = require('./src/config/logger');
const MqttHandler = require('./src/mqtt/MqttHandler');
const { MQTT_CLIENT } = require('./src/utils/AppConstants');

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');

  const mqttClient = new MqttHandler();
  app.set(MQTT_CLIENT, mqttClient);
  mqttClient.connect();

  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
