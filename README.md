# ![Candid Capture](views/assets/img/avatars/logo.png)

This IOT-based smart home appliance uses a combination of your environment, audio and emotion to determine when to capture candid photos to capture your and your family’s special moments. This app is a great appliance for families to capture fun moments between family members or improve your mood by playing happy songs when you are sad.

- We have divided our code into different branches to seperate the different parts of our system
- Except for Flutter and the Master the other branches are only to have a look at and aren't necessarily functional

# Built with
* NodeJs
* TensorFlow
* Node-red
* Flutter

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

## Using Spotify node-red integration
- To use the Spotify tool in node red you will have to make an account on Spotify.
- After creating your account follow this ([tutorial](https://developer.spotify.com/dashboard/)), Spotify Developers to login and create an App to get an ID and Secret.
- Enter your Client ID and Client Secret in the Spotify Node.
- This is the scope to [Start/Resume a Users Playback](https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/); user-modify-playback-state.
- After autherizing you Select the API "play" and you are done with setting up the Spotify node.
- Please refer to the Spotify's [Web API](https://developer.spotify.com/documentation/web-api/reference/) reference to know about utilizing other API's
 <b> Please note: to use the 'Play' functionaliy you must have Spotify premium activated </b>
 
 
