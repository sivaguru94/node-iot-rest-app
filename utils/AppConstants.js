const APP_NAME = 'Node_Server_IoT_Home_Automation';
const AppEnvironment = {
    local:  {
        MQTT: {
            topic: 'HOME_AUTOMATION/MESSAGE',
            hostName: 'raspberrypi.local',
            username: APP_NAME,
            password: ''
        }
    },
    raspberry_pi: {
        MQTT: {
            topic: 'HOME_AUTOMATION/MESSAGE',
            hostName: 'localhost',
            username: APP_NAME,
            password: ''
        }
    }
};

module.exports =  {
    AppName: APP_NAME,
    AppEnvironment: AppEnvironment,
};
