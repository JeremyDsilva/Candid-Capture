
const mqttConfig = {
    "host": "localhost",
    "port": 9001,
    "url": '',
    "topic": {
      "subscribe": "config"
    }
  }
  // Create a client instance
  
  client = new Paho.MQTT.Client(mqttConfig.host, mqttConfig.port, mqttConfig.url, '');

  // called when the client loses its connection
  client.onConnectionLost = function (responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  }

  // called when a message arrives
  client.onMessageArrived = function (message) {
    location.reload();
  };
  
