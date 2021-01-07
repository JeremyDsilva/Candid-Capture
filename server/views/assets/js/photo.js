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

var load_date

function get_images(test) {
  //first get id
  //replace with load_date
  $.get("/image/date/" + test, function (data) {


    console.log(data)

    for (var i = 0; i < data.message.length; i++) {

      $('#gall').prepend('<div class="col-md-6 col-lg-4 item"><img class="img-thumbnail img-fluid image" src=' + data.message[i] + '></div>');
    }
  });

}


$(document).ready(function () {


  load_date = new Date().getTime() / 1000


  client.connect({
    timeout: 3,
    onSuccess: function () {
      console.log("mqtt connected");
      client.subscribe("candid", { qos: 2 });
    },
    onFailure: function (message) {
      console.log("Connection failed: " + message.errorMessage);
    }
  });


  var test = 1607319900;

  console.log('hello')
  //date when page loads

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







});




