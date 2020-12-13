
const mqttConfig = {
    "host": "localhost",
    "port": 9001,
    "url": '',
    "topic": {
      "subscribe": "candid",
      "publish": "direction"
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

    //get images after x
    get_images(load_date)
    //change the load date
    load_date = new Date().getTime() / 1000

    //console.log(message);

    console.log('photo incomming')

  };
  
