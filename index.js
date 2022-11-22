const mongoose = require('mongoose');
const app = require('./src/app');
const config = require('./src/config/config');
const logger = require('./src/config/logger');
const MqttHandler = require('./src/mqtt/AsyncMqttHandler');

let server;
// Connect to MongoDB
mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    logger.info(`Connecting to MongoDB 
    Connected: URL : ${config.mongoose.url}, config : ${JSON.stringify(config.mongoose.options)}`);
    server = app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  })
  .catch((error) => {
    logger.info('Error connecting to MongoDB with error');
    logger.info(error);
  });

// Connect to MQTT
global.mqttClient = new MqttHandler(config.mqtt.host, config.mqtt.port, config.mqtt.user, config.mqtt.password);
global.mqttClient.connect();

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
