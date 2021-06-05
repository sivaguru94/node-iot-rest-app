const sendMqttMessageToDevice = (device, message) => {
  return global.mqttClient.sendMessage(device.topic, message);
};

module.exports = {
  sendMqttMessageToDevice,
};
