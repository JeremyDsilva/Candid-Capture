
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


  client.connect({
    timeout: 3,
    onSuccess: function () {
      console.log("mqtt connected");
      client.subscribe("config", { qos: 2 });
    },
    onFailure: function (message) {
      console.log("Connection failed: " + message.errorMessage);
    }
  });

  // called when the client loses its connection
  client.onConnectionLost = function (responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  }

  // called when a message arrives
  client.onMessageArrived = function (message) {
    console.log(message);
    location.reload();
  };
  
