const MqttHandler = require('../mqtt/AsyncMqttHandler');

const mqttClient = new MqttHandler();
mqttClient.connect();

const sendMqttMessageToDevice = (device, message) => {
  return mqttClient.sendMessage(device.topic, message);
};

module.exports = {
  sendMqttMessageToDevice,
};
