const APP_NAME = 'Node_Server_IoT_Home_Automation';
const MQTT_CLIENT = 'appMqttHandler';
const TOKEN_EXPIRY = '1800s';
const AppEnvironment = {
  local: {
    MQTT: {
      topic: 'HOME_AUTOMATION/MESSAGE',
      hostName: 'raspberrypi.local',
      port: 1833,
      username: APP_NAME,
      password: '',
    },
  },
  raspberry_pi: {
    MQTT: {
      topic: 'HOME_AUTOMATION/MESSAGE',
      hostName: 'localhost',
      port: 1833,
      username: APP_NAME,
      password: '',
    },
  },
};

module.exports = {
  AppName: APP_NAME,
  AppEnvironment,
  MQTT_CLIENT,
  TOKEN_EXPIRY,
};
