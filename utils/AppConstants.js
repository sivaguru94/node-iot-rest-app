const AppEnvironment = {
    local:  {
        MQTT: {
            topic: 'HOME_AUTOMATION/MESSAGE',
            hostName: 'raspberrypi.local',
            username: null,
            password: null
        }
    },
    raspberry_pi: {
        topic: 'HOME_AUTOMATION/MESSAGE',
        hostName: 'localhost',
        username: null,
        password: null
    }
};

module.exports =  {
    AppEnvironment: AppEnvironment
};