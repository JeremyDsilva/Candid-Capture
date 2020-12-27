# ![Candid Capture](views/assets/img/avatars/logo.png)

This IOT-based smart home appliance uses a combination of your environment, audio and emotion to determine when to capture candid photos to capture your and your family’s special moments. This app is a great appliance for families to capture fun moments between family members or improve your mood by playing happy songs when you are sad.

- We have divided our code into different branches to seperate the different parts of our system
- Except for Flutter and the Master the other branches are only to have a look at and aren't necessarily functional


# Getting started

- Clone this repo
- `npm install express mongoose mqtt --save` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `node app.js` to start the local server
- Follow this ([tutorial](https://nodered.org/docs/getting-started/local)) and install Node-RED locally on your machine.
- Import `Node-red/spotify_flow.json` into your Node-RED instance.
- Follow this ([tutorial](https://flutter.dev/docs/get-started/install)) and install Flutter locally on your machine.
- Run the Flutter app from the `flutter` branch.


## Dependencies

- [express](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [mqtt](https://github.com/mqttjs/MQTT.js) - For the MQTT protocol, written in JavaScript for node.js and the browser.


