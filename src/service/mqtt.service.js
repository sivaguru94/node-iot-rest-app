const MqttHandler = require('../mqtt/AsyncMqttHandler');

const mqttClient = new MqttHandler('mosquitto');
mqttClient.connect();

const sendMqttMessageToDevice = (device, message) => {
  return mqttClient.sendMessage(device.topic, message);
};

module.exports = {
  sendMqttMessageToDevice,
};
