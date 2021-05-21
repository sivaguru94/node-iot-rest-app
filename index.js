const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mqttHandler = require('./mqtt/MqttHandler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const mqttClient = new mqttHandler();
mqttClient.connect();

// Routes
app.post("/send-mqtt", function(req, res) {
    mqttClient.sendMessage(req.body.message);
    res.status(200).send("Message sent to mqtt");
});

const server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});
